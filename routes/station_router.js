const express = require("express");
const router = express.Router();

const Station = require("../models/station");

router.get("/api/stations/all", (req, res) => {
  Station.findMany().then((data) => res.status(200).json(data));
});

router.get("/api/stations", (req, res) => {
  Station.findTen().then((data) => res.status(200).json(data));
});

router.get('/api/stations/random', (req, res) => {
  Station.findRandom().then((data) => res.status(200).json(data))
})

router.get('/api/stations/bounds', (req, res) => {

  let topLeft = {
            lat: -31.810536,
            long: 115.664177
  }

  let bottomRight = {
            lat: -32.171187,
            long: 116.114275
  }

  Station.findByBounds(topLeft, bottomRight).then((data) => res.status(200).json(data))
})

module.exports = router;
