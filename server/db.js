const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "hussain",
  host: "localhost",
  port: 5432,
  database: "linkapi"
});

module.exports = pool;