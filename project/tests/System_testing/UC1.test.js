const axios = require("axios");
const { test, expect } = require('@jest/globals')
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
axiosCookieJarSupport(axios)
// jest.setTimeout(1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000)


// addReferee

test('positive test addReferee', async () => {
    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })

        await request.post(
            "http://localhost:3000/Login",
            {
                username: "BigBoss",
                password: "1234"
            }
        );

        const addReferee = await request.put(
            "http://localhost:3000/league/addReferee",
            {
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

test('positive test setPermission', async () => {
    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })

        await request.post(
            "http://localhost:3000/Login",
            {
                username: "BigBoss",
                password: "1234"
            }
        );

        const setPermission = await request.post(
            "http://localhost:3000/league/setPermission",
            {
                user_id: 1,
                permission: 2
            }
        );
        expect(setPermission.status).toBe(201)
    } catch (e) {
        throw (e)
    }
})


test('negative test setPermission user_id doesnt exist', async () => {
    try {
        const cookieJar = new tough.CookieJar();
        const request = axios.create({
            jar: cookieJar,
            withCredentials: true
        })

        let setPermission_status;
        let setPermission_message;
        try {

            const login = await request.post(
                "http://localhost:3000/Login",
                {
                    username: "BigBoss",
                    password: "1234"
                }
            );

            const setPermission = await request.post(
                "http://localhost:3000/league/setPermission",
                {
                    user_id: 1000,
                    permission: 2
                }
            );
        }
        catch (e) {
            setPermission_status = e.response.status
            setPermission_message = e.response.data
        }
        expect(setPermission_status).toBe(401)
        expect(setPermission_message).toBe('Username or Password incorrect');
    } catch (e) {
        throw (e)
    }
})