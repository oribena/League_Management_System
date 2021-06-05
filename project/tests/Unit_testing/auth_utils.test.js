const DButils = require("../routes/utils/DButils");
const auth_utils = require("./utils/auth_utils");

test('register', () => {
    // const user = {
    //     {

    //     }

    const expectedUser = await DButils.execQuery(
        `SELECT username, firstname, lastname, country, password, email, profilePic FROM dbo.users WERE `
        // ( VALUES ('${username}','${firstname}','${lastname}','${country}', '${password}','${email}','${profilePic}')`
    );
    console.log(expectedUser)
    // expect(auth_utils.register)

});

test('login', () => {

});

DButils.disconnectDB()