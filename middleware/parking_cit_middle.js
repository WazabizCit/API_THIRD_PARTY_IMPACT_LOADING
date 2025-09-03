
const util_fun_log = require("../utils/util_fun_log.js");
const jwt = require('jsonwebtoken');
const config = require("../config/env.js");
const format = require('response-format');
const Joi = require('joi');






exports.mid_send_get_cartype = (req, res, next) => {

let data_cartype =  [
    {
      "cartype_id": 0,
      "cartype_name": "booking car 1"
    },
    {
      "cartype_id": 1,
      "cartype_name": "booking car 2"
    },
    {
      "cartype_id": 1,
      "cartype_name": "booking car 3"
    },
  ]

  req.body["obj_car_type"] = data_cartype
  next()


}
