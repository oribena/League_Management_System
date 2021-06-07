require("dotenv").config({ path: __dirname + "/../../.env" });
const sql = require("mssql");

var pool;
var poolConnect;

const config = {
    user: process.env.tedious_userName,
    password: process.env.tedious_password,
    server: process.env.tedious_server,
    database: process.env.tedious_database,
    options: {
        encrypt: true,
        enableArithAbort: true,
    },
};

async function connectDB() {
    pool = new sql.ConnectionPool(config);
    poolConnect = pool.connect();
}

async function disconnectDB() {
    pool.close();
}


connectDB()
exports.execQuery = async function(query) {
    await poolConnect;
    try {
        var result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.error("SQL error", err);
        throw err;
    }

};

function createLeague(league_name) {
    console.log("The " + league_name + " league was created succefully!");
}

function updateLeague(teams_name) {
    console.log(
        "The match between " +
        teams_name[0] +
        " and " +
        teams_name[1] +
        " was added succefully!"
    );
}

async function setUserPermission(user_id, permission) {
    await exports.execQuery(
        `UPDATE dbo.users SET permission = '${permission}' WHERE user_id = '${user_id}'`
    );
    return;
}

async function getUserPermission(referee_id) {
    const permission = await exports.execQuery(
        `SELECT permission FROM users WHERE user_id = '${referee_id}'`
    );
    return permission;
}

async function addRefereeToMatch(referee_id, match_id) {
    await exports.execQuery(
        `UPDATE dbo.matches SET referee = '${referee_id}' WHERE match_id = '${match_id}'`
    );
    return;
}

async function setMatchResult(match_id, result) {
    await exports.execQuery(
        `UPDATE dbo.matches SET result = '${result}' WHERE match_id = '${match_id}'`
    );
    // return true;
    return;
}

exports.createLeague = createLeague;
exports.connectDB = connectDB;
exports.disconnectDB = disconnectDB;
exports.updateLeague = updateLeague;
exports.getUserPermission = getUserPermission;
exports.addRefereeToMatch = addRefereeToMatch;
exports.setUserPermission = setUserPermission;
exports.setMatchResult = setMatchResult;


// process.on("SIGINT", function () {
//   if (pool) {
//     pool.close(() => console.log("connection pool closed"));
//   }
// });

// poolConnect.then(() => {
//   console.log("pool closed");

//   return sql.close();
// });

// exports.execQuery = function (query) {
//   return new Promise((resolve, reject) => {
//     sql
//       .connect(config)
//       .then((pool) => {
//         return pool.request().query(query);
//       })
//       .then((result) => {
//         // console.log(result);
//         sql.close();
//         resolve(result.recordsets[0]);
//       })
//       .catch((err) => {
//         // ... error checks
//       });
//   });
// };