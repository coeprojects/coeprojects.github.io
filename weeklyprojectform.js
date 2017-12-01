var http = require("https");

var options = {
  "method": "GET",
  "hostname": "mrwxlzvtrftdwxy.form.io",
  "port": null,
  "path": "/wps/submission",
  "headers": {
    "limit": "100000",
    "cache-control": "no-cache",
    "postman-token": "43988599-829c-7d28-0b41-00c712fa791d"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();