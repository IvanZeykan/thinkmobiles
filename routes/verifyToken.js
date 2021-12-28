const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json("something went wrong, token is not valid")
            req.user = user;
            next();
        })
    } else {
       return res.status(401).json("auth token not provided")
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("you are not allowed to access this")
        }
    })
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if ( req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to access this");
    }
  });
};


module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
 };