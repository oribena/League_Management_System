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


// connectDB()
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
exports.createLeague = createLeague;
exports.connectDB = connectDB;
exports.disconnectDB = disconnectDB;
exports.updateLeague = updateLeague;

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