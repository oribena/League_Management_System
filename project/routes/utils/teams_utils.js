const axios = require("axios");

async function getTeamDetails(team_name) {
  const team = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/teams/search/${team_name}`,
    {
      params: {
        api_token: process.env.api_token,
      },
    }
  );
  return {
    team_name: team.data.data[0].name,
    team_logo: team.data.data[0].logo_path,
  };
}
exports.getTeamDetails = getTeamDetails;
