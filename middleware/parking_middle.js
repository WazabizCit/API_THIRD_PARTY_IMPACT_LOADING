
const util_fun_log = require("../utils/util_fun_log.js");
const jwt = require('jsonwebtoken');
const config = require("../config/env.js");
const format = require('response-format');
const Joi = require('joi');
const axios = require('axios');
const util_moment_date = require("../utils/util_moment_date.js");






exports.mid_get_setting_parking = (req, res, next) => {



    let obj_setting_parking = {
        "base_url_parking_entrance": "http://172.25.10.13:9876/api/SaveActionIn/SaveTicketLoading",
        "username_parking_basic_auth": "cit",
        "password_parking_basic_auth": "cit00"
    }

    req.body["obj_setting_parking"] = obj_setting_parking
    next()

}





exports.mid_send_get_cartype = (req, res, next) => {

    let data_cartype = [
        {
            "cartype_id": 0,
            "cartype_name": "รถยนต์ "
        },
        {
            "cartype_id": 1,
            "cartype_name": "เหมาจ่ายหลัง 18:00"
        },
        {
            "cartype_id": 2,
            "cartype_name": "free"
        },
        {
            "cartype_id": 3,
            "cartype_name": "3 ชม แรก 40 บาท"
        },
        {
            "cartype_id": 4,
            "cartype_name": "เกินเวลา"
        },
        {
            "cartype_id": 5,
            "cartype_name": "Member"
        },
        {
            "cartype_id": 6,
            "cartype_name": "FREE PRO"
        }
    ]

    req.body["obj_car_type"] = data_cartype
    next()


}






exports.mid_send_entrance = (req, res, next) => {




    let auth_username = req.body.obj_setting_parking.username_parking_basic_auth
    let auth_password = req.body.obj_setting_parking.password_parking_basic_auth
    let base_url_parking_entrance = req.body.obj_setting_parking.base_url_parking_entrance
    let card_id = "0"
    let user_id = "1"
    let user_no_record = "1"
    let guardhouse = "test"
    let address = ""
    let path_div = req.body.img_path_div
    let path_lic =  req.body.img_path_lic
    let qrcode_sec = req.body.obj_thirdparty_check.data.booking_code
    let license_plate = req.body.license_plate
    let cartype_id = (req.body.obj_thirdparty_check.data.booking_cartype_id).toString();




    let data = JSON.stringify({
        "card_id": card_id,
        "license_plate": license_plate,
        "cartype_id": cartype_id,
        "user_id": user_id,
        "user_no_record": user_no_record,
        "guardhouse": guardhouse,
        "address": address,
        "path_div": path_div,
        "path_lic": path_lic,
        "qrcode_sec":qrcode_sec
    });

    const base64Auth = Buffer.from(`${auth_username}:${auth_password}`).toString('base64');


    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: base_url_parking_entrance,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64Auth}`
        },
        data: data,
        timeout: 5000
    };

    axios.request(config)
        .then((response) => {


        
            switch (response.data.bool_status) {
                case true:


                    let obj_parking_entrance = response.data              
                    obj_parking_entrance["obj_thirdparty_check"] = req.body.obj_thirdparty_check
                    req.body["obj_parking_entrance"] = obj_parking_entrance                
                    next()

                    break;

                default:


                    let str_message = response.data.str_message
                    let data_res_warning = format.create('200', "true",str_message, response.data)
                    data_res_warning["server_ts"] = util_moment_date.timestamp_now()
                    util_fun_log.show_log_res_warning(req, data_res_warning)
                    res.status(200).send(data_res_warning)



                    break;
            }
        })
        .catch((error) => {


            if (error.response) {


                let data_res_error_fail = {
                    "status_code": error.response.status,
                    "data_res": error.response.data

                }


                let data_res_warning = format.create('200', "true", "ทำรายการไม่สำเร็จ mid_send_entrance", data_res_error_fail)
                data_res_warning["server_ts"] = util_moment_date.timestamp_now()
                util_fun_log.show_log_res_warning(req, data_res_warning)
                res.status(200).send(data_res_warning)


            } else if (error.request) {
                // The request was made but no response was received
                // TimeOUT




                let data_res_error_network_fail = {

                    "status_code": "Request-Timeout",
                    "data_res": { "detail": "Request-Timeout" }

                }


                let data_res_warning = format.create('200', "true", "ทำรายการไม่สำเร็จ mid_send_entrance Request-Timeout", data_res_error_network_fail)
                data_res_warning["server_ts"] = util_moment_date.timestamp_now()
                util_fun_log.show_log_res_warning(req, data_res_warning)
                res.status(200).send(data_res_warning)


            } else {
                // Something happened in setting up the request that triggered an Error

                let data_res_error = format.create('200', "true", "axios mid_send_entrance fail", error)
                data_res_error["server_ts"] = util_moment_date.timestamp_now()
                util_fun_log.show_log_res_error(req, data_res_error)
                res.status(200).send(data_res_error)
            }


        });


}








exports.mid_validator_action_parking_main_lpr = (req, res, next) => {



    // สร้าง Schema สำหรับตรวจสอบข้อมูล
    const schema = Joi.object({

        license_plate: Joi.string().required(), // ต้องเป็น String และต้องมีค่า
        province: Joi.string().required(),  // ต้องเป็น String และต้องมีค่า
        lpr_code: Joi.string().required(), // ต้องเป็น String และต้องมีค่า
        lpr_ip: Joi.string().required(), // ต้องเป็น String และต้องมีค่า
        event_ts: Joi.string().required(), // ต้องเป็น String และต้องมีค่า
        img_path_div: Joi.string().required(),
        img_path_lic: Joi.string().required(), // ต้องเป็น String และต้องมีค่า
    });


    // ตรวจสอบข้อมูล
    const { error, value } = schema.validate(req.body);

    if (error) {

        let errors = {
            field: error.details[0].context.label,
            message: error.details[0].message
        }


        let data_res_warning = format.create('200', "true", error.details[0].message, errors)
        data_res_warning["server_ts"] = util_moment_date.timestamp_now()
        util_fun_log.show_log_res_warning(req, data_res_warning);
        return res.status(400).json(data_res_warning);

    } else {

        next()

    }




}









exports.mid_validator_action_parking_main_qrcode_booking = (req, res, next) => {



    // สร้าง Schema สำหรับตรวจสอบข้อมูล
    const schema = Joi.object({

        qrcode_code: Joi.string().required(),
        license_plate: Joi.string().required(), // ต้องเป็น String และต้องมีค่า
        province: Joi.string().required(),  // ต้องเป็น String และต้องมีค่า
        lpr_code: Joi.string().required(), // ต้องเป็น String และต้องมีค่า
        lpr_ip: Joi.string().required(), // ต้องเป็น String และต้องมีค่า
        event_ts: Joi.string().required(), // ต้องเป็น String และต้องมีค่า
        img_path_div: Joi.string().required(),
        img_path_lic: Joi.string().required(), // ต้องเป็น String และต้องมีค่า
    });


    // ตรวจสอบข้อมูล
    const { error, value } = schema.validate(req.body);

    if (error) {

        let errors = {
            field: error.details[0].context.label,
            message: error.details[0].message
        }


        let data_res_warning = format.create('200', "true", error.details[0].message, errors)
        data_res_warning["server_ts"] = util_moment_date.timestamp_now()
        util_fun_log.show_log_res_warning(req, data_res_warning);
        return res.status(400).json(data_res_warning);

    } else {

        next()

    }




}
