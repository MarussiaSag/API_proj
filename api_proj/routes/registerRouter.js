const express = require("express");
const router = express.Router();
const sha256 = require("sha256");

//registration /register
router.get("/", async (req, res) => {
  const { err } = req.query;
  if (err) {
    res.render("register", {
      message: "Вы уже зарегестрированы по данному email",
    });
  } else {
    // const allRoles = await Role.findAll({ raw: true });
    res.render("register");
  }
});

//create user in db

router.post("/", async (req, res) => {
  await require("../controllers/createUser")(req, res);
  await require("../controllers/pushSession")(req, res);
});

module.exports = router;
