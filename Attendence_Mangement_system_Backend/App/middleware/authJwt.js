const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const employee = db.employees;
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
isAdmin = (req, res, next) => {
  employee.findByPk(req.userId).then(employee => {
    employee.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};
isHr = (req, res, next) => {
  employee.findByPk(req.userId).then(employee => {
    employee.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "hr") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Hr Role!"
      });
    });
  });
};
isHrOrAdmin = (req, res, next) => {
  employee.findByPk(req.userId).then(employee => {
    employee.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "hr") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Hr or Admin Role!"
      });
    });
  });
};
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isHr: isHr,
  isHrOrAdmin: isHrOrAdmin
};
module.exports = authJwt;