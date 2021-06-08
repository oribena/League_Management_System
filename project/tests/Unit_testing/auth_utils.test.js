const DButils = require('../../routes/utils/DButils');
const auth_utils = require('../../routes/utils/auth_utils');
const bcrypt = require("bcryptjs");

// jest.setTimeout(10000000000000000);
// DButils.connectDB();

// userExists

test('positive test userExists', async () => {
    expect(await auth_utils.userExists("jlo")).toBeTruthy();
});

test('negative test userExists', async () => {
    expect(await auth_utils.userExists("j")).toBeFalsy();
});

test('negative test userExists', async () => {
    expect(await auth_utils.userExists("")).toBeFalsy();
});

test('positive test register', async () => {
    // const user = [{
    //     username: 'noak',
    //     firstname: 'noa',
    //     lastname: 'kila',
    //     country: 'Israel',
    //     password: 'noa12345',
    //     email: 'nk@post.bgu.ac.il',
    //     profilePic: 'https://cloudinary.com/NK'
    // }]
    expect(await auth_utils.register(
        'noakilaa',
        'noa',
        'kila',
        'Israel',
        'noa12345',
        'nk@post.bgu.ac.il',
        'https://cloudinary.com/NK'
    )).toBeTruthy();
});

test('negative test register username exists', async () => {
    // const user = [{
    //     username: 'jlo',
    //     firstname: 'noa',
    //     lastname: 'kila',
    //     country: 'Israel',
    //     password: 'noa12345',
    //     email: 'nk@post.bgu.ac.il',
    //     profilePic: 'https://cloudinary.com/NK'
    // }]
    expect(await auth_utils.register(
        'jlo',
        'noa',
        'kila',
        'Israel',
        'noa12345',
        'nk@post.bgu.ac.il',
        'https://cloudinary.com/NK'
    )).toBeFalsy();
});

test('positive test login', async () => {
    const username = "jlo";
    const password = "I<3JLO";
    expect(await auth_utils.login(username, password)).toBeTruthy();
});

test('negative test login username doesnt exist', async () => {
    const username = "j";
    const password = "I<3JLO";
    expect(await auth_utils.login(username, password)).toBeNull();
});

test('negative test login password incorrect', async () => {
    const username = "jlo";
    const password = "123";
    expect(await auth_utils.login(username, password)).toBeNull();
});

// DButils.disconnectDB();










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