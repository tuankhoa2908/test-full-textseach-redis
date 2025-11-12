const { createClient, SCHEMA_FIELD_TYPE } = require("redis");
const { redis } = require("./index.config");

const client = createClient({
	username: redis.username,
	password: redis.password,
	socket: {
		host: redis.host,
		port: redis.port,
	},
});

client.on("error", (err) => console.log("Redis Client Error:", err));

const connectRedis = async () => {
	try {
		await client.connect();
		console.log("Connected to redis successful !!!");
	} catch (err) {
		console.error("Không thể kết nối đến Redis:", err);
	}
};

connectRedis();

module.exports = client;
