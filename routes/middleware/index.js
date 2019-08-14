const request = require("request");
const parseString = require("xml2js").parseString;
const get = require("lodash.get");

module.exports = (req, res, next) => {
  // SEARCH TERM
  console.log("Dog");
  const { term, page = 1 } = req.params;
  // GET RES FROM GOOD READS API
  request(
    `https://www.goodreads.com/search.xml?key=Yp44Rw2ZdofVJsshzCcpCQ&q=${term}&page=${page}`,
    (err, res, body) => {
      if (!err && res.statusCode === 200) {
        parseString(body, (error, result) => {
          const search = get(result, "GoodreadsResponse.search[0]", "");
          req.jsonData = get(search, "results[0].work", "");
          req.total = get(search, "total-results[0]", 0);
        });
        next();
      }
    }
  );
};
