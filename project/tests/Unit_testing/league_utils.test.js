const league_utils = require('../../routes/utils/league_utils');
const teams_utils = require('../../routes/utils/teams_utils');
const { test, expect } = require('@jest/globals')
const setup = require("../setupTests")
    //init stubs 
const spyTeamName = jest.spyOn(teams_utils, 'getTeamName').mockImplementation((team_id) => "MockTeam " + team_id)
const spyTeamVenue = jest.spyOn(teams_utils, 'getTeamVenue').mockImplementation((team_name) => "MockVenue of team" + team_name)


// console.log(await league_utils.assignMatches([1, 2, 3], 2))
let expected_1 = [
    'MockTeam 1 vs. MockTeam 2 at MockVenue of team1',
    'MockTeam 1 vs. MockTeam 3 at MockVenue of team1',
    'MockTeam 2 vs. MockTeam 3 at MockVenue of team2'
]
let expected_2 = [
    'MockTeam 1 vs. MockTeam 2 at MockVenue of team1',
    'MockTeam 2 vs. MockTeam 1 at MockVenue of team2',
    'MockTeam 1 vs. MockTeam 3 at MockVenue of team1',
    'MockTeam 3 vs. MockTeam 1 at MockVenue of team3',
    'MockTeam 2 vs. MockTeam 3 at MockVenue of team2',
    'MockTeam 3 vs. MockTeam 2 at MockVenue of team3'
]
let expected_3 = []

test('spyOn getTeamVenue HaveBeenCalled', async() => {
    await league_utils.assignMatches([1, 2, 3], 1)
        // console.log(await league_utils.assignMatches([1, 2, 3], 2))
        // console.log(await league_utils.assignMatches([], 1))
    expect(spyTeamVenue).toHaveBeenCalled();
});
test('spyOn getTeamName HaveBeenCalled', () => {
    expect(spyTeamName).toHaveBeenCalled();

});
//positive tests
test('positive test assignMatches policy 1', async() => {
    expect(await league_utils.assignMatches([1, 2, 3], 1)).toEqual(expected_1)
});
test('positive test assignMatches policy 2', async() => {
    expect(await league_utils.assignMatches([1, 2, 3], 2)).toEqual(expected_2)
});
test('positive test assignMatches empty list', async() => {
    expect(await league_utils.assignMatches([], 1)).toEqual(expected_3)
});
test('negative test assignMatches repete team id', async() => {
    try {
        await league_utils.assignMatches([1, 1], 1)
    } catch (err) {
        expect(err).toEqual("invalid parameters")
    }


})

test('createNewLeague', () => {
    let league_name = "happy league"
    let league_policy = 1
    let team_assign = ["team assign"]
    let new_league = league_utils.createNewLeague(league_name, league_policy, team_assign)
    expect(new_league).toHaveProperty("id")
    expect(new_league).toHaveProperty("name")
    expect(new_league).toHaveProperty("policy")
    expect(new_league).toHaveProperty("team_assign")
});




// --- Adding a referee to a particular game ---
test('Add referee successfully', async() => {
    expect(await league_utils.addReferee(2, 8)).toEqual("Referee updated") // no referee is assigned to the game
});

test('Add referee user not referee', async() => {
    expect(await league_utils.addReferee(3, 8)).toEqual("The user is not a referee") // no referee is assigned to the game
});

// test('Add referee to match with referee', async() => {
//     expect(await league_utils.addReferee()) // user that is a referee but referee already was assigned to the game
// });

// test('Add referee no such user id in DB', async() => {
//     expect(await league_utils.addReferee())
// });

// test('Add referee that already assigned to another match', async() => {
//     expect(await league_utils.addReferee()) 
// });

// --- Setting user's permission ---

test('Positive test setPermission', async() => {
    expect(await league_utils.setPermission(5, 2)).toBe(true)
});



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

// DButils.disconnectDB()
//toBe
//toBeCloseTo
//toEqual
//toStrictEqual
//toHaveProperty
//toMatchSnapshot
//toThrowError