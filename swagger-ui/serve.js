var fs = require('fs');
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(express.static('.'));

app.use(express.static('swagger-ui'));
app.use(express.static('output'));

app.listen(process.env.PORT || 3000, function() {
    console.log('CORS-enabled web server listening on port 3000');
});