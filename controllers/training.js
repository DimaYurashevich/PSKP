const express = require('express');
module.exports = (trainingService, getId) => {
    const router = express.Router();

    router.post('/',(req, res) =>
    {
        trainingService.create(req.body,getId(req.cookies["x-access-token"]).faculty)
        .then(data=>res.send(data))
        .catch(err=>res.send(err))
    });
    router.get('/faculty',(req, res) =>
    {
        trainingService.readAll(getId(req.cookies["x-access-token"]).faculty)
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
    });
    router.delete("/:id",(req, res) =>
    {
        trainingService.del(req.params.id, getId(req.cookies["x-access-token"]).faculty)
        .then(data=>res.json(data))
        .catch(err=>res.json(err));
    });
    router.get("/:id/student",(req, res) =>
    {
        trainingService.getStudent(req.params.id, getId(req.cookies["x-access-token"]).user)
        .then(data=>res.json(data))
        .catch(err=>res.json(err));
    });
    router.post('/:id/mark',(req, res) =>
    {
        trainingService.newMark(req.body,req.params.id,getId(req.cookies["x-access-token"]).user)
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
    })
    router.post('/:id/absent',(req, res) =>
    {
        trainingService.newAbsenteeism(req.body,req.params.id,getId(req.cookies["x-access-token"]).user)
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
    })
    router.get('/:id/absent',(req, res) =>
    {
        trainingService.getAbsenteeism(req.params.id,getId(req.cookies["x-access-token"]).user)
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
    })
    router.get('/:id/mark',(req, res) =>
    {
        trainingService.getMark(req.params.id,getId(req.cookies["x-access-token"]).user)
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
    })
    router.get('/',(req, res) =>
    {
        trainingService.read(getId(req.cookies["x-access-token"]).user)
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
    });
    return router;
}