const axios = require("axios");
const { test, expect } = require('@jest/globals')
const setup = require("../setupTests")
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');

axiosCookieJarSupport(axios)

test('Acceptance Test - login succeed', async () => {
    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })

        const login = await request.post(
            "http://localhost:3000/Login", {
            username: "jlo",
            password: "I<3JLO"
        }
        );
        expect(login.status).toBe(200)
    } catch (e) {
        throw (e)
    }
})

test('Acceptance Test - login faild - username doesnt exist', async () => {
    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })
        let login_status;
        let login_message;
        try {
            const login = await request.post(
                "http://localhost:3000/Login", {
                username: "j",
                password: "I<3JLO"
            }
            );
        } catch (e) {
            login_status = e.response.status
            login_message = e.response.data
        }
        expect(login_status).toBe(401)
        expect(login_message).toBe('Username or Password incorrect');
    } catch (e) {
        throw (e)
    }
})

test('Acceptance Test - login faild - password incorrect', async () => {
    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })
        let login_status;
        let login_message;
        try {
            const login = await request.post(
                "http://localhost:3000/Login", {
                username: "jlo",
                password: "123"
            }
            );
        } catch (e) {
            login_status = e.response.status
            login_message = e.response.data
        }
        expect(login_status).toBe(401)
        expect(login_message).toBe('Username or Password incorrect');
    } catch (e) {
        throw (e)
    }
})


test('Acceptance Test - login faild - username doesnt exist and password incorrect', async () => {
    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })
        let login_status;
        let login_message;
        try {
            const login = await request.post(
                "http://localhost:3000/Login", {
                username: "j",
                password: "123"
            }
            );
        } catch (e) {
            login_status = e.response.status
            login_message = e.response.data
        }
        expect(login_status).toBe(401)
        expect(login_message).toBe('Username or Password incorrect');
    } catch (e) {
        throw (e)
    }
})