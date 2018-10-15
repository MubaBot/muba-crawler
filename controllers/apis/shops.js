const rp = require("request-promise");

exports.updateShopInfo = async (token, shops) => {
  if (!token) return Promise.reject(token);

  return rp({
    method: "POST",
    uri: process.env.API_URL + "/api/shop",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token
    },
    body: {
      shops: shops
    },
    json: true
  })
    .then(result => true)
    // .catch(err => Promise.reject(false));
};
