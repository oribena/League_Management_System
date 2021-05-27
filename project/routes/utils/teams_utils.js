const axios = require("axios");
const api_domain = "https://soccer.sportmonks.com/api/v2.0";
// RETURN ONLY ONE TEAM NAME
async function getTeamName(team_id) {
    const team = await axios.get(
        `https://soccer.sportmonks.com/api/v2.0/teams/${team_id}`, {
            params: {
                api_token: process.env.api_token,
            },
        }
    );
    return team.data.data.name;
}

// RETURN ONLY ONE TEAM VENUE
// async function getTeamVenue(team_name) {
//     const team = await axios.get(
//         `https://soccer.sportmonks.com/api/v2.0/teams/search/'${team_name}'`, {
//             params: {
//                 api_token: process.env.api_token,
//             },
//         }
//     );
//     return team.data.data[0].venue_id;
// }
// RETURN ONLY ONE TEAM VENUE
async function getTeamVenue(team_name) {
    let rand = Math.floor(Math.random() * 4)
    const venue = ['Parken', 'MCH', 'Brøndby Stadion', 'Aalborg Portland Park']
    return venue[rand];
}

// RETURN ALL TEAMS
async function getTeamDetails(team_name) {
    let team_list = [];
    const team = await axios.get(
        `https://soccer.sportmonks.com/api/v2.0/teams/search/${team_name}`, {
            params: {
                api_token: process.env.api_token,
            },
        }
    );
    team.data.data.map((teams) => team_list.push(teams));
    let teams_info = await Promise.all(team_list);
    return extractRelevantTeamData(teams_info);
}

async function getTeamDetails(team_name) {
    let team_list = [];
    const team = await axios.get(
        `https://soccer.sportmonks.com/api/v2.0/teams/search/${team_name}`, {
            params: {
                api_token: process.env.api_token,
            },
        }
    );
    team.data.data.map((teams) => team_list.push(teams));
    let teams_info = await Promise.all(team_list);
    return extractRelevantTeamData(teams_info);
}

function extractRelevantTeamData(teams_info) {
    return teams_info.map((team_info) => {
        const { name, logo_path } = team_info;

        return {
            team_name: name,
            team_logo: logo_path,
        };
    });
}

exports.getTeamDetails = getTeamDetails;
exports.getTeamName = getTeamName;
exports.getTeamVenue = getTeamVenue;