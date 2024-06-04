const db = require("../db");

function findMany() {
  let sql = `
        SELECT *
        FROM stations
        ORDER BY id
        LIMIT 400
        ;
    `;

  return db.query(sql).then((result) => result.rows);
}

function findTen() {
  let sql = `
        SELECT *
        FROM stations
        ORDER BY id
        LIMIT 10
        ;
    `;

  return db.query(sql).then((result) => result.rows);
}

const Station = {
  findMany,
  findTen
};

module.exports = Station;
