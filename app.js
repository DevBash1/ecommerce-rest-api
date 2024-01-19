const express = require("express");

const cors = require("cors");
const morgan = require("morgan");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const app = express();

const loadenv = require("./configs/envs");
loadenv();

const connectToDatabase = require("./services/db");
const v1 = require("./routers/index.router");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

// Swagger Documentation
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Add Helmet
app.use(helmet());

// Add morgan middleware
app.use(morgan("dev"));

// Add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add cors middleware
app.use(cors());

/**
 * @swagger
 * /v1/api:
 *   get:
 *     summary: API Entry Point
 *     description: Entry point to api endpoint
 *     responses:
 *       200:
 *         description: Successful response
 */

app.use("/v1/api", v1);

const PORT = process.env.PORT || 2020;

// Start the server
app.listen(PORT, async () => {
    await connectToDatabase();
    console.log("Server started on port 2020");
});
