const User = require('./auth.model');
const ApiError = require('../../helpers/ApiError');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../../lib/jwt');

const registerUser = async (userData) => {
  const { email } = userData;
  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.conflict('User already exists with this email');
  }

  const user = await User.create(userData);
  
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    accessToken,
    refreshToken
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.matchPassword(password))) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    accessToken,
    refreshToken
  };
};

const refreshAccessToken = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);
  
  const user = await User.findById(decoded.id).select('+refreshToken');
  
  if (!user || user.refreshToken !== refreshToken) {
    throw ApiError.unauthorized('Invalid refresh token');
  }

  const newAccessToken = generateAccessToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  user.refreshToken = newRefreshToken;
  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
};

const logoutUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return;
  
  user.refreshToken = null;
  await user.save();
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.notFound('User not found');
  }
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getUserById
};