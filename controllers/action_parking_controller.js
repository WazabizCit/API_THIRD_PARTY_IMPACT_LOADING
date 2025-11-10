

const util_fun_log = require("../utils/util_fun_log");
const util_moment_date = require("../utils/util_moment_date");
const format = require('response-format');
const config = require("../config/env");



/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */




exports.action_parking_entrance_lpr = (req, res) => {

    let obj_parking_entrance = req.body.obj_parking_entrance
    let obj_thirdparty_check = req.body.obj_thirdparty_check
    let obj_thirdparty_check_in = req.body.obj_thirdparty_check_in


    let result = {
        obj_parking_entrance: obj_parking_entrance,
        obj_thirdparty_check: obj_thirdparty_check,
        obj_thirdparty_check_in: obj_thirdparty_check_in
    }


    let res_data_entrance_lpr = format.create('200', "false", "ทำรายการเข้าสำเร็จ-LPR", result)
    res_data_entrance_lpr["server_ts"] = util_moment_date.timestamp_now()
    res.status(200).send(res_data_entrance_lpr)
    util_fun_log.show_log_res_info(req, res_data_entrance_lpr)



}






exports.action_parking_entrance_qrcode_booking = (req, res) => {




    let obj_parking_entrance = req.body.obj_parking_entrance
    let obj_thirdparty_check = req.body.obj_thirdparty_check
    let obj_thirdparty_check_in = req.body.obj_thirdparty_check_in


    let result = {
        obj_parking_entrance: obj_parking_entrance,
        obj_thirdparty_check: obj_thirdparty_check,
        obj_thirdparty_check_in: obj_thirdparty_check_in
    }

    let res_data_entrance_qrcode = format.create('200', "false", "ทำรายการเข้าสำเร็จ-QRCODE-BOOKING", result)
    res_data_entrance_qrcode["server_ts"] = util_moment_date.timestamp_now()
    res.status(200).send(res_data_entrance_qrcode)
    util_fun_log.show_log_res_info(req, res_data_entrance_qrcode)



}

