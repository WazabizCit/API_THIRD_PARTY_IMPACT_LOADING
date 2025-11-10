
const util_fun_log = require("../utils/util_fun_log.js");
const jwt = require('jsonwebtoken');
const config = require("../config/env");
const format = require('response-format');
const Joi = require('joi');
const util_moment_date = require("../utils/util_moment_date");




exports.mid_basicauth_parking = (req, res, next) => {


  const authHeader = req.headers.authorization;

  console.log(authHeader)
  if (!authHeader) {

    let data_res_warning = format.create('401', "true", "Authentication required .", "Authentication required .")
    data_res_warning["timestamp_response"] = util_moment_date.timestamp_now()
    res.status(401).send(data_res_warning);
    util_fun_log.show_log_res_warning(req, data_res_warning);

  } else {

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Replace with your own username and password verification logic
    const validUsername = config.main_config.USERNAME_BASIC_AUTH_PARKING;
    const validPassword = config.main_config.PASSWORD_BASIC_AUTH_PARKING;




    if (username === validUsername && password === validPassword) {

      next();




    } else {
      let data_res_warning = format.create('401', "true", "Authentication invalid credentials .", "Authentication invalid credentials .")
      data_res_warning["timestamp_response"] = util_moment_date.timestamp_now()
      res.status(401).send(data_res_warning);
      util_fun_log.show_log_res_warning(req, data_res_warning);
    }

  }

}




exports.mid_basicauth_thirdparty = (req, res, next) => {


  const authHeader = req.headers.authorization;
  if (!authHeader) {

    let data_res_warning = format.create('401', "true", "Authentication required .", "Authentication required .")
    data_res_warning["timestamp_response"] = util_moment_date.timestamp_now()
    res.status(401).send(data_res_warning);
    util_fun_log.show_log_res_warning(req, data_res_warning);

  } else {

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Replace with your own username and password verification logic
    const validUsername = config.main_config.USERNAME_BASIC_AUTH_THIRDPARTY;
    const validPassword = config.main_config.PASSWORD_BASIC_AUTH_THIRDPARTY;

    if (username === validUsername && password === validPassword) {

      next();




    } else {
      let data_res_warning = format.create('401', "true", "Authentication invalid credentials .", "Authentication invalid credentials .")
      data_res_warning["timestamp_response"] = util_moment_date.timestamp_now()
      res.status(401).send(data_res_warning);
      util_fun_log.show_log_res_warning(req, data_res_warning);
    }

  }

}
