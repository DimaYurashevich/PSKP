module.exports = (trainingRepository,groupRepository,userRepository, subjectRepository,validator, errors) => {
    return {
        create: create,
        readAll:readAll,
        read:read,
        del:del
    };
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