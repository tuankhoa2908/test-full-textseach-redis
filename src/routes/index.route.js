const router = require("express").Router();

const redisRoute = require("./redis.route");

router.get("/check-server", (_, res) => res.status(200).json("Server OKAY"));
router.use("/redis", redisRoute);

module.exports = router;
