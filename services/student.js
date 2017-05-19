module.exports = (studentRepository,validator, errors) => {
    return {
        create: create
    };
    function create(data, facultuId)
    {
        console.log("StudentCreate");
        return new Promise((resolve, reject) => {
            Promise.all([
                validator.notUndefined([data.groupId,data.firstname,data.surname,data.patronymic]),
                validator.checkGroup(data.groupId,facultuId),
                validator.nameAndPatronymic(data.firstname,data.patronymic),
                validator.surName(data.surname)
            ])
            .then(valid=>{
                return studentRepository.create({
                    surname: data.surname,
                    firstname: data.firstname,
                    patronymic: data.patronymic,
                    groupId: data.groupId
                })
            })
            .then(data=>{
                return resolve({success: true})
            })
            .catch(err=>{
                console.log(err);
                return reject(err);
            })
        })
    }
}