const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";

// RETURN ONLY ONE TEAM NAME
async function getTeamName(team_id) {
  try {
    const team = await axios.get(
      `https://soccer.sportmonks.com/api/v2.0/teams/${team_id}`,
      {
        params: {
          api_token: process.env.api_token,
        },
      }
    );
    return team.data.data.name;
  } catch (err) {
    return `team '${team_id}'`;
  }
}

// RETURN ONLY ONE TEAM VENUE
async function getTeamVenue(team_name) {
  try {
    const name = await axios.get(
      `https://soccer.sportmonks.com/api/v2.0/teams/${team_name}`,
      {
        params: {
          include: "venue",
          api_token: process.env.api_token,
        },
      }
    );
    return name.data.data.venue.data.name;
  } catch (err) {
    return `${team_name} venue`;
  }
}

exports.getTeamName = getTeamName;
exports.getTeamVenue = getTeamVenue;
