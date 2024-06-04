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

function findRandom() {
  let sql = `
        SELECT * 
        FROM stations 
        ORDER BY RANDOM()
        LIMIT 1
        ;
  `;

  return db.query(sql).then((result) => result.rows[0]);
}

const Station = {
  findMany,
  findTen,
  findRandom,
};

module.exports = Station;
