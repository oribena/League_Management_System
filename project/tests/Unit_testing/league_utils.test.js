const league_utils = require('../../routes/utils/league_utils');
const DButils = require('../../routes/utils/DButils');

// jest.setTimeout(10000)
// DButils.connectDB()

// function hey() {
//     return 1 + 2
// }

// test('initial_test', async() => {
//     expect(hey()).toEqual(3)
// });
test('createNewLeague', () => {

});
test('assignMatches', () => {
    //check about stub
});

test('addMatch', () => {

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
test('setPermission', () => {

});


// DButils.disconnectDB()
    //toBe
    //toBeCloseTo
    //toEqual
    //toStrictEqual
    //toHaveProperty
    //toMatchSnapshot
    //toThrowError