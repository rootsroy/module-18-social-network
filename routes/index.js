const router = require("express").Router();
const routes = require("./api/index");

router.use("/api", routes);

router.use((req, res) => {
  res.status(404).send("404 Error. Wrong URL");
});

module.exports = router;
