const express = require('express');
module.exports = (authService) => {
    const router = express.Router();

    router.post('/register',(req, res) =>
    {
        authService.login(req.body);
        res.send("ok");
    });
    return router;
}