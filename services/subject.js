module.exports = (subjectRepository, validator, errors) => {
    return {
        create: create,
        readAll:readAll,
        del:del
    };
    function del(id,facultyId)
    {
        return new Promise((resolve, reject) => {
            subjectRepository.findOne({where:{id:id}})
            .then(data=>{
                if(data==null) reject({success:false, message: "Error id"})
                else {
                    if(data.facultyId!=facultyId) reject({success:false, message: "Access is denied"})
                    else return data.destroy();
                }
            })
            .then(data=> resolve({success: true}))
            .catch(err=>reject({success:false, message: "Fatal Error"}))
        })
    }
    function create(data,facultyId)
    {
        return new Promise((resolve, reject) => {
            console.log(data)
            Promise.all([
                validator.notUndefined([data.name, data.fullName]),
                validator.facultyFullNameorFullSubject(data.fullName),
                validator.checkAbr(data.name),
                validator.checkSubjectFName(data.fullName, facultyId),
                validator.checkSubjectName(data.name, facultyId)])
            .then(validate=>{        
                return subjectRepository.create({
                    name: data.name,
                    fullName: data.fullName,
                    facultyId: facultyId
                })
            })
            .then(data=>{
                return resolve({success: true})
            })
            .catch(err=>{
                return reject(err)
            })
        })
    }
    /*function delSubject(idSubject,id)
    {
        return new Promise((resolve, reject) => {
            subjectRepository.destroy({ where: { id: idSubject, facultyId: id } })
            .then(data=>{
                    return resolve({succses: true})
                })
                .catch(err=>{
                    return reject({succses: false})
                })
        })
    }
    function updateSubject(data,idSubject, id)//?
    {
        return new Promise((resolve, reject) => {
            repository.update(data, { where: { id: idSubject, facultyId: id}})
        })
    }*/
    function readAll(id)
    {   
        return new Promise((resolve, reject) => {
            subjectRepository.findAll({where:{facultyId: id},attributes: ['id','course','name','fullName']})
            .then(subject=> resolve({success: true, data: subject}))
            .catch(err=> reject(err));
        })
    }
}