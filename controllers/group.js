const express = require('express');
module.exports = (groupService, getId) => {
    const router = express.Router();

    router.post('/',(req, res) =>
    {
        groupService.create(req.body,getId(req.cookies["x-access-token"]).faculty)
        .then(data=>res.json(data))
        .catch(err=>res.json(err));
    });
    router.put('/',(req, res) =>
    {
        groupService.nextCourse(getId(req.cookies["x-access-token"]).faculty)
        .then(data=>res.json(data))
        .catch(err=>res.json(err));
    });
    router.delete("/:id",(req, res) =>
    {
        groupService.del(req.params.id, getId(req.cookies["x-access-token"]).faculty)
        .then(data=>res.json(data))
        .catch(err=>res.json(err));
    });
    router.get('/',(req, res) =>
    {
        groupService.readAll(getId(req.cookies["x-access-token"]).faculty)
        .then(data=>{res.send(data)})
        .catch(err=>{console.log("readAll Err"); res.send(err)});
    });
    router.get('/:id',(req, res) =>
    {
        groupService.read(req.params.id,getId(req.cookies["x-access-token"]).faculty)
        .then(data=>res.json(data))
        .catch(err=>res.json(err));;
    });
    return router;
}