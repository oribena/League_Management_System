var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");
const DButils = require("../routes/utils/DButils");

router.get("/getDetails", async (req, res, next) => {
  try {
    const league_details = await league_utils.getLeagueDetails();
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});

router.post("/addMatch", async (req, res, next) => {
  try {

    // add the new match
    await DButils.execQuery(
      `INSERT INTO dbo.matches (date, time, hometeam, awayteam, stadium, result, referee) VALUES ('${req.body.date}','${req.body.time}','${req.body.hometeam}','${req.body.awayteam}', '${req.body.stadium}','${req.body.result}','${req.body.referee}')`
    );
    res.status(201).send("match created");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
