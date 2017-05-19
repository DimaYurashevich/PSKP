const express = require('express');
module.exports = (authService) => {
    const router = express.Router();

    router.post('/register',(req, res) =>
    {
        switch(req.body.type)
        {
            case "dean": authService.registrationDean(req.body).then(text=>res.send(text)).catch(err=>res.send(err)); break;
            case "teacher": authService.registrationTeacher(req.body).then(text=>res.send(text)).catch(err=>res.send(err)); break;
        }
    });
    router.post('/login',(req, res) =>
    {
        console.log(req.body);
        authService.login(req.body)
        .then(token=>{
            console.log(token);
            res.cookie('x-access-token',token);
            res.send({success: true});
        })
        .catch(err=>{
            res.send({success: false, message: err})});
    });
    router.get('/logout',(req, res) =>
    {
        res.cookie('x-access-token',"");
        res.json({ success: "user logout"});
    });
    return router;
}