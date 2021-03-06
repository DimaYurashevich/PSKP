module.exports = (Sequelize, sequelize) =>{
     return sequelize.define('mark', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mark:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date:{
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    });
}