const express = require('express');
module.exports = (subjectService,datesSubjectService,markService,absenteeismService,groupService,studentService,getId) => {
    const router = express.Router();

    router.post('/',(req, res) =>
    {
        subjectService.create(req.body,getId(req.cookies["x-access-token"]).faculty)
        .then(data=>res.send(data))
        .catch(err=>res.send(err));
    });
    router.delete("/:id",(req, res) =>
    {
        subjectService.del(req.params.id, getId(req.cookies["x-access-token"]).faculty)
        .then(data=>res.json(data))
        .catch(err=>res.json(err));
    });
    router.get('/',(req, res) =>
    {
        subjectService.readAll(getId(req.cookies["x-access-token"]).faculty)
        .then(data=>{console.log(data);res.json(data)})
        .catch(err=>{console.log(err);res.json(err)});
    });
    /*router.post('/:id/newdate',(req, res) =>
    {
        console.log("OK");
        datesSubjectService.create(req.body,req.params.id)
        .then(data=>res.json(data));
    });
    router.get('/:id',(req, res) =>
    {
        markService.readMark(
            datesSubjectService.readAll(req.params.id),
            studentService.getStudent(subjectService.getGroup(req.params.id)))
        .then(data=>res.json(data));
    });
    router.post('/addMark',(req, res) =>{
        markService.create(req.body)
        .then(data=>res.json(data));
    });
    router.post('/addAbsenteeism',(req, res) =>{
        absenteeismService.create(req.body)
        .then(data=>res.json(data));
    });*/
    return router;
}