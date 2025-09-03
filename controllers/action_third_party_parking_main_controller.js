

const format = require('response-format');


const util_fun_log = require("../utils/util_fun_log");
const util_moment_date = require("../utils/util_moment_date");
const config = require("../config/env");








exports.action_third_party_parking_get_cartype = (req, res) => {

            let data_cartype = req.body.obj_car_type

            let res_data = format.create('200', "false", "ดึงข้อมูล cartype สำเร็จ", data_cartype)
            res_data["timestamp_response"] = util_moment_date.timestamp_now()
            util_fun_log.show_log_res_info(req, res_data)
            res.send(res_data)

}








