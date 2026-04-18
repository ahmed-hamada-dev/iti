const { verifyToken } = require('../lib/jwt');
const User = require('../features/auth/auth.model');
const ApiError = require('../helpers/ApiError');

const protect = async (req, res, next) => {
  let token;

  console.log('Cookies:', req.cookies);
  console.log('Authorization header:', req.headers.authorization);

  if (req.cookies.accessToken) {
    token = req.cookies.accessToken;
    console.log('Using cookie token');
  } else if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('Using header token');
  }

  if (!token) {
    throw ApiError.unauthorized('No token provided');
  }

  try {
    const decoded = verifyToken(token);
    console.log('Decoded token:', decoded);
    
    if (decoded.type !== 'access') {
      throw ApiError.unauthorized('Invalid token type');
    }

    const user = await User.findById(decoded.id);
    console.log('Found user:', user);
    
    if (!user) {
      throw ApiError.unauthorized('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Auth error:', error.message);
    if (error.name === 'TokenExpiredError') {
      throw ApiError.unauthorized('Token expired');
    }
    throw ApiError.unauthorized('Invalid token');
  }
};

module.exports = { protect };