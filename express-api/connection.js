const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: "ses_gold",
    multipleStatement: true
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Connected");
    }
    else{
        console.log("Failed to connect");
    }
});

module.exports=mysqlConnection;