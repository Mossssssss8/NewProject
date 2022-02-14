const express = require("express");
const app = express();
const fs = require("fs");
const mongodb = require('mongoddb');
const url = 'mongodb://user:password@db:27017';

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");

});