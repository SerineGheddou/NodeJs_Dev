
module.exports = (sequelize,Sequelize) => {
    const user = sequelize.define("user", {
        FirstName: {
            type: Sequelize.STRING
        },
        LastName: {
            type: Sequelize.STRING
        },
        Type: {
            type: Sequelize.STRING
        },
        Username:{
            type: Sequelize.STRING
        },
        Password: {
            type: Sequelize.STRING
        },
    }
    );
    return user;
}