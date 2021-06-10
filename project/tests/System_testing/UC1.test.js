const axios = require("axios");
const { test, expect } = require('@jest/globals')
const setup = require("../setupTests")
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
axiosCookieJarSupport(axios)

// addReferee
test('Acceptance Test - add Referee', async() => {
    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })

        await request.post(
            "http://localhost:3000/Login", {
                username: "BigBoss",
                password: "1234"
            }
        );

        const addReferee = await request.put(
            "http://localhost:3000/league/addReferee", {
                match_id: 12,
                referee_id: 1
            }
        );
        expect(addReferee.status).toBe(201)
    } catch (e) {
        throw (e)
    }
})


//setPermission

test('Acceptance Test - set Permission', async() => {
    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })

        await request.post(
            "http://localhost:3000/Login", {
                username: "BigBoss",
                password: "1234"
            }
        );

        const setPermission = await request.post(
            "http://localhost:3000/league/setPermission", {
                user_id: 1,
                permission: 2
            }
        );
        expect(setPermission.status).toBe(201)
    } catch (e) {
        throw (e)
    }
})