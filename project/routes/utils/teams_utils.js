const axios = require("axios");

// RETURN ONLY ONE TEAM
// async function getTeamDetails(team_name) {
//   const team = await axios.get(
//     `https://soccer.sportmonks.com/api/v2.0/teams/search/${team_name}`,
//     {
//       params: {
//         api_token: process.env.api_token,
//       },
//     }
//   );
//   return {
//     team_name: team.data.data[0].name,
//     team_logo: team.data.data[0].logo_path,
//   };
// }

// RETURN ALL TEAMS
async function getTeamDetails(team_name) {
    let team_list = [];
    const team = await axios.get(
      `https://soccer.sportmonks.com/api/v2.0/teams/search/${team_name}`,
      {
        params: {
          api_token: process.env.api_token,
        },
      }
    );
    team.data.data.map((teams) =>
    team_list.push(teams));
    let teams_info = await Promise.all(team_list);
    return extractRelevantTeamData(teams_info);
}

function extractRelevantTeamData(teams_info) {
    return teams_info.map((team_info) => {
      const { name, logo_path } = team_info;
  
      return {
        team_name: name,
        team_logo: logo_path
      };
    });
  }

exports.getTeamDetails = getTeamDetails;
