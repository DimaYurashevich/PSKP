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
    router.get('/',(req, res) =>
    {
        trainingService.read(getId(req.cookies["x-access-token"]).user)
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
    });
    return router;
}