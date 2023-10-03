module.exports = app => {
    const aps = require("../controllers/ap.controller.js");
  
    var router = require("express").Router();
  
    // Create a new AP
    router.post("/", aps.create);
    router.post("/import",aps.Import);
    // Retrieve all APS
    router.get("/", aps.findAll);
    router.get("/VueGlobal", aps.VueGlobal);
    //Retrieve AP based on NAP
    router.get("/withNAP", aps.findWithNAP);
    //Retrieve AP with Type
    router.get("/withType", aps.findWithType);

    // Update a Tutorial with id
    router.put("/update", aps.update);
  
    // Delete a Tutorial with id
    router.delete("/delete/:id", aps.delete);
    
    app.use('/api/aps', router);
  };