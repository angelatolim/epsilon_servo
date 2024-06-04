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

function totalStationsByOwner() {
  const sql = `
  SELECT owner, count(id) FROM stations GROUP BY owner HAVING count(id) > 1 ORDER BY count desc;`

  return db.query(sql).then((result) => result.rows);
}

const Owner = {
  findMany,
  totalStationsByOwner
};

module.exports = Owner;
