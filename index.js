const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



const config = require('./config');
const permissions = require('./permissions');
const errors = require('./utils/errors');
const auth = require('./utils/auth')(permissions, errors, config);

const dbcontext = require('./context/db')(Sequelize, config);
const validator = require('./utils/validate')(dbcontext.user,dbcontext.group,dbcontext.faculty,dbcontext.subject, dbcontext.training);
const authService = require('./services/auth')(dbcontext.user, dbcontext.role, dbcontext.userRole, dbcontext.faculty, validator, errors, config);
const absenteeismService = require('./services/absenteeism')(dbcontext.absenteeism,validator, errors);
const groupService = require('./services/group')(dbcontext.group,dbcontext.student,validator, errors);
const markService = require('./services/mark')(dbcontext.mark, validator, errors);
const studentService = require('./services/student')(dbcontext.student,validator, errors);
const subjectService = require('./services/subject')(dbcontext.subject,validator, errors);
const trainingService=require('./services/training')(dbcontext.training,dbcontext.student,dbcontext.group,dbcontext.user,dbcontext.subject,dbcontext.mark,dbcontext.absenteeism, validator, errors);
const userService= require('./services/user')(dbcontext.user);
const apiController = require('./controllers/api')(authService,groupService,studentService,subjectService,markService,absenteeismService,trainingService,userService, config);

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//app.use('/api', auth);
app.use('/api', apiController);

dbcontext.sequelize.sync()
    .then(() => {
        app.listen(3000, () => console.log('Running'));
    })
    .catch((err) => console.log(err));