const mysql = require("mysql2");
const db = require("../models");
const AP = db.AP;
const Op = db.Sequelize.Op;
const dbConfig = require("../config/db.config.js");
var pool = require("../config/pool.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    //Validation de la requete
    if (!req.body.NAP){
        res.status(400).send({
            message: `Contenu ne peut pas être vide ${req.body.NAP}!`
        });
        return;
    }
    //Créer une nouvelle AP
    const AutorisationProgramme = {
      NAP : req.body.NAP,
      CentreComptable : req.body.CentreComp,
      CodeAP : req.body.CAP ,
      Libelle : req.body.Libelle,
      Montant : req.body.Montant,
      Statut : req.body.Statut,
      Prjt : req.body.Projet,
      DateCreation : req.body.DateCreation,
      Exercice : req.body.Exercice,
    };
    //Sauvgarde dans la bdd
    AP.create(AutorisationProgramme).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:err.message || "Une erreur s'est produite lors de la creation de l'AP"
        });
    });
  
};


//Retrieve All AP
exports.findAll = (req, res) => {
  AP.findAll ().then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
        message:
        err.message || "Une erreur s'est produite lors de la récupération des AP"
    });
  });
};

//Retrieve data based on NAP
exports.findWithNAP = (req, res) => {
  const NAP = req.query.NAP;
  AP.findAll ({
    where: {
      NAP: {
        [Op.like]:`%${NAP}%`
      },
    }
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
        message:
        err.message || "Une erreur s'est produite lors de la récupération des AP"
    });
  });
};
exports.findWithType = (req, res) => {
  
  const L1 = req.query.L1;
  const L2 = req.query.L2;
  const L3 = req.query.L3;
  
  AP.findAll ({
    where: {
      [Op.or]:[{
        NAP: {
          [Op.like]:`${L1}%`
        }},
        {NAP: {
          [Op.like]:`${L2}%`
        }},
        {NAP: {
          [Op.like]:`${L3}%`
        }},
      ]}
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
        message:
        err.message || "Une erreur s'est produite lors de la récupération des AP"
    });
  });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {};

//Update an AP
exports.update = (req, res) => {
    const NAP = req.body.NAP;

    AP.update(req.body,{
        where: {NAP : NAP}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Mise à jour de l'AP reussite."
            });
        }else{
            res.send({
                message: `L'AP avec NumeroAP=${NAP} et ${num} ne peut pas être mise à jour. Veuillez vous assurer du numero`
            });
        }
    })
    .catch(err => {
        res.status(500).send ({
            message: "Erreur lors de la mise à jour de l'AP"
        });
    });
};

//Delete an AP
exports.delete = (req, res) => {
    const id = req.params.id;

    AP.destroy({
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
          res.send({
            message: "AP supprimer avec succès!"
          });
        } else {
          res.send({
            message: `Suppression de l'AP avec NumeroAP=${NAP} non reussite!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Suppression non reussite" 
        });
      });
};

exports.VueGlobal = (req,res) => {
  let sql = 'SELECT * FROM APs';
  var connection = mysql.createConnection({
    host : dbConfig.HOST,
    user : dbConfig.USER,
    password : dbConfig.PASSWORD,
    database : dbConfig.DB,
  });
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Inventory received.');
    });

}
exports.Import = (req,res) => {
  let sql = `LOAD DATA INFILE '${req.body.file}'
  into table APs
  CHARACTER SET latin1
  FIELDS TERMINATED BY ';'
         ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES
  (@"Centre comptable",@"Code Ap",@"Numéro Ap",@"Libelle Ap",@"Montant Ap (KDA)",@"statut Ap",@Projet,@"CH-A",@"Date création",@Exercice ,@"Accordé (KDA)") set Centrecomptable=@"Centre comptable"  ,CodeAP=@"Code Ap",NAP=@"Numéro Ap"  ,Libelle=@"Libelle Ap" , Montant=@"Montant Ap (KDA)" , Statut=@"statut Ap" ,
  Prjt=@Projet, DateCreation=@"Date création" ,Exercice=@Exercice;  
  `;
  
    pool.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Inventory received.');
    });

}