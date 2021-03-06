module.exports = (Sequelize, sequelize) =>{
     return sequelize.define('absenteeism', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        absenteeism:{
            type: Sequelize.BOOLEAN,
             allowNull: false
        },
        date:{
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    });
}