const express = require('express');
const router = express.Router();
const {
    action_parking_entrance_lpr,
    action_parking_entrance_qrcode_booking

} = require("../controllers/action_parking_controller")

const auth_middle = require("../middleware/auth_middle");

const machine_middle = require("../middleware/machine_middle");
const parking_middle = require("../middleware/parking_middle");
const thirdparty_middle = require("../middleware/thirdparty_middle");



router.post('/lpr',
    auth_middle.mid_basicauth,
    parking_middle.mid_validator_action_parking_main_lpr,
    machine_middle.mid_get_info_machine,
    thirdparty_middle.mid_get_setting_thirdparty,
    thirdparty_middle.mid_send_check_license_plate,
    parking_middle.mid_get_setting_parking,
    parking_middle.mid_send_entrance,
    action_parking_entrance_lpr
);





router.post('/qrcode-booking',
    auth_middle.mid_basicauth,
    parking_middle.mid_validator_action_parking_main_qrcode_booking,
    machine_middle.mid_get_info_machine,
    thirdparty_middle.mid_get_setting_thirdparty,
    thirdparty_middle.mid_send_check_qrcode_booking,
    parking_middle.mid_get_setting_parking,
    parking_middle.mid_send_entrance,
    action_parking_entrance_qrcode_booking
);




module.exports = router;