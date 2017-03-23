module.exports = (Sequelize, sequelize) =>{
     return sequelize.define('faculty', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        fullName:{
            type: Sequelize.STRING,
            allowNull: false
        }
    });
}