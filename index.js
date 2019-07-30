const express = require('express'),
        path = require('path'),
        cors = require('cors'),
        mongoose = require('./server/helpers/mongoose'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/'));

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(cors());
app.use(cookieParser())
cookieParser.signedCookie('cookie', 'my-signed-cookie=s:value-of-my-signed-cookie.sdfblwe85t72yhofiuqhwo481');
const port = process.env.PORT || 4000;
app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);

require('./server/routes/route')(app);

const http = require('http').Server(app);

http.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Started AMSS Dashboard');
    console.log('Listening on port ' + port);
  }
});

process.on('uncaughtException', function(err) {
});