const axios = require("axios");
const DButils = require("./DButils");

async function allUsers() {
  let res = await DButils.execQuery("SELECT username FROM dbo.users");
  return res;
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
  await DButils.execQuery(
    `INSERT INTO dbo.users (username, firstname, lastname, country, password, email, profilePic) VALUES ('${username}','${firstname}','${lastname}','${country}', '${password}','${email}','${profilePic}')`
  );
}

async function login(username) {
  let res = (
    await DButils.execQuery(
      `SELECT * FROM dbo.users WHERE username = '${username}'`
    )
  )[0];
  return res;
}

exports.register = register;
exports.allUsers = allUsers;
exports.login = login;
