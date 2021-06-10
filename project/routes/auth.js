var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");
const auth_utils = require("./utils/auth_utils");

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

module.exports = router;
