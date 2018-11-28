var express = require("express");
var bodyParser = require('body-parser');
let {catsArr} = require('./stab-data');
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/", function (request, response) {
    response.send("<h2>Привет Express!</h2>");
});

app.get("/cats", function (request, response) {
    response.send(catsArr);
});

app.post("/cat", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    let result = null;
    for (let prop in catsArr) {
        if(catsArr[prop].id == request.body.id) {
            result = catsArr[prop];
            break;
        }
    }
    response.send(result);
});

app.listen(3001);