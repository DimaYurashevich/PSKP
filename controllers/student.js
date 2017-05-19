const express = require('express');
module.exports = (studentService, getId) => {
    const router = express.Router();

    router.post('/',(req, res) =>
    {
        console.log(req.body);
        studentService.create(req.body,getId(req.cookies["x-access-token"]).faculty)
        .then(data=>res.send(data))
        .catch(err=>res.send(err))
    });
    return router;
}