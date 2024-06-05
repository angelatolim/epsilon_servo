const fs = require("fs");
const db = require("./index.js");

function readFile(filePath) {
  try {
    const data = fs.readFileSync(filePath);
    return data.toString();
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

const stations = readFile("./db/stations.txt");
const stationsArray = stations.split("\n").slice(1);
const stationsArrayMapped = stationsArray.map((station) => {
  return station.split(",");
});

const sql = `INSERT INTO stations 
    (
      FID,
      NAME,
      OWNER,
      ADDRESS,
      SUBURB,
      STATE,
      LATITUDE,
      LONGITUDE 
    )
    VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *;`;

for (let station of stationsArrayMapped) {
  seedDatabase(station);
}

async function seedDatabase(station) {
  return await db.query(sql, [
    station[0],
    station[1],
    station[2],
    station[3],
    station[4],
    station[5],
    station[6],
    station[7],
  ]);
}
