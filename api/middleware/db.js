const mysql = require('mysql')// mysql db package

const pool = mysql.createPool({
  connectionLimit:10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdb'
})

module.exports.getConnect = function(){
  return pool;
}
