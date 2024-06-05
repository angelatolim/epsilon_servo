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

function findByBounds(topLeft, bottomRight) {

  let sql = `
    SELECT * 
    FROM stations 
    WHERE latitude 
    BETWEEN $1 AND $2
    AND
    longitude 
    BETWEEN $3 AND $4
    ;
  `
  console.log(topLeft.lat)
  console.log(topLeft.long)

  return db.query(sql, [bottomRight.lat, topLeft.lat, topLeft.long, bottomRight.long]).then(result => result.rows)

}

const Station = {
  findMany,
  findTen,
  findRandom,
  findByBounds
};

module.exports = Station;


