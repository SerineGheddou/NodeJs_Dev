const db = require("../models");
const Sortie = db.Sortie;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.createSortie = (req, res) => {
    //Validation de la requete
    if (!req.body.NSortie){
        return res.status(400).send({
            message: `Contenu ne peut pas être vide !`
        });
    }
    //Créer une nouvelle Sortie
    const Newsortie = {
        NSortie: req.body.NSortie,
        DateSortie: req.body.DateSortie,
        NAP:req.body.NAP,
        NImputation: req.body.NImputation,
        Magasin: req.body.Magasin,
        UniteCOM:req.body.UniteCOM,
        Prjt: req.body.Prjt,
    };
    //Sauvgarde dans la bdd
    Sortie.create(Newsortie).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:err.message || "Une erreur s'est produite lors de la creation de la sortie"
        });
    });
  
};


//Retrieve All AP
exports.findAll = (req, res) => {
  Sortie.findAll ().then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
        message:
        err.message || "Une erreur s'est produite lors de la récupération des sorties"
    });
  });
};

//Retrieve data based on NAP
exports.findWithNS = (req, res) => {
  const NSortie = req.query.NSortie;
  
  Sortie.findAll ({
    where: {
      NSortie: {
        [Op.like]:`%${NSortie}%`
      }
    }
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
        message:
        err.message || "Une erreur s'est produite lors de la récupération des sorties"
    });
  });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {};

//Update an AP
exports.update = (req, res) => {
    const NSortie = req.body.NSortie;
    Sortie.update(req.body,{
        where: {NSortie : NSortie}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Mise à jour de la sortie reussite."
            });
        }else{
            res.send({
                message: `La sortie avec NumeroSortie=${NSortie} et ${num} ne peut pas être mise à jour. Veuillez vous assurer du numero`
            });
        }
    })
    .catch(err => {
        res.status(500).send ({
            message: "Erreur lors de la mise à jour de la sortie"
        });
    });
};

//Delete an AP
exports.delete = (req, res) => {
    const id = req.params.id;

    Sortie.destroy({
        where: {id : id}
    })
    .then(num => {
        if (num == 1) {
          res.send({
            message: "Sortie supprimer avec succès!"
          });
        } else {
          res.send({
            message: `Suppression de la sortie avec NumeroSortie=${NSortie} non reussite!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Suppression non reussite" 
        });
      });
};