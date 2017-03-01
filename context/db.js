module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: 'mysql',
        logging: false
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);
    const Student = require('../models/student')(Sequelize, sequelize);
    return {
        student: Student,
        sequelize: sequelize
    }
}
