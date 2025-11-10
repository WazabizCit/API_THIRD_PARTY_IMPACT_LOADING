
const util_fun_log = require("../utils/util_fun_log.js");
const util_moment_date = require("../utils/util_moment_date.js");
const jwt = require('jsonwebtoken');
const config = require("../config/env.js");
const format = require('response-format');
const Joi = require('joi');
const axios = require('axios');






exports.mid_get_setting_thirdparty = (req, res, next) => {



    let obj_setting_thirdparty = {
        "base_url_thirdparty_check_lpr": "http://159.223.32.43:4000/api/bookings/check-license-plate",
        "base_url_thirdparty_check_qrcode": "http://159.223.32.43:4000/api/bookings/qr-code",
        "base_url_thirdparty_check_in": "http://159.223.32.43:4000/api/bookings/check-in",
        "base_url_thirdparty_check_out": "http://159.223.32.43:4000/api/bookings/check-out",
        "username_thirdparty_basic_auth": "booking_api",
        "password_thirdparty_basic_auth": "1234567"
    }

    req.body["obj_setting_thirdparty"] = obj_setting_thirdparty
    next()

}






exports.mid_send_check_license_plate = (req, res, next) => {




    let auth_username = req.body.obj_setting_thirdparty.username_thirdparty_basic_auth
    let auth_password = req.body.obj_setting_thirdparty.password_thirdparty_basic_auth
    let base_url_thirdparty_check_lpr = req.body.obj_setting_thirdparty.base_url_thirdparty_check_lpr





    let data = JSON.stringify({
        "license_plate_text": req.body.license_plate,
        "entry_timestamp": util_moment_date.timestamp_now_default()
    });


    const base64Auth = Buffer.from(`${auth_username}:${auth_password}`).toString('base64');


    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: base_url_thirdparty_check_lpr,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64Auth}`
        },
        data: data,
        timeout: 5000
    };

    axios.request(config)
        .then((response) => {
            switch (response.data.data.booking_status_code) {
                case "BKS001":

                    req.body["obj_thirdparty_check"] = response.data
                    next()

                    break;

                default:


                    let booking_status_text = response.data.data.booking_status_text
                    let data_res_warning = format.create('200', "true", booking_status_text, response.data)
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


                let data_res_warning = format.create('200', "true", "ทำรายการไม่สำเร็จ mid_send_check_license_plate", data_res_error_fail)
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


                let data_res_warning = format.create('200', "true", "ทำรายการไม่สำเร็จ mid_send_check_license_plate Request-Timeout", data_res_error_network_fail)
                data_res_warning["server_ts"] = util_moment_date.timestamp_now()
                util_fun_log.show_log_res_warning(req, data_res_warning)
                res.status(200).send(data_res_warning)


            } else {
                // Something happened in setting up the request that triggered an Error

                let data_res_error = format.create('200', "true", "axios mid_send_check_license_plate fail", error)
                data_res_error["server_ts"] = util_moment_date.timestamp_now()
                util_fun_log.show_log_res_error(req, data_res_error)
                res.status(200).send(data_res_error)
            }


        });


}








exports.mid_send_check_qrcode_booking = (req, res, next) => {




    let auth_username = req.body.obj_setting_thirdparty.username_thirdparty_basic_auth
    let auth_password = req.body.obj_setting_thirdparty.password_thirdparty_basic_auth
    let base_url_thirdparty_check_qrcode = req.body.obj_setting_thirdparty.base_url_thirdparty_check_qrcode






    let data = JSON.stringify({
        "booking_code": req.body.qrcode_code,
        "entry_timestamp": util_moment_date.timestamp_now_default()
    });


    const base64Auth = Buffer.from(`${auth_username}:${auth_password}`).toString('base64');


    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: base_url_thirdparty_check_qrcode,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64Auth}`
        },
        data: data,
        timeout: 5000
    };

    axios.request(config)
        .then((response) => {
            switch (response.data.data.booking_status_code) {
                case "BKS001":

                    req.body["obj_thirdparty_check"] = response.data
                    next()

                    break;

                default:


                    let booking_status_text = response.data.data.booking_status_text
                    let data_res_warning = format.create('200', "true", booking_status_text, response.data)
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


                let data_res_warning = format.create('200', "true", "ทำรายการไม่สำเร็จ mid_send_check_license_plate", data_res_error_fail)
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


                let data_res_warning = format.create('200', "true", "ทำรายการไม่สำเร็จ mid_send_check_license_plate Request-Timeout", data_res_error_network_fail)
                data_res_warning["server_ts"] = util_moment_date.timestamp_now()
                util_fun_log.show_log_res_warning(req, data_res_warning)
                res.status(200).send(data_res_warning)


            } else {
                // Something happened in setting up the request that triggered an Error

                let data_res_error = format.create('200', "true", "axios mid_send_check_license_plate fail", error)
                data_res_error["server_ts"] = util_moment_date.timestamp_now()
                util_fun_log.show_log_res_error(req, data_res_error)
                res.status(200).send(data_res_error)
            }


        });


}









