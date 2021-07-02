// https://www.youtube.com/watch?v=xn9ef5pod18
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const mysqlConnection = require("./connection");
const PeopleRoutes = require("./routes/people");

var app = express();
app.use(bodyParser.json());
app.use("/people",PeopleRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
});