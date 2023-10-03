
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
}


const db = require("./app/models");
db.sequelize.sync();
//Extracting data from Http request of type application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(cookieParser());

require("./app/routes/ap.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/sortie.routes")(app);
require("./app/routes/article.routes")(app);
require("./app/routes/avoirarticle.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

