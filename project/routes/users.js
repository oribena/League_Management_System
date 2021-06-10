var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const users_utils = require("./utils/users_utils");
const players_utils = require("./utils/players_utils");
const matches_utils = require("./utils/matches_utils");


/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function(req, res, next) {
    if (req.session && req.session.user_id) {
        DButils.execQuery("SELECT user_id FROM users")
            .then((users) => {
                if (users.find((x) => x.user_id === req.session.user_id)) {
                    req.user_id = req.session.user_id;
                    next();
                }
            })
            .catch((err) => next(err));
    } else {
        res.sendStatus(401);
    }
});

/**
 * This path gets body with playerId and save this player in the favorites list of the logged-in user
 */
// router.post("/favoritematches", async (req, res, next) => {
//   try {
//     const user_id = req.session.user_id;
//     const match_id = req.body.match_id;
//     await users_utils.markMatchAsFavorite(user_id, match_id);
//     res.status(201).send("The match successfully saved as favorite");
//   } catch (error) {
//     next(error);
//   }
// });

/**
 * This path returns the favorites players that were saved by the logged-in user
 */
// router.get("/favoritematches", async (req, res, next) => {
//   try {
//     const user_id = req.session.user_id;
//     let favorite_matches = {};
//     const match_ids = await users_utils.getFavoriteMatches(user_id);
//     let match_ids_array = [];
//     match_ids.map((element) => match_ids_array.push(element.match_id)); //extracting the matches ids into array
//     const results = await matches_utils.getFavoritsGames(match_ids_array);
//     res.status(200).send(results);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;