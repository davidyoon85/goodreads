const express = require("express");
const router = express.Router();
const searchMiddleware = require("../middleware");
const searchController = require("../controllers");

router.get("/", (req, res) => {
  res.send("Sending dummy res to postmen");
});

router.get(
  "/search/:term/:page",
  searchMiddleware,
  searchController.searchBook
);

module.exports = router;
