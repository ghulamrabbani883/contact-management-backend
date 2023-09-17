const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const cors = require('cors');
const cookieParser = require("cookie-parser");
const contactRoute = require("./routes/contactRoute");
const app = express();
const port = process.env.PORT;
require('./config/db')

app.use(cors())
app.use(express.json());
app.use(cookieParser({ credentials: true }));

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.use("/api", contactRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
