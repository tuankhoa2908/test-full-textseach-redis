const express = require("express");
const morgan = require("morgan");

const { SERVER } = require("../configs/index.config");
const indexRouter = require("../routes/index.route");

// Start Redis
require("../configs/redis.config");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Ví dụ routes
app.get("/", (req, res) => {
	res.json({
		status: "ok",
		message: "Express server đang chạy.",
	});
});

app.get("/health", (req, res) => {
	res.json({
		status: "healthy",
		redis: "connecting/connected (xem logs từ redis.config.js)",
	});
});

app.use("/api", indexRouter);

const PORT = SERVER.PORT;
const server = app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});

const shutdown = (signal) => {
	console.log(`\nĐang tắt server... (được kích hoạt bởi ${signal})`);
	server.close(() => {
		console.log("HTTP server closed.");
		process.exit(0);
	});

	setTimeout(() => {
		console.warn("Forcing shutdown.");
		process.exit(1);
	}, 10000).unref();
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("uncaughtException", (err) => {
	console.error("Uncaught exception:", err);
	shutdown("uncaughtException");
});
process.on("unhandledRejection", (reason) => {
	console.error("Unhandled rejection:", reason);
	shutdown("unhandledRejection");
});
