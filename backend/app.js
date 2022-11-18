const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const cookieParser = require("cookie-parser");
require("./db/conn");
app.use(cookieParser());
app.use(express.json());

//time starts
function time() {
  let a = new Date();
  return a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();
}
//time ends

app.use(require("./routers/auth"));

app.listen(port, Hostname, () => {
  console.log(
    `\n\nWE ARE ONLINE ~ \n\nURL\t: http://${Hostname}:${port}\nTIME\t: ${time()}\n`
  );
});
