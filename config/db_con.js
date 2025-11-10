var mysql = require('mysql');
const config = require("./env");




const pool_mysql = mysql.createPool({

  user: config.db_config.USER_DB,
  host: config.db_config.HOST_DB,
  database: config.db_config.DATABASE_DB,
  password: config.db_config.PASSWORD_DB,
  port: config.db_config.PORT_DB,
  connectionLimit: config.db_config.CONNECTIONLIMIT,
  multipleStatements: true

});



module.exports = pool_mysql