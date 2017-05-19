module.exports = (Sequelize, sequelize) =>{
     return sequelize.define('user', {
         id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login:{
            type: Sequelize.STRING,
            validate:{
                len:[3,30]
            }
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false
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