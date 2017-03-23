module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: 'mysql',
        logging: false
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const Faculty = require('../models/faculty')(Sequelize, sequelize);
    const Group = require('../models/group')(Sequelize, sequelize);
    const Student = require('../models/student')(Sequelize, sequelize);
    const Subject = require('../models/subject')(Sequelize, sequelize);
    const Teacher = require('../models/teacher')(Sequelize, sequelize);

    
    
    return {
        faculty: Faculty,
        group: Group,
        student: Student,
        subject: Subject,
        teacher: Teacher,

        sequelize: sequelize
    }
}
