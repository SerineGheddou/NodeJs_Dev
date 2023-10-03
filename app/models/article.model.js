module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define ("Article", {
        Nomenclature: {
            type: Sequelize.STRING
        },
        Libelle: {
            type: Sequelize.CHAR
        },
        PrixUnitaire: {
            type: Sequelize.STRING
        },
    });
    return Article;
}