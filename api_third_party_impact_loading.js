const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const config = require("./config/env.js");
const pool_mysql = require("./config/db_con.js");
const { v4: uuidv4 } = require('uuid');
const util_fun_log = require("./utils/util_fun_log.js");
const util_fun = require("./utils/util_fun.js");
var cors = require('cors')
const format = require('response-format');


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Middleware สำหรับสร้าง REQUEST_ID
app.use((req, res, next) => {
  req.REQUEST_ID = uuidv4();
  util_fun_log.show_log_req(req)
  next()
});




app.listen(config.main_config.PORT, () => {

  console.log(util_fun.getWirelessIP())
  console.log("Ver.1.0.0 (02/09/2025) => " + "STATUS-RUN " + config.main_config.STATUS_RUN + " " + 'Start server at port ' + config.main_config.PORT)

})

const action_parking_route = require('./routes/action_parking_route.js');
const action_utils_route = require('./routes/action_utils_route.js');
const api_third_party_parking_main_route = require('./routes/action_third_party_parking_main_route.js');


app.use('/api/v100/parking/entrance', action_parking_route);
app.use('/api/v100/parking', api_third_party_parking_main_route);
app.use('/api/v100/parking/utils', action_utils_route);








pool_mysql.getConnection(function (err, connection) {
  if (err) throw err; // not connected!

  // Use the connection
  connection.query('SELECT NOW() as timestamp', function (error, results, fields) {
    // When done with the connection, release it.


    let time_stamp = results[0].timestamp
    let res_data = format.create('200', "false", `connection success mysql : ${time_stamp}`, null)
    util_fun_log.show_log_connection_db("", res_data)
    console.log("connection success mysql")
    connection.release();

    // Handle error after the release.
    if (error) throw error;

    // Don't use the connection here, it has been returned to the pool.
  });
});