const db = require("../models");
const AvoirArticle = db.AvoirArticle;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.createAvoirArticle = (req, res) => {
    //Créer une nouvelle Sortie
    req.body.data.forEach(element => {
      console.log(element);
      const NewAvoirArticle = {
        Nomenclature: element.Nomenclature,
        NSortie:element.NSortie,
    };
    AvoirArticle.create(NewAvoirArticle).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message:err.message || "Une erreur s'est produite lors de la creation de l'Article"
      });
  });
      
    });
     
 
    //Sauvgarde dans la bdd
    
  
};


