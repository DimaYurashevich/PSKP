const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = (authService,groupService,studentService,subjectService,markService,absenteeismService,trainingService,userService, config) => {
    const router = express.Router();
    const authController = require('./auth')(authService);
    const groupController = require('./group')(groupService, getId);
    const studentController = require('./student')(studentService, getId);
    const subjectController = require('./subject')(subjectService, markService,absenteeismService,groupService,studentService, getId);
    const trainingController=require('./training')(trainingService, getId);
    const userController=require('./user')(userService);

    router.use('/auth', authController);
    router.use('/group', groupController);
    router.use('/student',studentController);
    router.use('/subject',subjectController);
    router.use('/training',trainingController);
    router.use('/user',userController);

    return router;

    function getId(token)
    {
        var decoded = jwt.verify(token, config["jwt_key"]);
        return {user: decoded.__user_id,faculty: decoded.__faculty_id};
    }  
};

function promiseHandler(res, promise) {
    promise
        .then((data) => res.json(data))
        .catch((err) => res.error(err));
}
