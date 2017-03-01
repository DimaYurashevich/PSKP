module.exports = (Sequelize, sequelize) =>{
     return sequelize.define('student', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        surname:    Sequelize.STRING ,
        firstname:  Sequelize.STRING,
        patronymic: Sequelize.STRING,
        dateBirth:  Sequelize.DATEONLY,
        adress:     Sequelize.STRING,
        passportID: Sequelize.STRING,
        passportInfo: Sequelize.STRING,
        groupStudent: Sequelize.INTEGER,
        typeTraining: Sequelize.ENUM('Платная', 'Бюджетная','Заочная')
    });

}