const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD, {
    host:dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.AP = require("./AP.model.js")(sequelize,Sequelize);
db.user = require("./user.model.js")(sequelize,Sequelize);
db.Sortie = require("./sortie.model.js")(sequelize,Sequelize);
db.Article = require("./article.model.js")(sequelize,Sequelize);
db.AvoirArticle = require("./avoirArticle.model.js")(sequelize,Sequelize);
 module.exports = db;