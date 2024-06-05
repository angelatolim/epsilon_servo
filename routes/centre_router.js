const express = require("express");
const router = express.Router();

router.get("/api/centre", (req, res) => {
  const lat = `${req.query.lat}`;
  const lng = `${req.query.lng}`;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBMbpIxFW9be_UdWXXWgwTGAKe5Xbs9mkg`;
  fetch(url)
    .then((data) => data.json())
    .then((result) => res.status(200).json(result));
});

module.exports = router;
