var db = require("../models");

module.exports = function(app) {
  //GET ROUTES ####################################################################################

  app.get("/", function(req, res) {
    console.log("******************************************");
    console.log("******************************************");
    console.log("******************************************");
    console.log("/ route hit");
    res.redirect("/api/allburgers");
  });

  app.get("/api/allburgers", function(req, res) {
    db.Burger.findAll({}).then(function(result) {
      console.log(result)
      res.render("index", { datum: result });
    });
  });

  app.get("/api/isdevoured", function(req, res) {
    db.Burger.findAll({
      where: {
        devoured: true
      }
    }).then(function(result) {
      res.render("index", { datum: result });
    });
  });

  app.get("/api/isnotdevoured", function(req, res) {
    db.Burger.findAll({
      where: {
        devoured: false
      }
    }).then(function(result) {
      res.render("index", { datum: result });
    });
  });

  // //POST ROUTES ####################################################################################

  app.post("/api/addnewburger", function(req, res) {
    db.Burger.create(req.body).then(function(result) {
      res.send("Burger added.");
    });
  });

  //PUT ROUTES ####################################################################################

  app.put("/api/changedevouredstatus", function(req, res) {
    db.Burger.update(req.body.newdevouredstatus, {
      where: {
        id: req.body.id
      }
    }).then(function() {
      res.send("Burger updated.");
    });
  });

  //DELETE ROUTES ####################################################################################

  app.delete("/api/deleteaburger", function(req, res) {
    db.Burger.destroy({
      where: {
        id: req.body.id
      }
    }).then(function(result) {
      res.send("Burger deleted.");
    });
  });

  //CLOSING SYNTAX ####################################################################################
};
