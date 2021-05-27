var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const auth_utils = require("./utils/auth_utils");
const bcrypt = require("bcryptjs");

router.post("/Register", async (req, res, next) => {
  try {
    const {
      username,
      firstname,
      lastname,
      country,
      password,
      email,
      profilePic,
    } = req.body;

    // parameters exists
    // valid parameters
    // username exists
    const users = await auth_utils.allUsers();

    // const users = await DButils.execQuery(
    //   "SELECT username FROM dbo.users"
    // );

    if (users.find((x) => x.username === req.body.username))
      throw { status: 409, message: "Username taken" };

    //hash the password
    let hash_password = bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.bcrypt_saltRounds)
    );
    req.body.password = hash_password;

    // add the new username
    await auth_utils.register(
      req.body.username,
      req.body.firstname,
      req.body.lastname,
      req.body.country,
      hash_password,
      req.body.email,
      req.body.profilePic
    );

    // await DButils.execQuery(
    //   `INSERT INTO dbo.users (username, firstname, lastname, country, password, email, profilePic, permission) VALUES ('${req.body.username}','${req.body.firstname}','${req.body.lastname}','${req.body.country}', '${hash_password}','${req.body.email}','${req.body.profilePic}','${req.body.permission}')`
    // );
    // await DButils.execQuery(
    //   `INSERT INTO dbo.users (username, password) VALUES ('${req.body.username}', '${hash_password}')`
    // );
    res.status(201).send("user created");
  } catch (error) {
    next(error);
  }
});

router.post("/Login", async (req, res, next) => {
  try {
    const user = await auth_utils.login(req.body.username);
    // const user = (
    //   await DButils.execQuery(
    //     `SELECT * FROM dbo.users WHERE username = '${req.body.username}'`
    //   )
    // )[0];
    // user = user[0];

    // check that username exists & the password is correct
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      throw { status: 401, message: "Username or Password incorrect" };
    }

    // Set cookie
    req.session.user_id = user.user_id;

    // return cookie
    res.status(200).send("login succeeded");
  } catch (error) {
    next(error);
  }
});

router.post("/Logout", function (req, res) {
  req.session.reset(); // reset the session info --> send cookie when  req.session == undefined!!
  res.send({ success: true, message: "logout succeeded" });
});

module.exports = router;
