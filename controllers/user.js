const express = require('express');
module.exports = (userService, getId) => {
    const router = express.Router();

    router.get('/',(req, res) =>
    {
        userService.readAll()
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
    });
    return router;
}