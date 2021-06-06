// const DButils = require('../../routes/utils/DButils');
const teams_utils = require('../../routes/utils/teams_utils');


test('positive test getTeamName', async () => {
    const teamId = 32223;
    const teamName = await teams_utils.getTeamName(teamId);
    expect(teamName).toBeTruthy();

});

test('negative test getTeamName id doesnt exist', async () => {
    const teamId = 1;
    const teamName = await teams_utils.getTeamName(teamId);
    expect(teamName).toBeFalsy();

});

test('positive test getTeamVenue', async () => {
    const teamName = 32223;
    const teamVenue = await teams_utils.getTeamVenue(teamName);
    expect(teamVenue).toBeTruthy();

});

test('negative test getTeamVenue name doesnt exist', async () => {
    const teamName = 32223;
    const teamVenue = await teams_utils.getTeamVenue(teamName);
    expect(teamVenue).toBeTruthy();

});

// DButils.disconnectDB()