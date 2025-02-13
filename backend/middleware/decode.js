const jwt = require('jsonwebtoken');
module.exports.decodeToken = async (req, res, next) => {
    const publicRoutes = ["/user/login", "/user/signup"];
  
    if (publicRoutes.includes(req.url)) {
      return next();
    }
  
    let token = req.headers["authorization"];
    console.log("Token: ", token);
  
    if (token && token.startsWith("Bearer ")) {
      try {
        const tokendata = token.split(" ")[1];
        let decodeToken = await jwt.verify(tokendata, "privet-key");
        req.user = decodeToken;
        next();
      } catch (error) {
        return res.status(403).send({ catch: error.message });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized" });
    }
  };
  