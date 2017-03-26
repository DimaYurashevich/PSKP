const express = require('express');
module.exports = (authService) => {
    const router = express.Router();

    router.post('/register',(req, res) =>
    {
        switch(req.body.type)
        {
            case "dean": rez=authService.registrationDean(req.body); break;
            case "teacher": rez=authService.registrationTeacher(req.body); break;
        }
        res.send(rez);
    });
    return router;
}