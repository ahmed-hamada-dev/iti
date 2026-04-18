const authService = require('./auth.service');
const { validationResult } = require('express-validator');
const asyncHandler = require('../../helpers/asyncHandler');
const ApiError = require('../../helpers/ApiError');

const cookieOptions = {
  httpOnly: false,
  secure: false,
  sameSite: 'lax',
  path: '/'
};

const accessCookieOptions = {
  ...cookieOptions,
  maxAge: 15 * 60 * 1000
};

const register = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest(errors.array()[0].msg);
  }

  const user = await authService.registerUser(req.body);
  
  res.cookie('accessToken', user.accessToken, accessCookieOptions);
  res.cookie('refreshToken', user.refreshToken, cookieOptions);
  
  const { accessToken, refreshToken, ...userData } = user;
  
  res.status(201).json({
    success: true,
    data: { ...userData, accessToken, refreshToken }
  });
});

const login = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest(errors.array()[0].msg);
  }

  const { email, password } = req.body;
  const user = await authService.loginUser(email, password);

  res.cookie('accessToken', user.accessToken, accessCookieOptions);
  res.cookie('refreshToken', user.refreshToken, cookieOptions);

  const { accessToken, refreshToken, ...userData } = user;

  res.json({
    success: true,
    data: { ...userData, accessToken, refreshToken }
  });
});

const refreshToken = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.badRequest(errors.array()[0].msg);
  }

  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  const tokens = await authService.refreshAccessToken(refreshToken);

  res.cookie('accessToken', tokens.accessToken, accessCookieOptions);
  res.cookie('refreshToken', tokens.refreshToken, cookieOptions);

  res.json({
    success: true,
    data: tokens
  });
});

const logout = asyncHandler(async (req, res, next) => {
  if (req.user) {
    await authService.logoutUser(req.user._id);
  }

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

const getMe = asyncHandler(async (req, res, next) => {
  const user = await authService.getUserById(req.user._id);

  res.json({
    success: true,
    data: user
  });
});

module.exports = { register, login, refreshToken, logout, getMe };