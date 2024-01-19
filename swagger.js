const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Ecommerce API Documentation",
            version: "1.0.0",
            description: "Documentation for Ecommerce API  application",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        basePath: "/",
        securityDefinitions: {
            bearerAuth: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
                description: "Add Bearer Token",
            },
        },
    },
    apis: [
        path.join(__dirname, "./app.js"),
        path.join(__dirname, "./routers/*.js"),
    ], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
