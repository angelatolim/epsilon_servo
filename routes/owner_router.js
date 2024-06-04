const express = require("express");
const router = express.Router();
const Owner = require('../models/owner')

router.get("/api/owners", (req, res) => {
    Owner.findMany().then((data) => res.status(200).json(data));
  });

router.get('/api/stats', (req, res) => {
  Owner.totalStationsByOwner().then((data) =>res.status(200).json(data))
})

module.exports = router