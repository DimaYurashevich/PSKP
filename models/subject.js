module.exports = (Sequelize, sequelize) =>{
     return sequelize.define('subject', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
}