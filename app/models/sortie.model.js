module.exports = (sequelize, Sequelize) => {
    const Sortie = sequelize.define ("Sortie", {
        
        NSortie: {
            type: Sequelize.STRING
        },
        DateSortie: {
            type: Sequelize.CHAR
        },
        NAP: {
            type: Sequelize.STRING
        },
        NImputation: {
            type: Sequelize.STRING
        },
        Magasin:{
            type: Sequelize.STRING
        },
        UniteCOM:{
            type: Sequelize.STRING
        },
        Prjt: {
            type: Sequelize.STRING
        }
    });
    return Sortie;
}