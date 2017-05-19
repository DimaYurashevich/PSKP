module.exports = (userRepository) => {
    return {
        readAll: readAll
    };
   
    function readAll()
    {
        return new Promise((resolve, reject) => {
            userRepository.findAll({attributes: ['id','surname','firstname','patronymic']})
            .then(data=>{
                return resolve({success: true,data: data})
            })
            .catch(err=>{return reject({success: false})})
        })
    }
}