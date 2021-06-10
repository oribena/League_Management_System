var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");
// const matches_utils = require("./utils/matches_utils");
// const DButils = require("../routes/utils/DButils");
const { Time } = require("mssql");

router.put("/addReferee", async (req, res, next) => {
  try {
    let result = await league_utils.addReferee(
      req.body.referee_id,
      req.body.match_id
    );
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.post("/setPermission", async (req, res, next) => {
  try {
    await league_utils.setPermission(req.body.user_id, req.body.permission);
    res.status(201).send("Permission updated");
  } catch (error) {
    next(error);
  }
});

router.post("/createLeague", async (req, res, next) => {
  try {
    let team_assign = await league_utils.assignMatches(
      req.body.teams,
      req.body.policy
    );
    let new_league = league_utils.createNewLeague(
      req.body.name,
      req.body.policy,
      team_assign
    );
    res.status(201).send(new_league);
  } catch (error) {
    res.status(401).send("invalid parameters");
    // next(error);
  }
});

router.post("/addMatchToLeague", async (req, res, next) => {
  try {
    teams_ids = [293, 390, 939, 1020];
    if (!teams_ids.includes(req.body.hometeam)) {
      teams_ids.push(req.body.hometeam);
    }
    if (!teams_ids.includes(req.body.awayteam)) {
      teams_ids.push(req.body.awayteam);
    }
    let new_teams_ids = [req.body.hometeam, req.body.awayteam];
    let team_assign = await league_utils.assignMatches(teams_ids, 1);
    let new_league = await league_utils.updateLeague(
      new_teams_ids,
      "HAPPY LEAGUE",
      1,
      team_assign
    );
    res.status(201).send(new_league);
  } catch (error) {
    res.status(401).send("invalid parameters");
    // next(error);
  }
});

module.exports = router;
