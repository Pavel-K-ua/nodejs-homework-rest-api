const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw RequestError(401, "Email or password wrong");
  }

  const token = "token89ew7gewg789we9g7";

  res.json({
    token,
  });
};

module.exports = login;
