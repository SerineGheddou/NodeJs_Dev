
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const user = db.user;
const Op = db.Sequelize.Op;


//Fonction pour creer un nouveau utilisateur destinee aux admins
exports.CreationUser = async (req, res) => {
    if (!req.body.Username){
        res.status(400).send({
            message: 'Contenu ne peut pas être vide!'
        });
        return;
    }
    if(req.body.Password !== req.body.confPassword) return res.status(400).json({msg: "le mot de passe et la confirmation du mot de passe ne correspondent pas"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.Password, salt);
    //Créer un nouveau utilisateur
    const User = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Type: req.body.Type,
        Username:req.body.Username,
        Password: hashPassword,
    };
    //Sauvgarde dans la bdd
    user.create(User).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:err.message || "Une erreur s'est produite lors de la creation de l'utilisateur"
        });
    });

};

// Fonction pour se connecter
exports.Login = async (req,res) => {
    var authenticated = true;
        const authUser = await user.findAll({
            where: {
                Username: req.body.Username
            }
        });
        const match = await bcrypt.compare(req.body.Password, authUser[0].Password);
        if(!match){ 
            authenticated=false;
            return res.status(400).send({message:"Mot de passe errone"});
        } 
        const userId = authUser[0].id;
        const Username = authUser[0].Username;
        const accessToken = jwt.sign({userId,Username }, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, Username}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await user.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.json({user:authUser[0], accessToken: accessToken, authenticated:authenticated });
        
};

//Retrieve All AP
exports.findAll = (req, res) => {
    user.findAll ().then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
          message:
          err.message || "Une erreur s'est produite lors de la récupération des employés"
      });
    });
  };
  
  //Retrieve data based on NAP
  exports.findWithNom = (req, res) => {
    const Nom = req.query.LastName;
    user.findAll ({
      where: {
        LastName: {
          [Op.like]:`%${Nom}%`
        }
      }
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
          message:
          err.message || "Une erreur s'est produite lors de la récupération des employés"
      });
    });
  };

  //Update an AP
exports.update = (req, res) => {
    const id = req.body.id;
    user.update(req.body,{
        where: {id : id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Mise à jour de l'employe reussite."
            });
        }else{
            res.send({
                message: `L'employe avec id=${id} et ${num} ne peut pas être mis à jour. Veuillez vous assurer du numero`
            });
        }
    })
    .catch(err => {
        res.status(500).send ({
            message: "Erreur lors de la mise à jour de l'employe"
        });
    });
};

//Delete an AP
exports.delete = (req, res) => {
    const id = req.params.id;
    console.log(id);
    user.destroy({
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
          res.send({
            message: "Employe supprimé avec succès!"
          });
        } else {
          res.send({
            message: `Suppression de l'employe avec id=${id} non reussite!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Suppression non reussite" 
        });
      });
};