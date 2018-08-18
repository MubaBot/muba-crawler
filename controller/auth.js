const rp = require("request-promise");

exports.requireAdminLogin = (req, res, next) => {
  const token = req.headers["x-access-token"];

  // console.log(token);
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
