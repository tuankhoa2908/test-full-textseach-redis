const client = require("../configs/redis.config");

const createIndex = async () => {
	await client.ft.create("idx:products", {
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
	});
};

createIndex();
