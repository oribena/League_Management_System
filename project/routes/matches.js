var express = require("express");
var router = express.Router();
// const matches_utils = require("./utils/matches_utils");
// const DButils = require("./utils/DButils");

// router.get("/futureGames", async(req, res, next) => {
//     try {
//         const games = await matches_utils.getFutureGames();
//         res.send(games[0]);
//     } catch (error) {
//         next(error);
//     }
// });

// router.get("/pastGames", async(req, res, next) => {
//     try {
//         const games = await matches_utils.getFutureGames();
//         res.send(games[1]);
//     } catch (error) {
//         next(error);
//     }
// });

// router.get("/nextGame", async(req, res, next) => {
//     try {
//         const games = await matches_utils.getFutureGames();
//         const next = await matches_utils.getNextGame(games[0]);
//         res.send(next);
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router;