const { request, response } = require('express');

const sendResponse = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};

const successResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    ...data
  });
};

const errorResponse = (res, message, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = { sendResponse, successResponse, errorResponse };