exports.mid_send_check_in = (req, res, next) => {




    let auth_username = req.body.obj_setting_thirdparty.username_thirdparty_basic_auth
    let auth_password = req.body.obj_setting_thirdparty.password_thirdparty_basic_auth
    let base_url_thirdparty_check_in = req.body.obj_setting_thirdparty.base_url_thirdparty_check_in
    let parking_url = req.body.obj_parking_entrance.data.qrcode_park
    let parking_code = getQueryParamValue(req.body.obj_parking_entrance.data.qrcode_park, "v")
    let parking_no = req.body.obj_parking_entrance.data.record_no
    let booking_code = req.body.obj_thirdparty_check.data.booking_code
    let entry_timestamp = req.body.obj_parking_entrance.data.datetime_in





    let data = JSON.stringify({
        "parking_url": parking_url,
        "parking_code": parking_code,
        "parking_no": parking_no,
        "booking_code": booking_code,
        "entry_timestamp": util_moment_date.timestamp_format_YYYY_MM_DD_HH_mm_ss_timestamp(entry_timestamp)
    });




    const base64Auth = Buffer.from(`${auth_username}:${auth_password}`).toString('base64');


    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: base_url_thirdparty_check_in,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64Auth}`
        },
        data: data,
        timeout: 5000
    };

    axios.request(config)
        .then((response) => {



            switch (response.data.data.parking_status) {
                case "ENTRY_SUCCESS":

                    req.body["obj_thirdparty_check_in"] = response.data
                    next()

                    break;

                default:


                    let parking_status = response.data.data.parking_status
                    let data_res_warning = format.create('200', "true", parking_status, response.data)
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


                let data_res_warning = format.create('200', "true", "ทำรายการไม่สำเร็จ mid_send_check_in", data_res_error_fail)
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

                let data_res_warning = format.create('200', "true", "ทำรายการไม่สำเร็จ mid_send_check_in Request-Timeout", data_res_error_network_fail)
                data_res_warning["server_ts"] = util_moment_date.timestamp_now()
                util_fun_log.show_log_res_warning(req, data_res_warning)
                res.status(200).send(data_res_warning)


            } else {
                // Something happened in setting up the request that triggered an Error

                let data_res_error = format.create('200', "true", "axios mid_send_check_in fail", error)
                data_res_error["server_ts"] = util_moment_date.timestamp_now()
                util_fun_log.show_log_res_error(req, data_res_error)
                res.status(200).send(data_res_error)
            }


        });


}



//FUNTION
function getQueryParamValue(url, key) {
    try {
        // ถ้าไม่มี protocol ให้นำหน้า "https://"
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }

        const urlObj = new URL(url);
        return urlObj.searchParams.get(key);
    } catch (err) {
        console.error("❌ Invalid URL:", err.message);
        return null;
    }
}