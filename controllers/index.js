exports.searchBook = (req, res) => {
  res.json({ data: req.jsonData, total: req.total });
};
