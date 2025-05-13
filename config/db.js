const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'nozomi.proxy.rlwy.net',
  user: 'root',
  password: process.env.DB_PASSWORD, // We'll set this in Railway's environment variables
  database: 'railway',
  port: 32331,
  ssl: {
    rejectUnauthorized: true
  }
});

module.exports = pool;
