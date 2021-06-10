const auth_utils = require('../../routes/utils/auth_utils');
const { test, expect } = require('@jest/globals')
const setup = require("../setupTests")

test('positive test userExists', async() => {
    expect(await auth_utils.userExists("jlo")).toBeTruthy();
});

test('negative test userExists username does not exist', async() => {
    expect(await auth_utils.userExists("j")).toBeFalsy();
});

test('negative test userExists usermane empty', async() => {
    expect(await auth_utils.userExists("")).toBeFalsy();
});

test('positive test login', async() => {
    const username = "jlo";
    const password = "I<3JLO";
    expect(await auth_utils.login(username, password)).toBeTruthy();
});

test('negative test login username does not exist', async() => {
    const username = "j";
    const password = "I<3JLO";
    expect(await auth_utils.login(username, password)).toBeNull();
});

test('negative test login password incorrect', async() => {
    const username = "jlo";
    const password = "123";
    expect(await auth_utils.login(username, password)).toBeNull();
});

test('negative test login username does not exist and password incorrect', async() => {
    const username = "jl";
    const password = "123";
    expect(await auth_utils.login(username, password)).toBeNull();
});