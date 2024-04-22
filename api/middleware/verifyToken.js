import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "You are not authorized!",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id; // Extract user ID from decoded token
    next(); // Proceed to the next middleware
  } catch (error) {
    return res.status(403).json({
      message: "Token is not valid!",
    });
  }
};

// import jwt from "jsonwebtoken";

// export const verifyToken = async (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({
//       message: "You are not authorized!",
//     });
//   }
//   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
//     if (err) {
//       return res.status(403).json({
//         message: "Token is not valid!",
//       });
//     }
//     req.userId = payload.id;
//   });
//   next();
// };
