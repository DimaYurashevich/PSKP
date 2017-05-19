module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: 'mysql',
        logging: false
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const Absenteeism = require('../models/absenteeism')(Sequelize, sequelize);
    const DatesSubject = require('../models/datesSubject')(Sequelize, sequelize);
    const Faculty = require('../models/faculty')(Sequelize, sequelize);
    const Group = require('../models/group')(Sequelize, sequelize);
    const Mark = require('../models/mark')(Sequelize, sequelize);
    const Role = require('../models/role')(Sequelize, sequelize);
    const Student = require('../models/student')(Sequelize, sequelize);
    const Subject = require('../models/subject')(Sequelize, sequelize);
    const Training= require('../models/training')(Sequelize, sequelize);
    const User = require('../models/user')(Sequelize, sequelize);
    const UserRole = require('../models/userRole')(Sequelize, sequelize);

    User.hasMany(Faculty);
    Faculty.belongsTo(User);

    User.belongsToMany(Role,{ through: UserRole });
    Role.belongsToMany(User,{ through: UserRole });

    Faculty.hasMany(Group);
    Group.belongsTo(Faculty);

    Group.hasMany(Student);
    Student.belongsTo(Group);
    
    Faculty.hasMany(Subject);
    Subject.belongsTo(Faculty);

    Student.hasMany(Mark);
    Mark.belongsTo(Student);

    /*User.hasMany(Training);
    Training.belongsTo(User);

    Group.hasMany(Training);
    Training.belongsTo(Group);

    Subject.hasMany(Training);
    Training.belongsTo(Subject);*/
    User.hasMany(Training);
    Training.belongsTo(User);

    Subject.hasMany(Training);
    Training.belongsTo(Subject);

    Group.hasMany(Training);
    Training.belongsTo(Group);

    Training.hasMany(DatesSubject);
    DatesSubject.belongsTo(Training);

    DatesSubject.hasMany(Mark);
    Mark.belongsTo(DatesSubject);

    Student.hasMany(Absenteeism);
    Absenteeism.belongsTo(Student);

    DatesSubject.hasMany(Absenteeism);
    Absenteeism.belongsTo(DatesSubject);

    
    return {
        absenteeism: Absenteeism,
        datesSubject:DatesSubject,
        faculty: Faculty,
        group: Group,
        mark: Mark,
        role: Role,
        student: Student,
        subject: Subject,
        training: Training,
        user: User,
        userRole: UserRole,

        sequelize: sequelize
    }
}
