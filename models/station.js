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

function findByBounds(object) {
  let sql = `
    SELECT * 
    FROM stations 
    WHERE latitude 
    BETWEEN $1 AND $2
    AND
    longitude 
    BETWEEN $3 AND $4
    LIMIT 1
    ;
  `;

  return db
    .query(sql, [object.NWLat, object.SELat, object.NWLng, object.SELng])
    .then((result) => result.rows);
}

const Station = {
  findMany,
  findTen,
  findRandom,
  findByBounds,
};

module.exports = Station;
