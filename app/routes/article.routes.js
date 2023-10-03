module.exports = app => {
    const articles = require("../controllers/article.controller.js");
  
    var router = require("express").Router();
  
    // Create a new AP
    router.post("/", articles.createArticle);
  
    // Retrieve all APS
    router.get("/", articles.findAll);
    //Retrieve AP based on NAP
    router.get("/withNN", articles.findWithNN);

    // Update a Tutorial with id
    router.put("/update", articles.update);
  
    // Delete a Tutorial with id
    router.delete("/delete/:id", articles.delete);

  
    app.use('/api/articles', router);
  };