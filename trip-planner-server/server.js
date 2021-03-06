const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authentication = require("./middlewares/authentication");

require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("mongo database connected");
});

//routers
const tripsRouter = require("./routes/trips");

app.use("/trips", authentication, tripsRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
