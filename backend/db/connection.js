require("dotenv").config()
const mysql = require('mysql2');

// const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`
 const urlDB = `mysql://root:gh-11Gg1A35ab6F-4ha14DCbG3-e3BDG@viaduct.proxy.rlwy.net:48630/railway`

// const db = mysql.createPool(urlDB);

// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
// });

// const db = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'Vamos.29620',
//     database:'auth'
// });

// const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`

const db = mysql.createConnection(urlDB)

// db.getConnection((err, con)=>{
//     if (err) {
//         console.log(`Could not connect to the database ${err}`)
//     }else{
//         console.log("Succesfully connected to the database")
//     }
// });

module.exports = db;