const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const client = require("../configs/redis.config");
const { cleanWordSearching } = require("../utils/cleanData");

router.post("/add-word", async (req, res, next) => {
	const { word, description, color, price } = req.body;
	const id = uuidv4();
	await client.hSet(`product:${id}`, { word, description, color, price });
	return res.status(200).json({
		msg: "ok",
		code: 200,
		data: req.body,
	});
});

router.get("/auto-complete-searching", async (req, res, next) => {
	try {
		const { word } = req.query;
		const cleaned = cleanWordSearching({ text: word });
		const queryString = `(@word:(${cleaned})=>{$weight: 5.0}) | (@description:(${cleaned}))`;
		const listSuggest = await client.ft.search("idx:products", queryString, {
			LIMIT: {
				from: 0,
				size: 10,
			},
		});
		return res.status(200).json({
			msg: "ok",
			code: 200,
			data: {
				query: queryString,
				results: listSuggest.documents,
			},
		});
	} catch (error) {
		next(error);
	}
});

module.exports = router;
