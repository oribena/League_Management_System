const league_utils = require('../../routes/utils/league_utils');
const DButils = require('../../routes/utils/DButils');

// jest.setTimeout(10000)

function hey() {
    return 1 + 2
}

test('initial_test', async() => {
    expect(hey()).toEqual(3)
});
test('createNewLeague', () => {

});
test('assignMatches', () => {
    //check about stub
});
test('addReferee', () => {

});
test('addMatch', () => {

});
test('setPermission', () => {

});


DButils.disconnectDB()
    //toBe
    //toBeCloseTo
    //toEqual
    //toStrictEqual
    //toHaveProperty
    //toMatchSnapshot
    //toThrowError