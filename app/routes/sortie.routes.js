module.exports = app => {
    const sorties = require("../controllers/sortie.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", sorties.createSortie);
 
    router.get("/", sorties.findAll);

    router.get("/withNS", sorties.findWithNS)

    router.put("/update", sorties.update);
  
    router.delete("/delete/:id", sorties.delete);

  
    app.use('/api/sorties', router);
  };