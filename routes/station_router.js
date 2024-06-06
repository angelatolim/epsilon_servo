const express = require("express");
const router = express.Router();

const Station = require("../models/station");

router.get("/api/stations/all", (req, res) => {
  Station.findMany().then((data) => res.status(200).json(data));
});

router.get("/api/stations/random", (req, res) => {
  Station.findRandom().then((data) => res.status(200).json(data));
});

router.get("/api/stations/bounds", (req, res) => {
  let boundsObject = req.query;
  Station.findByBounds(boundsObject).then((data) => res.status(200).json(data));
});

router.get("/api/stations/nearest", (req, res) => {
  let { latitude, longitude, radius } = req.query;
  Station.findNearest(latitude, longitude, radius).then((data) =>
    res.status(200).json(data)
  );
});

router.put('/api/stations/:id/save', (req, res) => {
  let id = req.params.id

  Station.saveStation(id).then(data => res.status(200).json(data))
})

router.put('/api/stations/:id/unsave', (req, res) => {
  let id = req.params.id

  Station.unsaveStation(id).then(data => res.status(200).json(data))
})

router.get("/api/stations/saved", (req, res) => {
  Station.getFavourites().then(data => res.status(200).json(data))
})


module.exports = router;
