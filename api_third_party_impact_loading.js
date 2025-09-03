const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const config = require("./config/env.js");
const pool = require("./config/db_con.js");
const { v4: uuidv4 } = require('uuid');
const util_fun_log = require("./utils/util_fun_log.js");
const util_fun = require("./utils/util_fun.js");
var cors = require('cors')



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


const api_third_party_parking_main_route = require('./routes/action_third_party_parking_main_route.js');
const action_utils_route = require('./routes/action_utils_route.js');


app.use('/api/v100/parking', api_third_party_parking_main_route);
app.use('/api/v100/parking/utils', action_utils_route);








// pool.connect().then(client => {

//   return client.query('SELECT NOW()')
//     .then(result => {

//       client.release(true)
//       console.log("connect database success " + JSON.stringify(result.rows[0]))

//     })
//     .catch(err => {

//       client.release(true)
//       return console.error('Error executing query', err.stack)
      
//     })
// })
