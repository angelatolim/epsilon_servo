const db = require("../db");

function findMany() {
  const sql = `
    SELECT 
    owner 
    FROM 
    stations
    GROUP BY
    owner
    ORDER BY owner ASC
    ;`;
  return db.query(sql).then((result) => result.rows);
}

const Owner = {
  findMany,
};

module.exports = Owner;
