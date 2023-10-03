module.exports = (sequelize, Sequelize) => {
    const AP = sequelize.define ("AP", {
        NAP: {
            type: Sequelize.STRING
        },
        CentreComptable:{
            type: Sequelize.STRING
        },
        CodeAP : {
            type: Sequelize.STRING
        },
        Libelle: {
            type: Sequelize.STRING
        },
        Montant: {
            type: Sequelize.STRING
        },
        Statut: {
            type: Sequelize.CHAR
        },
        Prjt: {
            type: Sequelize.STRING
        },
        DateCreation: {
            type: Sequelize.STRING
        },
        Exercice:{
            type: Sequelize.STRING
        },
    });
    return AP;
}