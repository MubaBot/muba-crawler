var request = require('request');
var parser = require('../parser');
var fs = require('fs');

if (process.env.pm_id % process.env.instances == 0) {
  test('https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=ss');
}

// function test (url) {
//   (async () => {
//     request(url, function (error, response, body) {
//       console.log('error:', error); // Print the error if one occurred
//       console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//       console.log('body:', body); // Print the HTML for the Google homepage.
//     });
//   })();
// }

function test(url) {
  (async () => {
    parser(url, make);
  })();
}