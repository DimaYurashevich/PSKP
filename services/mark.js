module.exports = (markRepository,validator, errors) => {
    return {
        /*create: create,
        readMark:readMark*/
    };
    /*function create(data)
    {
        return new Promise((resolve, reject) => {
            markRepository.create({
                studentId: data.student,
                dateSubjectId: data.dateSubject,
                mark: (data.mark!=undefined)?data.mark:null
            })
            .then(mark=> resolve({success: true}))
            .catch(err=>reject(err));
        })
    }
    function readMark(student, ds)
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                student,
                ds
            ])
            .then(data=>{
                data[1].forEach(function(element1) {
                    data[0].data.forEach(function(element2) {
                        console.log(element1.surname+" "+element2.id);
                    })
                });
            })
            .catch(err=>console.log(err));
        })
    }*/

    function getTable(group, subjectId) {
        return new Promise((resolve, reject)=>{
            markRepository.find({
                where: {
                    subjectId: subjectId
                },
                include: {
                    model: dbcontext.student,
                    where: {
                        group: groupId
                    }
                }
            }).then((marks)=>{

                // формируются массивы дат и студентов с оценками
                var students = [], dates = [];
                marks.forEach(function(mark) {
                    if (!students[mark.studentId])
                        students[mark.studentId] = {
                            info: mark.student,
                            marks: {}
                        };
                    students[mark.studentId].marks[mark.date] = mark.mark;
                    if (dates.indexOf(mark.date)==-1)
                        dates.push(mark.date);
                });

                // формируется верстка (можно вынести в отдельную функцию)
                dates.sort();
                students.sort((a,b)=>a.info.name<b.info.name);
                var html = 
                    '<table>'+
                        '<thead>'+
                            '<td>№</td>'+
                            '<td>Имя</td>';
                dates.forEach(function(date){
                    html += '<td>'+date+'</td>';
                });
                html +=
                        '</thead>';
                var i = 0;
                students.forEach(function(student){
                    html += 
                        '<tr>'+
                            '<td>${++i}</td>'+
                            '<td>${student.info.name}</td>';
                    dates.forEach(function(date){
                        html += '<td>'+((student.marks[date])?student.marks[date]:'')+'</td>';
                    });
                    html +=
                        '</tr>';
                });
                html +=
                    '</table>';
                
                // если не выносить формирование верстки
                resolve(html);

                // если выносить
                // resolve(students, dates);
            });
        })
    }
}