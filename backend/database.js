const { createPool } = require("mysql");

const pool = createPool({
    host:"localhost",
    user:"eemreucmaz",
    password:"123456",
    database:"node_db",
})

module.exports = pool;