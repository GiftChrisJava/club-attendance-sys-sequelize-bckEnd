const express = require("express");
const cors = require("cors");

// access the api routes
const apiRoutes = require("./routes/allRoutes");

const app = express();

// var corOptions = {
//   origin: "http://localhost:8081",
// };

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "POST");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// testing
app.get("/", (req, res) => {
  res.json({ msg: "Hello veya" });
});

// const db = require("./Models/index");
// const db = require("./model/index");
// const sequelize = db.sequelize;

app.use("/", apiRoutes);

// port
const PORT = process.env.PORT || 8081;

// server
app.listen(PORT, () => {
  console.log(`server is listening at http://localhost:${PORT}`);
});
