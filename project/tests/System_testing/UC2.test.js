const axios = require("axios");
const { test, expect } = require('@jest/globals')
const setup = require("../setupTests")
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
jest.setTimeout(100000)
axiosCookieJarSupport(axios)



test('Acceptance Test - create league policy 1', async() => {

    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })
        const login = await request.post(
            "http://localhost:3000/Login", {
                username: "BigBoss",
                password: "1234"
            }
        );
        const create_league = await request.post("http://localhost:3000/league/createLeague", {
            name: "HAPPY_LEAGUE",
            teams: [293, 390, 939, 1020],
            policy: 1

        })
        expect(create_league.status).toEqual(201)
    } catch (e) {
        throw (e)
    }
})

test('Acceptance Test - create league policy 2', async() => {
    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })
        const login = await request.post(
            "http://localhost:3000/Login", {
                username: "BigBoss",
                password: "1234"
            }
        );
        const create_league = await request.post("http://localhost:3000/league/createLeague", {
            name: "HAPPY_LEAGUE",
            teams: [293, 390, 939, 1020],
            policy: 2

        })
        expect(create_league.status).toEqual(201)
    } catch (e) {
        throw (e)
    }
})

test('Acceptance Test - create league duplicate teams', async() => {

    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })
        const login = await request.post(
            "http://localhost:3000/Login", {
                username: "BigBoss",
                password: "1234"
            }
        );
        const create_league = await request.post("http://localhost:3000/league/createLeague", {
            name: "HAPPY_LEAGUE",
            teams: [293, 293],
            policy: 1

        })
    } catch (e) {
        expect(e.response.status).toEqual(401)

    }
})
test('Acceptance Test - create league empty team array', async() => {
    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })
        const login = await request.post(
            "http://localhost:3000/Login", {
                username: "BigBoss",
                password: "1234"
            }
        );
        const create_league = await request.post("http://localhost:3000/league/createLeague", {
            name: "HAPPY_LEAGUE",
            teams: [],
            policy: 1

        })
        expect(create_league.status).toEqual(201)
        expect(create_league.data).toHaveProperty("name")
        expect(create_league.data).toHaveProperty("name")
        expect(create_league.data).toHaveProperty("policy")
        expect(create_league.data).toHaveProperty("team_assign")
        expect(create_league.data.team_assign).toEqual([])

    } catch (e) {
        throw (e)
    }
})
test('Acceptance Test - add Match ', async() => {
    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })
        const login = await request.post(
            "http://localhost:3000/Login", {
                username: "BigBoss",
                password: "1234"
            }
        );

        const match = await request.post("http://localhost:3000/league/addMatchToLeague", {
            hometeam: 3000,
            awayteam: 25
        })
        expect(match.status).toEqual(201)
    } catch (e) {
        throw (e)
    }
})

test('Acceptance Test - add Match with team already in league', async() => {
    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })
        const login = await request.post(
            "http://localhost:3000/Login", {
                username: "BigBoss",
                password: "1234"
            }
        );

        const league = await request.post("http://localhost:3000/league/addMatchToLeague", {
            hometeam: 1020,
            awayteam: 213,

        })
        expect(league.status).toEqual(201)

    } catch (e) {
        throw (e)
    }
})