module.exports = (trainingRepository,studentsRepository, groupRepository,userRepository, subjectRepository,markRepository,absenteeismRepository,validator, errors) => {
    return {
        create: create,
        readAll:readAll,
        read:read,
        del:del,
        newMark:newMark,
        getMark:getMark,
        newAbsenteeism:newAbsenteeism,
        getAbsenteeism:getAbsenteeism,
        getStudent:getStudent
    };
    function getStudent(idTraining, idUser)
    {
        return new Promise((resolve, reject) => {
            trainingRepository.findOne({where:{id:idTraining}})
            .then(training=>{
                console.log(idTraining + " " +idUser);
                if(training.userId==idUser) return studentsRepository.findAll({where:{groupId: training.groupId}})
                else throw reject({success: false, message:"Access denied"});
            })
            .then(students=> resolve({success: true, data: students}))
            .catch(err=> { console.log(err); reject({success: false, message:"Fatal Error"})})
        })
    }
    function getMark(idTraining, idUser)
    {
         return new Promise((resolve, reject) => {
            trainingRepository.findOne({where:{id:idTraining}})
            .then(training=>{
                console.log(training);
                if(training.userId!=idUser) reject({success: false, message:"Access denied"});
                else return markRepository.findAll({where:{trainingId: idTraining}, include:[{model:studentsRepository}]})
            })
            .then(marks=> resolve({success: true, data: marks}))
            .catch(err=> reject({success: false, message:"Fatal Error"}))
         })
    }
    function getAbsenteeism(idTraining, idUser)
    {
         return new Promise((resolve, reject) => {
            trainingRepository.findOne({where:{id:idTraining}})
            .then(training=>{
                console.log(training);
                if(training.userId!=idUser) reject({success: false, message:"Access denied"});
                else return absenteeismRepository.findAll({where:{trainingId: idTraining}, include:[{model:studentsRepository}]})
            })
            .then(absenteeism=> resolve({success: true, data: absenteeism}))
            .catch(err=> reject({success: false, message:"Fatal Error"}))
         })
    }
    function newMark(data, idTraining, idUser)
    {
        console.log(data);
        console.log(idTraining);
        console.log(idUser);
        return new Promise((resolve, reject) => {
            trainingRepository.findOne({where:{id:idTraining}})
            .then(training=>{
                if(training.userId!=idUser) throw reject({success: false, message:"Access denied"});
                else return studentsRepository.findOne({where:{id: data.student, groupId:training.groupId}})
            })
            .then(student=> {
                if(student==null) throw reject({success: false, message:"Error student"})
                else return absenteeismRepository.findOne({where:{studentId: data.student,date: data.date, trainingId: idTraining}})
            })
            .then(absenteeisms=>{
                if(absenteeisms!=null) throw reject({success: false, message:"This student absenteeism on training"})
                else return markRepository.create({
                    studentId: data.student,
                    trainingId: idTraining,
                    mark: data.mark,
                    date: data.date
                })
            })
            .then(mark=>{console.log(mark); resolve({success: true})})
            .catch(err=>{console.log(err);reject(err)});
        })
    }
    function newAbsenteeism(data, idTraining, idUser)
    {
        console.log(data);
        console.log(idTraining);
        console.log(idUser);
         return new Promise((resolve, reject) => {
             trainingRepository.findOne({where:{id:idTraining}})
            .then(training=>{
                console.log("OK");
                if(training.userId!=idUser) throw reject({success: false, message:"Access denied"});
                else {
                    console.log("OK1");
                    return studentsRepository.findOne({where:{id: data.student, groupId:training.groupId}})
                }
            })
            .then(student=> {
                console.log("OK2");
                if(student==null) throw reject({success: false, message:"Error student"})
                else
                {
                    console.log(data.student, data.date, idTraining)
                    return markRepository.findOne({where:{studentId: data.student,date: data.date, trainingId: idTraining}})
                }
            })
            .then(mark=>{
                console.log("OK3" + mark);
                if(mark!=null) return mark.destroy();
                else return true;
            })
            .then(rez=>{
                console.log("OK4");
                return absenteeismRepository.create({
                    studentId: data.student,
                    trainingId: idTraining,
                    absenteeism: data.absenteeism,
                    date: data.date
                })
            })
            .then(mark=>{console.log("mark"); resolve({success: true})})
            .catch(err=>{
                console.log("Err");
                console.log(err);reject(err)});
         })
    }
    function create(data,facultyId)
    {
        return new Promise((resolve, reject) => {
            console.log(data)
            Promise.all([
                validator.notUndefined([data.user, data.group,data.subject]),
                validator.checkSubject(data.subject,facultyId),
                validator.checkGroup(data.group,facultyId)])
                validator.createTraining(data.user,data.group,data.subject)
            .then(validate=>{        
                return trainingRepository.create({
                    userId: data.user,
                    groupId: data.group,
                    subjectId: data.subject
                })
            })
            .then(data=>{
                console.log("OK");
                return resolve({success: true})
            })
            .catch(err=>{
                console.log(err);
                return reject(err);
            })
        })
    }
    function readAll(id)
    {   
        return new Promise((resolve, reject) => {
            trainingRepository.findAll({ include: [{model: groupRepository, where:{facultyId:id},attributes: ['course','group','subgroup'] },
                                                    {model: userRepository, attributes: ['surname','firstname','patronymic']},
                                                    {model: subjectRepository, attributes: ['name','fullName']}],
                                        attributes: ['id']})
            .then(subject=> resolve({success: true, data: subject}))
            .catch(err=> reject(err));
        })
    }
    function read(idUser)
    {
        return new Promise((resolve, reject) => {
            trainingRepository.findAll({ include: [{model: userRepository, where:{id:idUser}},
                                                    {model: subjectRepository, attributes: ['name','fullName']},
                                                    {model: groupRepository,attributes: ['course','group','subgroup'] }]})
            .then(subject=> resolve({success: true, data: subject}))
            .catch(err=> reject(err));
        })
    }
    function del(id, facultyId)
    {
        return new Promise((resolve, reject) => {
            trainingRepository.findOne({ include: [{model: groupRepository, attributes:["id","facultyId"]}], where:{id:id}})
            .then(data=>{
                if(data==null) reject({success:false, message: "Error id"})
                else {
                    if(data.group.facultyId!=facultyId) reject({success:false, message: "Access is denied"})
                    else return data.destroy();
                }
            })
            .then(data=> resolve({success: true}))
            .catch(err=>{console.log(err);reject({success:false, message: "Fatal Error"})})

        })
    }
}