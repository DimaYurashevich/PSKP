module.exports = (groupRepository,studentRepository,validator, errors) => {
    return {
        create: create,
        readAll: readAll,
        read: read,
        nextCourse:nextCourse,
        del: del
    };
    function del(id,facultyId)
    {
        return new Promise((resolve, reject) => {
            groupRepository.findOne({where:{id:id}})
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
        console.log("create");
        return new Promise((resolve, reject) => {
            Promise.all([
                validator.notUndefined([data.group,data.subgroup,data.course]),
                validator.checkCourse(data.course),
                validator.isNumber(data.group),
                validator.isNumber(data.subgroup),
                validator.createGroup(data.course,data.group,data.subgroup,facultyId)
            ])
            .then(validate=>{ 
                return groupRepository.create({
                course: data.course,
                group: data.group,
                subgroup: data.subgroup,
                facultyId: facultyId}) 
            })
            .then(data=>{
                return resolve({success: true})
            })
            .catch(err=>{
                return reject(err);
            })
        })
    }
    function nextCourse(facultyId){
        console.log("nextCourse");
        return new Promise((resolve, reject) => {
            groupRepository.findAll({where:{facultyId:facultyId}})
            .then(data=> { return data.forEach(function(element) {
                element.increment('course');});
            })
            .then(data=>resolve({success: true}))
            .catch(err=>reject({success: false, message: "Fatal error"}));
        })
    }
    function readAll(facultyId)
    {
        return new Promise((resolve, reject) => {
            groupRepository.findAll({where: {facultyId: facultyId},
                                    attributes: ['id','course','group','subgroup']})
            .then(data=>{
                return resolve({success: true,data: data})
            })
            .catch(err=>{return reject({success: false})})
        })
    }
    function read(id, facultyId)
    {
        console.log(id+" "+facultyId);
        return new Promise((resolve, reject) => {
            groupRepository.findOne({where:{id: id}})
            .then(group=>{
                if(group.facultyId!=facultyId) throw reject({success: false, message: "access denied"})
                else{
                    return studentRepository.findAll({where: {groupId: id}})
                }
            })
            .then(students=> resolve({success: true, data: students}))
            .catch(err=> reject({success: false, message: "error"}))
        })
    }
}