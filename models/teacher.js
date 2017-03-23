module.exports = (Sequelize, sequelize) =>{
     return sequelize.define('teacher', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
         surname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        patronymic: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
}