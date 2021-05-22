var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");

router.get("/playerFullDetails/:playerId", async (req, res, next) => {
  let players_details = [];
  try {
    const players_details = await players_utils.getPlayerPage(
      req.params.playerId
    );
    res.send(players_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;