module.exports = (sequelize, Sequelize) => {
    const AvoirArticle = sequelize.define ("AvoirArticle", {
        Nomenclature: {
            type: Sequelize.STRING
        },
        NSortie: {
            type: Sequelize.STRING
        }
    });
    return AvoirArticle;
}