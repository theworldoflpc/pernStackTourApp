  
var Pool = require('pg-pool');

const pool = new Pool({
    user: "postgres",
    // password: //,
    host: "localhost",
    port: 5432,
    database: "perntour"
})

module.exports = pool;
