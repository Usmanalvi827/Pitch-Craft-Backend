import jwt from "jsonwebtoken";

function authUser(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message || "Invalid token" });
  }
}

export default authUser;
