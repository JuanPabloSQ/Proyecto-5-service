import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

export { verifyToken };
