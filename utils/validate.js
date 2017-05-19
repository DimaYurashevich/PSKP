module.exports = (userRepository, groupRepository,facultyRepository, subjectRepository, trainingRepository)=>{
    return {
        userExists: userExists,
        checkAbr: checkAbr,
        facultyFullNameorFullSubject: facultyFullNameorFullSubject,
        nameAndPatronymic: nameAndPatronymic,
        surName:surName,
        userLogin:userLogin,
        checkGroup: checkGroup,
        createGroup: createGroup,
        isNumber:isNumber,
        notUndefined:notUndefined,
        checkPassword:checkPassword,
        checkCourse:checkCourse,
        checkSubjectName:checkSubjectName,
        checkSubjectFName:checkSubjectFName,
        checkSubject:checkSubject,
        createTraining:createTraining
    }
    function createTraining(user,group,subject)
    {
        return new Promise((resolve, reject) => {
            trainingRepository.findOne({where:{userId:user, groupId:group, subjectId:subject}})
            .then(training=>{
                if(training==null) resolve({success: true})
                else reject({success: false, message: "Already exist"})
            })
            .catch(err=> reject({success: false, message: "Fatal err"}));
        })
    }
    function checkSubjectFName(fname,facultyId){
        return new Promise((resolve, reject) => {
            subjectRepository.findOne({where:{fullName: fname, facultyId:facultyId}})
            .then(data=>
            {
                if(data==null) resolve({success: true})
                else reject({success: false, message: "This fullName already use"})
            })
            .catch(err=> reject({success: false, message: err}))
        })
    }
    function checkSubjectName(name,facultyId)
    {
        return new Promise((resolve, reject) => {
            subjectRepository.findOne({where:{name: name,facultyId:facultyId}})
            .then(data=>
            {
                if(data==null){console.log("OK"); return resolve({success: true})}
                else {console.log("Err"); return reject({success: false, message: "This name already use"})}
            })
            .catch(err=> reject({success: false, message: err}))
        })
    }
    function checkCourse(course)
    {
        return new Promise((resolve, reject) => {
            reg=new RegExp("^[1-6]$");
            if(reg.test(course)) 
            {
                resolve({success: true});
            }
            else 
            {
                reject({success: false, message: "Course error"});
            }
        })
    }
    function checkPassword(pass)
    {
        return new Promise((resolve, reject) => {
            if(pass.length<5) reject({success: false, message: "error password"});
            else resolve({success: true});
        })
    }
    function notUndefined(arr)
    {

        return new Promise((resolve, reject) => {
            arr.forEach(function(element) {
                if(element==undefined)  return reject({success: false, message: "var undefined"})
            });
            console.log("notUndefined OK");
            return resolve({success: true})
        });
    }
    function userExists(user)
    {
        return new Promise((resolve, reject) => {
            userRepository.findAll({where:{login:user}})
            .then(data=> {
                if(data.length==0)
                {
                    console.log("userExists OK");
                    resolve({success:true});
                }    
                else  {
                    console.log("userExists Err");
                    reject({success: false, message: "User already exists"});
                }
            })
            .catch(error=>reject({success:false, message: error}));
        })
    }
    function facultyFullNameorFullSubject(name)
    {
        return new Promise((resolve, reject) => {
            if(name.length>50) return reject({success: false, message: "Faculti name length >50"});
            reg=new RegExp("^[A-Z]([a-z]{3,12})($|([ -][A-Za-z][a-z]*)+$)");
            if(reg.test(name)) 
            {
                console.log("facultuName OK");
                resolve({success: true});
            }
            else 
            {
                console.log("facultuName Err");
                reject({success: false, message: "Faculti name error"});
            }
        })
    }
    function nameAndPatronymic(name,patronymic){
        return new Promise((resolve, reject) => {
            reg=new RegExp("^[A-Z][a-z]{1,30}$");
                if(reg.test(name)&&reg.test(patronymic)) 
                {
                    console.log("userNameAndPatronymic OK");
                    resolve({success: true});
                }
                else 
                {
                    console.log("userNameAndPatronymic Err");
                    reject({success: false, message: "Name or patronymic error"});
                }
        })
    }
    function surName(surName){
        return new Promise((resolve, reject) => {
            reg=new RegExp("^[A-Z][a-z]{1,30}$|-[A-Z][a-z]{1,30}$");
                if(reg.test(surName)) 
                {
                    console.log("SurName OK");
                    resolve({success: true});
                }
                else 
                {
                    console.log("SurName Err");
                    reject({success: false, message: "SurName error"});
                }
        })
    }
    function userLogin(login)
    {
        return new Promise((resolve, reject) => {
            reg=new RegExp("^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$");
                if(reg.test(login)) 
                {
                    console.log("userLogin OK");
                    resolve({success: true});
                }
                else 
                {
                    console.log("userLogin Err");
                    reject({success: false, message: "userLogin error"});
                }
        })   
    }
    function checkAbr(name)
    {
        return new Promise((resolve, reject) => {
            reg=new RegExp("^[A-Z][a-zA-z]{1,10}$");
                if(reg.test(name)) 
                {
                    console.log("facultyName OK");
                    resolve({success: true});
                }
                else 
                {
                    console.log("facultyName Err");
                    reject({success: false, message: "facultyName error"});
                }
        })   
    }
    function  checkGroup(idGroup,facultyId)
    {
        return new Promise((resolve, reject) => {
            groupRepository.findAll({where: {
                    id:idGroup,
                    facultyId: facultyId
            }})
            .then(group=>{
                console.log(group);
                if(group.length==0) reject({success: false, message: "Error group"})
                else resolve();
            })
        })
    }
    function checkSubject(idSubject,facultyId)
    {
        return new Promise((resolve, reject) => {
            subjectRepository.findAll({where: {
                    id:idSubject,
                    facultyId: facultyId
            }})
            .then(subject=>{
                if(subject.length==0) reject({success: false, message: "Error Subject"})
                else resolve();
            })
        })
    }
    function isNumber(num)
    {
        return new Promise((resolve, reject) => {
            reg=new RegExp("^[0-9][0-9]{0,2}$");
                if(reg.test(num)) 
                {
                    console.log("isNumber OK");
                    resolve({success: true});
                }
                else 
                {
                    console.log("isNumber Err");
                    reject({success: false, message: "isNumber error"});
                }
        })   
    }
    function createGroup(course,group, subgroup, id)
    {
        return new Promise((resolve, reject) => {
            groupRepository.findAll({where:{
                course: course,
                group: group,
                subgroup: subgroup,
                facultyId: id}
            })
            .then(group=>{
                console.log(group);
                if(group.length==0) resolve({success: true});
                else reject({success: false, message: "Group already exists"});
            })
            .catch(err=>reject({success: false, message: "Error"}))
        })
    }
}