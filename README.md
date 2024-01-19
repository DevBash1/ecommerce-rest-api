# E-commerce REST API Project

## Overview

This project is an E-commerce REST API designed to handle various functionalities related to managing items, user authentication, and administrative tasks. The API provides endpoints for user actions, cart management, item operations, and more.

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Documentation](#documentation)
-   [Dependencies](#dependencies)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   User authentication (Signup, Login)
-   User actions (Check email, Sign up, Login)
-   Cart management (Add to cart, Remove from cart, View cart items)
-   Item operations (Get all items, Search items)
-   Admin functionalities (Add, Update, Remove items)

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd ecommerce-rest-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    - Create a `.env` file based on the provided `.env.example`.
    - Configure your database connection details, JWT secret, and other necessary variables.

4. Start the server:

    ```bash
    npm start
    ```

## Usage

The API endpoints can be accessed using tools like [Swagger UI](https://swagger.io/tools/swagger-ui/).

Ensure that you have obtained a bearer token by signing up or logging in before making authenticated requests.

## Documentation

API documentation is available using Swagger UI. Access the documentation at [http://localhost:2020/docs](http://localhost:3000/docs) when the server is running.

## Dependencies

-   Node.js
-   Express
-   MongoDB
-   Swagger
-   ...

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
