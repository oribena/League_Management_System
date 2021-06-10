// const axios = require("axios");
// const api_domain = "https://soccer.sportmonks.com/api/v2.0";
// // const TEAM_ID = "85";

// async function getPlayerPage(player_id) {
//   let player_page = await getPlayerData(player_id);
//   return player_page;
// }

// async function getPlayerData(player_id) {
//   const player = await axios.get(`${api_domain}/players/${player_id}`, {
//     params: {
//       api_token: process.env.api_token,
//     },
//   });
//   return {
//     commonname: player.data.data.common_name,
//     nationality: player.data.data.nationality,
//     birthdate: player.data.data.birthdate,
//     birthplace: player.data.data.birthplace,
//     height: player.data.data.height,
//     weight: player.data.data.weight,
//   };
// }

// async function getPlayerIdsByTeam(team_id) {
//   let player_ids_list = [];
//   const team = await axios.get(`${api_domain}/teams/${team_id}`, {
//     params: {
//       include: "squad",
//       api_token: process.env.api_token,
//     },
//   });
//   team.data.data.squad.data.map((player) =>
//     player_ids_list.push(player.player_id)
//   );
//   return player_ids_list;
// }

// async function getPlayersInfo(players_ids_list) {
//   let promises = [];
//   players_ids_list.map((id) =>
//     promises.push(
//       axios.get(`${api_domain}/players/${id}`, {
//         params: {
//           api_token: process.env.api_token,
//           include: "team",
//         },
//       })
//     )
//   );
//   let players_info = await Promise.all(promises);
//   return extractRelevantPlayerData(players_info);
// }

// function extractRelevantPlayerData(players_info) {
//   return players_info.map((player_info) => {
//     const { fullname, image_path, position_id } = player_info.data.data;
//     const { name } = player_info.data.data.team.data;

//     return {
//       name: fullname,
//       team_name: name,
//       image: image_path,
//       position: position_id,
//     };
//   });
// }

// async function getPlayersByTeam(team_id) {
//   let player_ids_list = await getPlayerIdsByTeam(team_id);
//   let players_info = await getPlayersInfo(player_ids_list);
//   return players_info;
// }

// // RETURN ONLY ONE PLAYER
// // async function getPlayerDetails(player_name) {
// //   const player = await axios.get(
// //     `https://soccer.sportmonks.com/api/v2.0/players/search/${player_name}`,
// //     {
// //       params: {
// //         api_token: process.env.api_token,
// //       },
// //     }
// //   );
// //   return {
// //     commonname: player.data.data[0].common_name,
// //     nationality: player.data.data[0].nationality,
// //     birthdate: player.data.data[0].birthdate,
// //     birthplace: player.data.data[0].birthplace,
// //     height: player.data.data[0].height,
// //     weight: player.data.data[0].weight,
// //   };
// // }


// // RETURN ALL PLAYERS
// async function getPlayerDetails(player_name) {
//   let player_list = [];
//   const player = await axios.get(
//     `https://soccer.sportmonks.com/api/v2.0/players/search/${player_name}`,
//     {
//       params: {
//         api_token: process.env.api_token,
//       },
//     }
//   );
//   player.data.data.map((players) =>
//   player_list.push(players));
//   let players_info = await Promise.all(player_list);
//   return extractSearchPlayerData(players_info);
// }

// function extractSearchPlayerData(players_info) {
//   return players_info.map((player_info) => {
//     const { common_name, nationality,birthdate,birthplace,height,weight } = player_info;

//     return {
//       commonname: common_name,
//       nationality: nationality,
//       birthdate: birthdate,
//       birthplace: birthplace,
//       height: height,
//       weight: weight
//     };
//   });
// }

// exports.getPlayersByTeam = getPlayersByTeam;
// exports.getPlayersInfo = getPlayersInfo;
// exports.getPlayerPage = getPlayerPage;
// exports.getPlayerDetails = getPlayerDetails;