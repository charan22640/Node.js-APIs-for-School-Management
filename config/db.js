const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'nozomi.proxy.rlwy.net',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'railway',
  port: 32331,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
