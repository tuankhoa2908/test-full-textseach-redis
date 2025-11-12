const { SCHEMA_FIELD_TYPE } = require("redis");
const client = require("../configs/redis.config");

const createIndexJSON = async () => {
	await client.ft.create(
		"idx:products",
		{
			"$.word": {
				type: SCHEMA_FIELD_TYPE.TEXT,
				AS: "word",
				SORTABLE: true,
			},
			"$.description": {
				type: SCHEMA_FIELD_TYPE.TEXT,
				AS: "description",
				SORTABLE: false,
			},
			"$.color": {
				type: SCHEMA_FIELD_TYPE.TAG,
				AS: "color",
				SORTABLE: false,
			},
			"$.price": {
				type: SCHEMA_FIELD_TYPE.NUMERIC,
				AS: "price",
				SORTABLE: true,
			},
		},
		{
			ON: "JSON",
			PREFIX: "word:",
		}
	);
};

const createIndexHash = async () => {
	await client.ft.create(
		"idx:products",
		{
			word: { type: SCHEMA_FIELD_TYPE.TEXT, SORTABLE: true },
			description: { type: SCHEMA_FIELD_TYPE.TEXT, SORTABLE: false },
			color: { type: SCHEMA_FIELD_TYPE.TAG, SORTABLE: false },
			price: { type: SCHEMA_FIELD_TYPE.NUMERIC, SORTABLE: true },
		},
		{
			ON: "HASH",
			PREFIX: "product:",
		}
	);
};

createIndexHash();
