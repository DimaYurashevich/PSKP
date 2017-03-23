module.exports = (Sequelize, sequelize) =>{
     return sequelize.define('group', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        course: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        group:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        subgroup: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
}