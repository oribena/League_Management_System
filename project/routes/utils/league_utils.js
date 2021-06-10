const axios = require("axios");
const DButils = require("./DButils");
const teams_utils = require("./teams_utils");
const LEAGUE_ID = 271;

// async function getLeagueDetails() {
//     const league = await axios.get(
//         `https://soccer.sportmonks.com/api/v2.0/leagues/${LEAGUE_ID}`, {
//             params: {
//                 include: "season",
//                 api_token: process.env.api_token,
//             },
//         }
//     );
//     const stage = await axios.get(
//         `https://soccer.sportmonks.com/api/v2.0/stages/${league.data.data.current_stage_id}`, {
//             params: {
//                 api_token: process.env.api_token,
//             },
//         }
//     );
//     return {
//         league_name: league.data.data.name,
//         current_season_name: league.data.data.season.data.name,
//         current_stage_name: stage.data.data.name,
//     };
// }

// async function addMatch(date, time, hometeam, awayteam, stadium) {
//     await DButils.execQuery(
//         `INSERT INTO dbo.matches (date, time, hometeam, awayteam, stadium) VALUES ('${date}','${time}','${hometeam}','${awayteam}', '${stadium}')`
//     );
// }

// async function addEvent(match_id, date, time, gamemin, event) {
//     await DButils.execQuery(
//         `INSERT INTO dbo.eventbook (match_id, date, time, gamemin, event) VALUES ('${match_id}','${date}','${time}','${gamemin}','${event}')`
//     );
// }

// async function addResult(match_id, result) {
//     await DButils.execQuery(
//         `UPDATE dbo.matches SET result = '${result}' WHERE match_id = '${match_id}'`
//     );
// }

async function addReferee(referee_id, match_id) {
    const permission = await DButils.execQuery(
        `SELECT permission FROM users WHERE user_id = '${referee_id}'`
    );
    if (permission[0]["permission"] == 2) {
        await DButils.execQuery(
            `UPDATE dbo.matches SET referee = '${referee_id}' WHERE match_id = '${match_id}'`
        );
        return "Referee updated";
    } else {
        return "The user is not a referee";
    }
}

async function setPermission(user_id, permission) {
    is_set = await DButils.setUserPermission(user_id, permission)
    return is_set

}

function createNewLeague(league_name, league_policy, team_assign) {
    DButils.createLeague(league_name);
    return {
        id: Math.floor(Math.random() * 400) + 1,
        name: league_name,
        policy: league_policy,
        team_assign: team_assign,
    };
}

async function updateLeague(
    teams_ids,
    league_name,
    league_policy,
    team_assign
) {
    let result = [];
    teams_ids.map((id) => {
        result.push(teams_utils.getTeamName(id));
    });
    let teams_names = await Promise.all(result);
    DButils.updateLeague(teams_names);
    return {
        id: Math.floor(Math.random() * 400) + 1,
        name: league_name,
        policy: league_policy,
        team_assign: team_assign,
    };
}

async function assignMatches(teams_ids, policy) {
    let team_id_asSet = new Set(teams_ids)
    if (team_id_asSet.size != teams_ids.length) { throw "invalid parameters" }
    let result = [];
    teams_ids.map((id) => {
        result.push(teams_utils.getTeamName(id));
    });
    let teams_names = await Promise.all(result);
    let assign = [];
    // Policy 2 - Each pair of teams will play twice, each time on the home field of one of the teams.
    if (policy == 2) {
        for (let i = 0; i < teams_names.length - 1; i++) {
            for (let j = i + 1; j < teams_names.length; j++) {
                let venue2 = await teams_utils.getTeamVenue(teams_ids[i]);
                let venue3 = await teams_utils.getTeamVenue(teams_ids[j]);
                assign.push(
                    teams_names[i] + " vs. " + teams_names[j] + " at " + venue2
                );
                assign.push(
                    teams_names[j] + " vs. " + teams_names[i] + " at " + venue3
                );
            }
        }
    } // Policy 1 - Each pair of teams will play against each other only once. 
    else {
        for (let i = 0; i < teams_names.length - 1; i++) {
            for (let j = i + 1; j < teams_names.length; j++) {
                let venue = await teams_utils.getTeamVenue(teams_ids[i]);
                // console.log(venue);
                assign.push(teams_names[i] + " vs. " + teams_names[j] + " at " + venue);
            }
        }
    }

    return assign;
}
// exports.getLeagueDetails = getLeagueDetails;
exports.addReferee = addReferee;
// exports.addEvent = addEvent;
// exports.addMatch = addMatch;
// exports.addResult = addResult;
exports.setPermission = setPermission;
exports.assignMatches = assignMatches;
exports.createNewLeague = createNewLeague;

exports.updateLeague = updateLeague;


// OLD ADD REFEREE
// async function addReferee(referee_id, match_id) {
//   const permission = await DButils.execQuery(
//     `SELECT permission FROM users WHERE user_id = '${referee_id}'`
//   );
//   if (permission[0]["permission"] == 2) {
//     await DButils.execQuery(
//       `UPDATE dbo.matches SET referee = '${referee_id}' WHERE match_id = '${match_id}'`
//     );
//     return "Referee updated";
//   } else {
//     return "The user is not a referee";
//   }
// }