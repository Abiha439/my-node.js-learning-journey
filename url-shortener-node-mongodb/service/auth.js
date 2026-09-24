// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "Abiha$@200";

function setUser(user) {
    // sessionIdToUserMap.set(id, user);
    return jwt.sign(user, secret);
}

function getUser(token) {
    if (!token) return null;
    return jwt.verify(token, secret);
    // sessionIdToUserMap.get(id);
}


module.exports = {
  setUser,
  getUser,
};