var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
module.exports = (userRepository, roleRepository, userRoleRepository,  facultyRepository,validator, errors, config) => {
    return {
        login: login,
        registrationDean: registrationDean,
        registrationTeacher: registrationTeacher
        
    };
    function registrationDean(data)
    {
        console.log("registrationDean");
        return new Promise((resolve, reject) => {
            Promise.all([
                validator.notUndefined([data.login,data.facultyFullName,data.surname,data.firstname,data.patronymic,data.facultyName,data.password]),
                validator.userLogin(data.login),
                validator.checkPassword(data.password),
                validator.facultyFullNameorFullSubject(data.facultyFullName),
                validator.userExists(data.login),
                validator.nameAndPatronymic(data.firstname,data.patronymic),
                validator.surName(data.surname),
                validator.checkAbr(data.facultyName)])
            .then(isValidate=>{
               console.log("hash");
               return new Promise((resolve, reject) => {
                   console.log("hash");
                   bcrypt.hash(data.password, saltRounds, function(err, hash){
                   if (err) {
                       return reject(err);
                    }
                    else return resolve(hash);
                    })
                })
            })
            .then(hash=>{
                console.log("registrationDean 01");
                return userRepository.create({
                        login: data.login,
                        password: hash,
                        surname: data.surname,
                        firstname: data.firstname,
                        patronymic: data.patronymic
                    })
            })
            .then(user=>{
                console.log("registrationDean 02");
                return new Promise((resolve, reject) => {
                    Promise.all([
                        user.addRole("dean"),
                        user.addRole("teacher")
                        ]).then((rez)=>resolve(user.id))
                })
            })
            .then(id=>{
                console.log("registrationDean 03");
                return facultyRepository.create({name: data.facultyName,
                                        fullName: data.facultyFullName,
                                        userId: id})
            })
            .then((data)=>{resolve({success: true})})
            .catch(err=> {  console.log(err);
                            reject(err);
            });
        });
    }
    function registrationTeacher(data)
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                validator.notUndefined([data.password,data.login,data.firstname,data.patronymic,data.surname]),
                validator.checkPassword(data.password),
                validator.userLogin(data.login),
                validator.userExists(data.login),
                validator.nameAndPatronymic(data.firstname,data.patronymic),
                validator.surName(data.surname)])
            .then(userRez=>{
                return new Promise((resolve, reject) => {
                    bcrypt.hash(data.password, saltRounds, function(err, hash){
                    if (err) {
                        return reject(err);
                    }
                    else return resolve(hash);
                    })
                })
            })
            .then(hash=>{
                return userRepository.create({
                        login: data.login,
                        password: hash,
                        surname: data.surname,
                        firstname: data.firstname,
                        patronymic: data.patronymic
                    })
            })
            .then(user=>{
                console.log(user);
                return user.addRole("teacher");
            })
            .then(()=>{resolve({success: true})})
            .catch(err=> {console.log(err); reject(err);
            })
        })
    }
    function login(data){
        var suser={};
        return new Promise((resolve, reject) => {
            validator.notUndefined([data.login,data.password])
            .then(validate=>{
                return userRepository.findOne({where:{login: data.login},
                                    attributes: ['id','password']})
            })
            .then(user=>{
                if(user==null) return reject("user not found");
                else 
                {
                    suser.id=user.id;
                    return checkPass(data.password, user.password);
                }
            })
            .then(rc=>{
                return userRoleRepository.findAll({where:{userId: suser.id},
                                            attributes: ['roleName']})
            })
            .then(role=>{
                suser.role=role;
                return facultyRepository.findOne({where:{userId: suser.id}})
            })
            .then(facultyId=>{
                if(facultyId==null) suser.facultyId=null;
                else suser.facultyId=facultyId.id;
                resolve(createJWT(suser));
            })
            .catch(err=>reject(err));
        });
    }
    function checkPass(pass,userPassword)
    {
        console.log("lfff");
        return new Promise((resolve, reject) => {
            bcrypt.compare(pass, userPassword , function(err, rez){
                console.log(rez);
                if (rez!=true) {return reject("invalid Password");}
                else {return resolve(true);}
            });
        })
    }
    function createJWT(suser)//id, role
    {
        console.log(suser);
        return new Promise((resolve, reject) => {
            userRole=[];
            suser.role.forEach(function(element) {
                userRole.push(element.dataValues.roleName);
            });
            console.log(suser.facultyId);
            resolve(jwt.sign({ __user_id: suser.id,__user_role: userRole,__faculty_id:suser.facultyId}, config["jwt_key"]));
        })
    }
};