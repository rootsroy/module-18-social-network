const router = require("express").Router();
const posts = require("./thought-routes");
const users = require("./user-routes");

router.use("/posts", posts);
router.use("/users", users);

module.exports = router;
