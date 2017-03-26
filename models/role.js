module.exports = (Sequelize, sequelize) =>{
     return sequelize.define('role', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
}