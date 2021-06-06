// const DButils = require('../../routes/utils/DButils');
const auth_utils = require('../../routes/utils/auth_utils');
const bcrypt = require("bcryptjs");

// jest.setTimeout(10000000000000000);
// DButils.connectDB();

test('positive test register', async () => {
    const pass = 'noa12345'
    const hashedPass = bcrypt.hashSync(pass, parseInt(process.env.bcrypt_saltRounds));
    const user = [{
        username: 'noak',
        firstname: 'noa',
        lastname: 'kila',
        country: 'Israel',
        password: `${hashedPass}`,
        email: 'nk@post.bgu.ac.il',
        profilePic: 'https://cloudinary.com/NK'
    }]
    register(
        user.username,
        user.firstname,
        user.lastname,
        user.country,
        user.password,
        user.email,
        user.profilePic
    )
    const expectedUser = await DButils.execQuery(
        `SELECT username, password, firstname, lastname, country, email, profilePic FROM dbo.users WHERE username = '${user.username}'`
    );
    expect(expectedUser).toEqual(user);

});

test('negative test register username exists', async () => {
    const user = [{
        username: 'jlo',
        firstname: 'noa',
        lastname: 'kila',
        country: 'Israel',
        password: 'noa12345',
        email: 'nk@post.bgu.ac.il',
        profilePic: 'https://cloudinary.com/NK'
    }]
    expect(await auth_utils.register(
        user.username,
        user.firstname,
        user.lastname,
        user.country,
        user.password,
        user.email,
        user.profilePic
    )).toThrowError(ErrorMessageToken);
});


test('positive test login', async () => {
    const username = "jlo";
    const loginResult = await auth_utils.login(username);
    console.log(loginResult);
    expect(loginResult.username).toEqual(username);
    expect(loginResult.password).toBeTruthy();
});

test('negative test login username doesnt exist', async () => {
    const username = "noaa";
    const loginResult = await auth_utils.login(username);
    expect(loginResult).toBeFalsy();
});

DButils.disconnectDB();










// test('positive test register', async () => {
//     const pass = 'noa12345'
//     const hashedPass = bcrypt.hashSync(pass, parseInt(process.env.bcrypt_saltRounds));
//     const user = [{
//         username: 'noak',
//         firstname: 'noa',
//         lastname: 'kila',
//         country: 'Israel',
//         password: `${hashedPass}`,
//         email: 'nk@post.bgu.ac.il',
//         profilePic: 'https://cloudinary.com/NK'
//     }]
//     register(
//         user.username,
//         user.firstname,
//         user.lastname,
//         user.country,
//         user.password,
//         user.email,
//         user.profilePic
//     )
//     const expectedUser = await DButils.execQuery(
//         `SELECT username, password, firstname, lastname, country, email, profilePic FROM dbo.users WHERE username = '${user.username}'`
//     );
//     expect(expectedUser).toEqual(user);

// });

// test('negative test register username exists', async () => {
//     const pass = 'noa12345'
//     const hashedPass = bcrypt.hashSync(pass, parseInt(process.env.bcrypt_saltRounds));
//     const user = [{
//         username: 'jlo',
//         firstname: 'noa',
//         lastname: 'kila',
//         country: 'Israel',
//         password: `${hashedPass}`,
//         email: 'nk@post.bgu.ac.il',
//         profilePic: 'https://cloudinary.com/NK'
//     }]
//     await auth_utils.register(
//         user.username,
//         user.firstname,
//         user.lastname,
//         user.country,
//         user.password,
//         user.email,
//         user.profilePic
//     );
//     expect(await auth_utils.register(
//         user.username,
//         user.firstname,
//         user.lastname,
//         user.country,
//         user.password,
//         user.email,
//         user.profilePic
//     )).toThrow();

// });