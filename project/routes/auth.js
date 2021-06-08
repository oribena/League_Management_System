var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const auth_utils = require("./utils/auth_utils");

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
    console.log(auth_utils.userExists(req.body.username))
    if (await auth_utils.userExists(req.body.username))
      throw { status: 409, message: "Username taken" };

    // add the new username
    await auth_utils.register(
      req.body.username,
      req.body.firstname,
      req.body.lastname,
      req.body.country,
      req.body.password,
      req.body.email,
      req.body.profilePic
    );

    res.status(201).send("user created");
  } catch (error) {
    next(error);
  }
});

router.post("/Login", async (req, res, next) => {
  try {
    const user = await auth_utils.login(req.body.username, req.body.password);
    // check that username exists & the password is correct
    if (!user) {
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
