const league_utils = require('../../routes/utils/league_utils');
const DButils = require('../../routes/utils/DButils');
const teams_utils = require('../../routes/utils/teams_utils');

let expected_1 = []
let expected_2 = []
let expected_3 = []

//positive tests
test('positive test assignMatches policy 1', async() => {
    console.log(await league_utils.assignMatches([293, 390, 939, 1020], 1))
    console.log(await league_utils.assignMatches([293, 390, 939, 1020], 2))
    console.log(await league_utils.assignMatches([], 2))
    expect(await league_utils.assignMatches([293, 390, 939, 1020], 1)).toEqual(expected_1)
});
test('positive test assignMatches policy 2', async() => {
    expect(await league_utils.assignMatches([293, 390, 939, 1020], 2)).toEqual(expected_2)
});
test('positive test assignMatches empty list', async() => {
    expect(await league_utils.assignMatches([], 1)).toEqual(expected_3)
});
test('negative test assignMatches repete team id', async() => { //not sure
    // let tested = await league_utils.assignMatches([1, 1], 1);
    expect(await league_utils.assignMatches([390, 390], 1)).toBeNull()

})
test('positive updateLeague', async() => {
    let league_name = "happy league"
    let teams_ids = [293, 390, 939, 1020, 211]
    let league_policy = 1
    let team_assign = ["team assign"]
    let new_league = await league_utils.updateLeague(teams_ids, league_name, league_policy, team_assign)
    expect(new_league).toHaveProperty("id")
    expect(new_league).toHaveProperty("name")
    expect(new_league).toHaveProperty("policy")
    expect(new_league).toHaveProperty("team_assign")
});