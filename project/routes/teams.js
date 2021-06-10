var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
// const players_utils = require("./utils/players_utils");
const teams_utils = require("./utils/teams_utils");

router.get("/teamFullDetails/:teamId", async (req, res, next) => {
  try {
    const team_details = await players_utils.getPlayersByTeam(
      req.params.teamId
    );
    res.send(team_details);
  } catch (error) {
    next(error);
  }
});

router.get("/searchTeam/:teamName", async (req, res, next) => {
  try {
    const team_info = await teams_utils.getTeamDetails(req.params.teamName);
    res.send(team_info);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
