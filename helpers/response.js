const sendResponse = (
    res,
    status = 200,
    success = true,
    message = "",
    data = {}
) => {
    const response = {
        status,
        success,
        message,
        data,
    };

    return res.status(status).json(response);
};

const successResponse = (res, message = "", data = {}) => {
    const response = {
        status: 200,
        success: true,
        message,
        data,
    };

    return res.status(200).json(response);
};

const badResponse = (res, message = "", data = {}) => {
    const response = {
        status: 400,
        success: false,
        message,
        data,
    };

    return res.status(400).json(response);
};

const errorResponse = (res, message = "Internal server error!", data = {}) => {
    const response = {
        status: 500,
        success: false,
        message,
        data,
    };

    return res.status(500).json(response);
};

module.exports = {
    sendResponse,
    successResponse,
    badResponse,
    errorResponse,
};
