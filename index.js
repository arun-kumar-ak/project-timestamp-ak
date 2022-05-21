// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:data", function (req, res) {  
  let dataNum = Number(req.params.data);
  let date = new Date(req.params.data);
  let responseData = {unix: Number, utc: Date}
  console.log(req.params.data.valueOf());
  if(dataNum !== NaN && (new Date(dataNum)).toString() !== "Invalid Date") {
    responseData.unix = dataNum;
    responseData.utc = new Date(dataNum).toUTCString();
  }else if(date.toString() !== "Invalid Date") {
    responseData.unix = date.getTime();
    responseData.utc = date.toUTCString();
  }else {
    res.json({ error : "Invalid Date" });
    return;
  }
  res.json(responseData);
});

app.get("/api", (req, res) => {
  let date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString()});
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
