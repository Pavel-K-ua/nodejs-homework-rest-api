const { nanoid } = require("nanoid");
const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");

const gravatar = require("gravatar");
const sendEmail = require("../../helpers/sendEmail");

const register = async (req, res) => {
  console.log(req.body);
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid;

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="localhost:3000/api/auth/verify/${verificationToken}">Click to verify you email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = register;
