const express = require("express");
const router = express.Router();

const Station = require("../models/station");

router.get("/api/stations", (req, res) => {
  Station.findMany().then((data) => res.status(200).json(data));
});

module.exports = router;
