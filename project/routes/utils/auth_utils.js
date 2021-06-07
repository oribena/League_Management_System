const axios = require("axios");
const DButils = require("./DButils");
const bcrypt = require("bcryptjs");

async function userExists(username) {
  const users = await DButils.getAllUsers();
  if (users.find((x) => x.username === username)) {
    return true;
  }
  return false;
}

async function register(
  username,
  firstname,
  lastname,
  country,
  password,
  email,
  profilePic
) {

  //hash the password
  console.log(password);
  let hash_password = bcrypt.hashSync(
    password,
    parseInt(process.env.bcrypt_saltRounds)
  );

  // req.body.password = hash_password;

  try {
    await DButils.register(
      username,
      firstname,
      lastname,
      country,
      hash_password,
      email,
      profilePic
    );
    return true;
  } catch (error) {
    return false;
  }

}

async function login(username, password) {
  const user = await DButils.findUser(username);
  // check that username exists & the password is correct
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return null;
  }
  return user;
}

exports.login = login;
exports.userExists = userExists;
exports.register = register;
