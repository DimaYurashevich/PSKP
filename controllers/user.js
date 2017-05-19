const express = require('express');
module.exports = (trainingService, getId) => {
    const router = express.Router();

    router.get('/',(req, res) =>
    {
        trainingService.readAll()
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
    });
    return router;
}