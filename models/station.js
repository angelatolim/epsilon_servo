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
    LIMIT 100
    ;
  `;

  return db
    .query(sql, [object.NWLat, object.SELat, object.NWLng, object.SELng])
    .then((result) => result.rows);
}

function findNearest(latitude, longitude, radius) {
  let sql = `
    SELECT
    *,
    earth_distance(
        ll_to_earth(latitude, longitude),
        ll_to_earth($1, $2)
    ) AS distance
    FROM stations
    WHERE
    earth_distance(
        ll_to_earth(latitude, longitude),
        ll_to_earth($1, $2)
    ) <= $3 * 1000
    ORDER BY distance
    LIMIT 10;
  `;
  let sqlParams = [Number(latitude), Number(longitude), Number(radius)];
  return db.query(sql, sqlParams).then((result) => result.rows);
}

function getFavourites() {
  let sql = `
  SELECT COUNT(is_saved) FROM stations where is_saved = TRUE`

  return db.query(sql).then((result) => result.rows[0])
}

function saveStation(id) {
  
  let sql = `
  UPDATE stations
  SET is_saved = TRUE
  WHERE id = $1
  RETURNING *
  `
  return db.query(sql, [id]).then(result => result.rows[0])
}

function unsaveStation(id) {
  
  let sql = `
  UPDATE stations
  SET is_saved = FALSE
  WHERE id = $1
  RETURNING *
  `
  return db.query(sql, [id]).then(result => result.rows[0])
}


const Station = {
  findMany,
  findRandom,
  findByBounds,
  findNearest,
  saveStation,
  getFavourites,
  unsaveStation
};

module.exports = Station;
