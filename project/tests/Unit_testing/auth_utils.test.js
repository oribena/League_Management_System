const DButils = require('../../routes/utils/DButils');
const auth_utils = require('../../routes/utils/auth_utils');

test('register', async () => {
    // const user = {
    //     {

    //     }
    const userID = 1;

    const expectedUser = await DButils.execQuery(
        `SELECT username, firstname, lastname, country, password, email, profilePic FROM dbo.users WERE user_id = userID`
        // ( VALUES ('${username}','${firstname}','${lastname}','${country}', '${password}','${email}','${profilePic}')`
    );
    console.log(expectedUser)
    // expect(auth_utils.register)

});

test('login', () => {

});

DButils.disconnectDB()