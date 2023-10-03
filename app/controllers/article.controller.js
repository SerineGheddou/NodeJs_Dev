const db = require("../models");
const Article = db.Article;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.createArticle = (req, res) => {
    //Validation de la requete
    if (!req.body.Nomenclature){
        return res.status(400).send({
            message: `Contenu ne peut pas être vide !`
        });
    }
    //Créer une nouvelle Sortie
    const NewArticle = {
        Nomenclature: req.body.Nomenclature,
        Libelle: req.body.Libelle,
        PrixUnitaire:req.body.PrixUnitaire
    };
    //Sauvgarde dans la bdd
    Article.create(NewArticle).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:err.message || "Une erreur s'est produite lors de la creation de l'Article"
        });
    });
  
};
//Retrieve All AP
exports.findAll = (req, res) => {
  Article.findAll ().then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
        message:
        err.message || "Une erreur s'est produite lors de la récupération des articles"
    });
  });
};

//Retrieve data based on NAP
exports.findWithNN = (req, res) => {
  const Nomenclature = req.query.Nomenclature;
  
  Article.findAll ({
    where: {
        Nomenclature: {
        [Op.like]:`%${Nomenclature}%`
      }
    }
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
        message:
        err.message || "Une erreur s'est produite lors de la récupération des Articles"
    });
  });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {};

//Update an AP
exports.update = (req, res) => {
    const Nomenclature = req.body.Nomenclature;
    Sortie.update(req.body,{
        where: {Nomenclature : Nomenclature}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Mise à jour de l'Article reussite."
            });
        }else{
            res.send({
                message: `L'Article avec NN=${Nomenclature} et ${num} ne peut pas être mise à jour. Veuillez vous assurer du numero`
            });
        }
    })
    .catch(err => {
        res.status(500).send ({
            message: "Erreur lors de la mise à jour de l'Article"
        });
    });
};

//Delete an Article
exports.delete = (req, res) => {
    const id = req.params.id;
    Article.destroy({
        where: {id:id}
    })
    .then(num => {
        if (num == 1) {
          res.send({
            message: "Article supprimer avec succès!"
          });
        } else {
          res.send({
            message: `Suppression de l'Article avec NN=${id} non reussite!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Suppression non reussite" 
        });
      });
};