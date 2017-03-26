module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: 'mysql',
        logging: false
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const Faculty = require('../models/faculty')(Sequelize, sequelize);
    const Group = require('../models/group')(Sequelize, sequelize);
    const Role = require('../models/role')(Sequelize, sequelize);
    const Student = require('../models/student')(Sequelize, sequelize);
    const Subject = require('../models/subject')(Sequelize, sequelize);
    const Teacher = require('../models/teacher')(Sequelize, sequelize);
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
    
    Group.hasMany(Subject);
    Subject.belongsTo(Group);

    Teacher.hasMany(Subject);
    Subject.belongsTo(Teacher);

    Role.create({role:"admin"});
    Role.create({role:"dean"});
    Role.create({role:"teacher"});
    
    return {
        faculty: Faculty,
        group: Group,
        role: Role,
        student: Student,
        subject: Subject,
        teacher: Teacher,
        user: User,

        sequelize: sequelize
    }
}
