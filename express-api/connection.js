const { DB_PASSWORD, DB_DATABASE, DB_HOST, DB_USERNAME } = require('./config');
const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    multipleStatement: true
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Database Connected");
    }
    else{
        console.log("Failed to connect");
    }
});

module.exports=mysqlConnection;