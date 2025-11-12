const router = require("express").Router();
const client = require("../configs/redis.config");

router.post("/add-word", async (req, res, next) => {
	const { word, description, color, price } = req.body;
	return res.status(200).json({
		msg: "ok",
		code: 200,
		data: req.body,
	});
});

module.exports = router;
