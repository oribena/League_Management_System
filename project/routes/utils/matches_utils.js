const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
const DButils = require("./DButils");

async function getFavoritsGames(matches_ids_array) {
  let promises = [];
  matches_ids_array.map((id) =>
    promises.push(
      DButils.execQuery(`SELECT * FROM dbo.matches WHERE match_id = '${id}'`)
    )
  );
  let favorite_info = await Promise.all(promises);
  return extractFavoriteGamesData(favorite_info);
}

// Handel favorite games
function extractFavoriteGamesData(favorite_info) {
  return favorite_info.map((game) => {
    const { date, time, hometeam, awayteam, stadium } = game[0];

    return {
      date: date,
      time: time,
      hometeam: hometeam,
      awayteam: awayteam,
      stadium: stadium,
    };
  });
}

async function getFutureGames() {
  const matches = await DButils.execQuery(`SELECT * FROM matches`);
  let future = [];
  let past = [];
  let today = new Date(); // Today date
  let hours = String(today.getHours()).padStart(2, "0");
  let minute = String(today.getMinutes()).padStart(2, "0");
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  matches.forEach((temp) => {
    let date_list = temp["date"].split("/"); // Date of curr match
    let dd2 = date_list[0];
    let mm2 = date_list[1];
    let yyyy2 = date_list[2];
    let time_list = temp["time"].split(":"); // Time of curr match
    let hours2 = time_list[0];
    let minute2 = time_list[1];
    if (yyyy > yyyy2) {
      past.push(temp);
    } else if (yyyy == yyyy2) {
      if (mm > mm2) {
        past.push(temp);
      } else if (mm == mm2) {
        if (dd > dd2) {
          past.push(temp);
        } else if (dd == dd2) {
          // The same date
          if (hours > hours2) {
            past.push(temp);
          } else if (hours == hours2) {
            // The same hours
            if (minute > minute2) {
              past.push(temp);
            } else {
              future.push(temp);
            }
          } else {
            future.push(temp);
          }
        } else {
          future.push(temp);
        }
      } else {
        future.push(temp);
      }
    } else {
      future.push(temp);
    }
  });
  // console.log(future)
  // console.log(past)
  let future_info = await Promise.all(future);
  let past_info = await Promise.all(past);
  // return extractPastGamesData(past_info);
  let Pres = extractPastGamesData(past_info);
  let Fres = extractFutureGamesData(future_info);
  return [Fres, Pres];
}

// Handel future games
function extractFutureGamesData(future_info) {
  return future_info.map((game) => {
    const { date, time, hometeam, awayteam, stadium } = game;

    return {
      date: date,
      time: time,
      hometeam: hometeam,
      awayteam: awayteam,
      stadium: stadium,
    };
  });
}

async function test(match_id) {
  const match_events = await DButils.execQuery(
    `SELECT * FROM eventbook WHERE match_id = '${match_id}'`
  );
  return match_events;
}

// Handel past games
function extractPastGamesData(past_info) {
  return past_info.map((game) => {
    const { date, time, hometeam, awayteam, stadium, result } = game;
    const eventsFromDB = test(game["match_id"]);

    return {
      date: date,
      time: time,
      hometeam: hometeam,
      awayteam: awayteam,
      stadium: stadium,
      result: result,
    };
  });
}

// Handel next game
function getNextGame(games) {
  let next = games[0];

  games.forEach((temp) => {
    let next_date_list = next["date"].split("/"); // Date of next match
    let dd = next_date_list[0];
    let mm = next_date_list[1];
    let yyyy = next_date_list[2];
    let next_time_list = next["time"].split(":"); // Time of next match
    let hours = next_time_list[0];
    let minute = next_time_list[1];
    /////////////////////////////////////////
    let date_list = temp["date"].split("/"); // Date of curr match
    let dd2 = date_list[0];
    let mm2 = date_list[1];
    let yyyy2 = date_list[2];
    let time_list = temp["time"].split(":"); // Time of curr match
    let hours2 = time_list[0];
    let minute2 = time_list[1];
    if (yyyy > yyyy2) {
      next = temp;
    } else if (yyyy == yyyy2) {
      if (mm > mm2) {
        next = temp;
      } else if (mm == mm2) {
        if (dd > dd2) {
          next = temp;
        } else if (dd == dd2) {
          // The same date
          if (hours > hours2) {
            next = temp;
          } else if (hours == hours2) {
            // The same hours
            if (minute > minute2) {
              next = temp;
            }
          }
        }
      }
    }
  });
  return next;
}

exports.getFutureGames = getFutureGames;
exports.extractPastGamesData = extractPastGamesData;
exports.getFavoritsGames = getFavoritsGames;
exports.getNextGame = getNextGame;
