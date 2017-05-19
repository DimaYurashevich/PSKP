module.exports = (Sequelize, sequelize) =>{
     return sequelize.define('training', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });
}