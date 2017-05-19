module.exports = (absenteeismRepository,validator, errors) => {
    return {
        create: create
    };
    function create(data)
    {
        return new Promise((resolve, reject) => {
            absenteeismRepository.create({
                studentId: data.student,
                datesSubjecId: data.datesSubjec,
                absenteeism: (data.absenteeism!=undefined)?data.absenteeism:null
            })
            .then(absenteeism=> resolve({success: true}))
            .catch(err=>reject(err));
        })
    }
}