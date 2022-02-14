const { User } = require("../db/models");
const sha256 = require("sha256");

const pushSession = async (req, res) => {
  const { email, password } = req.body;
  const ourUser = await User.findOne({ where: { email } });
  if (ourUser?.email === email) {
    if (ourUser.password === sha256(password)) {
      req.session.user = {
        id: ourUser.id,
        name: ourUser.name,
        email: ourUser.email,
        role: ourUser.role
      };
      res.redirect("/");
    } else {
      res.redirect("/login/?err=2");
    }
  } else {
    res.redirect("/login/?err=3");
  }

};

module.exports = pushSession;
