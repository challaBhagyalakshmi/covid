const http = require("http");
const app = require("./apis/middlewares/app");

const server = http.createServer(app);
server.listen(2019, () => {
  console.log("server starts running on port 2019");
});
