const express = require("express");
const router = express.Router();

router.get("/api/suburbs/:postcode", (req, res) => {
    const postcode = req.params.postcode;
    const url = `http://v0.postcodeapi.com.au/suburbs/${postcode}.json`;
    fetch(url) 
        .then(data => data.json())
        .then(result => res.status(200).json(result))
  });

module.exports = router