const { User } = require("../db/models");
const sha256 = require("sha256");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ where: { email } });

  if (!oldUser) {
    const userData = await User.create({
      name,
      email,
      password: sha256(password),
    });
  } else {
    res.redirect("/register/?err=1");
  }
};

module.exports = createUser;
