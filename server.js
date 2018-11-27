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

app.get("/items", function (request, response) {
    response.send(catsArr);
});

app.post("/item", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log('request.body ', request.body);
    console.log('catsArr[0].id ', catsArr[0].id);
    let result = null;
    for (let prop in catsArr) {
        console.log('prop', prop);
        console.log('catsArr[prop].id ',catsArr[prop].id);

        if(catsArr[prop].id == request.body.id) {
            result = catsArr[prop];
            break;
        }
    }
    console.log('result ', result);
    response.send(result);
});

app.listen(3001);