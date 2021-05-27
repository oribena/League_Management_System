const league_utils = require('../../routes/utils/league_utils');

// jest.setTimeout(10000)

async function hey() {
    return 1 + 2
}

test('initial_test', async() => {
    expect(hey()).toEqual(3)
});

//toBe
//toBeCloseTo
//toEqual
//toStrictEqual
//toHaveProperty
//toMatchSnapshot
//toThrowError