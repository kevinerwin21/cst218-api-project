const jwt = require("jsonwebtoken");

/*
  This middleware checks for a token, and if valid,
  attaches user identity to the request object.

  Expected header:
  Authorization: Bearer <token>
*/ 

function requireAuth(req, res, next){
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header"});
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ error: " Malformed Authorization Header" });
  }

  const [type, token] = parts;

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "Invalid token type" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach identity to the request for later routes
    req.user = {
      userId: payload.userId,
      email: payload.email,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token"});
  }
}

module.exports = { requireAuth };