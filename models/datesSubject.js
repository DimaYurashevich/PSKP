module.exports = (Sequelize, sequelize) =>{
     return sequelize.define('dateSubject', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date:{
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        info: {
            type: Sequelize.STRING
        }
    });
}