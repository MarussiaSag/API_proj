var express = require("express");
var router = express.Router();

//render /login

router.get("/", (req, res) => {
  const { err } = req.query;
  if (err) {
    res.render("login", {
      message: "Вы ошиблись при вводе почты или пароля, повторите попытку ",
    });
  } else {
    res.render("login");
  }
});

//post /login, create sessions

router.post("/", require("../controllers/pushSession.js"));

module.exports = router;
