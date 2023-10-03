module.exports = app => {
    const avoirarticles = require("../controllers/avoirarticle.controller.js");
  
    var router = require("express").Router();
  
    // Create a new AP
    router.post("/", avoirarticles.createAvoirArticle);
  
    
    app.use('/api/avoirarticles', router);
  };