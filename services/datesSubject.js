module.exports = (datesSubjectRepository,validator, errors) => {
    return {
        create: create,
        readAll:readAll
    };
    function create(data, id)
    {
        return new Promise((resolve, reject) => {
            console.log("OK");
            datesSubjectRepository.create({
                date: data.date,
                subjectId: id,
                info: (data.info!=undefined)?data.info:null
            })
            .then(ds=> resolve({success: true}))
            .catch(err=>reject(err));
        })
    }
    function readAll(id)
    {
        console.log("readAll");
        return new Promise((resolve, reject) => {
            datesSubjectRepository.findAll({where:{
                subjectId: id
            }})
            .then(ds=>{console.log(ds); resolve({success: true, data: ds})})
            .catch(err=>reject(err));
        })
    }
}