const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "chave-secreta-default";

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Token não fornecido" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Token inválido" });
    req.userId = decoded.id;
    next();
  });
}

function generateToken(userId) {
  return jwt.sign({ id: userId }, SECRET_KEY, {
    expiresIn: "1h",
  });
}

module.exports = { verifyToken, generateToken };
