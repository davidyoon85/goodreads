const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

const corsOptions = {
  methods: "GET"
};

app.use(cors(corsOptions));

app.use("/", routes);

app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), () =>
  console.log(`Server running @ port ${server.address().port}`)
);
