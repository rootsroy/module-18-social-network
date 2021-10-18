const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/social-network-api",
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get("/test", (req, res) => {
  res.send("Hello from server");
});
mongoose.set("debug", true);
app.listen(PORT, () => console.log(`Connected on localhost: ${PORT}`));
