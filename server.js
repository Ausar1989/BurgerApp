var express = require("express");
var path = require("path");

var PORT = process.env.PORT || 8080;
var app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.set("view engine", "handlebars");

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));


var routes = require("./controllers/burgersController.js");

app.use(routes);

app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});

