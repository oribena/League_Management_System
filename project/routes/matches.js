var express = require("express");
var router = express.Router();
const matches_utils = require("./utils/matches_utils");
const DButils = require("./utils/DButils");


// router.post("/matchDetails/:matchId", async (req, res, next) => {
//     try {
      
//       // parameters exists
//       // valid parameters
//       // username exists   
//       const matchs = await DButils.execQuery(
//         "SELECT match_id FROM dbo.matches WHERE match_id == matchId"
//       );
  
//       if (!(matchs.find((x) => x.match_id === req.params.matchId)))
//         throw { status: 409, message: "Match ID not found" };
      
//     } catch (error) {
//       next(error);
//     }
//   });


router.get("/futureGames", async (req, res, next) => {
    try {
      const games = await matches_utils.getFutureGames();
      res.send(games[0]);
    } catch (error) {
      next(error);
    }
  });

router.get("/pastGames", async (req, res, next) => {
  try {
    const games = await matches_utils.getFutureGames();
    res.send(games[1]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
