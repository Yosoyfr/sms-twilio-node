require("dotenv").config();
const app = require("./server");
const http = require("http");

const server = http.createServer(app);

const database = require("./database");
require("./sockets").connection(server);
server.listen(app.get("port"), () =>
  console.log(`Example app listening on port`, app.get("port"))
);
