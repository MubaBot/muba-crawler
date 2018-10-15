const rp = require("request-promise");

exports.requireAdminLogin = (req, res, next) => {
  const token = getToken(req);

  if (!token) return res.status(401).send("Unauthorized");

  return rp({
    method: "GET",
    uri: process.env.API_URL + "/auth/admin/me",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token
    }
  })
    .then(result => {
      req.info = JSON.parse(result);
      return next();
    })
    .catch(err => res.status(401).send("Unauthorized"));
};

const getToken = (exports.getToken = req => req.headers["x-access-token"]);
