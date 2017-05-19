module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: 'mysql',
        logging: false
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const Absenteeism = require('../models/absenteeism')(Sequelize, sequelize);
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

    Student.hasMany(Mark);
    Mark.belongsTo(Student);

    Training.hasMany(Mark);
    Mark.belongsTo(Training);

    Student.hasMany(Absenteeism);
    Absenteeism.belongsTo(Student);

    Training.hasMany(Absenteeism);
    Absenteeism.belongsTo(Training);

    
    return {
        absenteeism: Absenteeism,
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
