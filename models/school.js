const db = require('../config/db');

// School model
exports.create = async ({ name, address, latitude, longitude }) => {
  const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  await db.execute(query, [name, address, latitude, longitude]);
};

exports.getAll = async () => {
  const [rows] = await db.execute('SELECT * FROM schools');
  return rows;
};
