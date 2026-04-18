const { verifyToken } = require('../lib/jwt');
const User = require('../features/auth/auth.model');
const ApiError = require('../helpers/ApiError');

const optionalProtect = async (req, res, next) => {
  let token;

  if (req.cookies.accessToken) {
    token = req.cookies.accessToken;
  } else if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next();
  }

  try {
    const decoded = verifyToken(token);
    
    if (decoded.type !== 'access') {
      return next();
    }

    const user = await User.findById(decoded.id);
    
    if (user) {
      req.user = user;
    }
  } catch (error) {
    // Ignore token errors for optional auth
  }

  next();
};

module.exports = { optionalProtect };