module.exports = (trainingRepository,groupRepository,userRepository, subjectRepository,validator, errors) => {
    return {
        create: create,
        readAll:readAll,
        read:read
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
            trainingRepository.findAll({ include: [{model: groupRepository, where:{facultyId:id},attributes: ['id','course','group','subgroup'] },
                                                    {model: userRepository, attributes: ['id','surname','firstname','patronymic']},
                                                    {model: subjectRepository, attributes: ['id','course','name','fullName']}]})
            .then(subject=> resolve({success: true, data: subject}))
            .catch(err=> reject(err));
        })
    }
    function read(idUser)
    {
        return new Promise((resolve, reject) => {
            trainingRepository.findAll({ include: [{model: userRepository, where:{id:idUser}}]})
            .then(subject=> resolve({success: true, data: subject}))
            .catch(err=> reject(err));
        })
    }
}