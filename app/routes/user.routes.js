
module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
  
    router.post("/register", users.CreationUser);
    router.post("/login", users.Login);
    router.get("/", users.findAll);
    router.get("/WithNom", users.findWithNom);
    router.put("/update", users.update);
    router.delete("/delete/:id", users.delete);
    app.use('/api/users', router);

};
