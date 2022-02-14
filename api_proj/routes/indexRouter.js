const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
  
  res.render("index");
});



router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("auth");
  res.redirect("/");
});
module.exports = router;
