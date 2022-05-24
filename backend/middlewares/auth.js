const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const BadAuth = require('../errors/BadAuth');

const handleAuthError = (next) => {
  next(new BadAuth('Необходима авторизация'));
};
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return handleAuthError(next); // res.status(401).send({ message: 'Необходима авторизация' })
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return handleAuthError(next); // res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};
