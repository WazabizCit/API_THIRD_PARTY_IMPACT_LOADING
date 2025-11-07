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



// router.post('/qrcode-booking',
//     auth_middle.mid_basicauth,
//     parking_middle.mid_validator_action_parking_main_rfid,
//     machine_middle.mid_get_info_machine_type_entrance,
//     thirdparty_middle.mid_get_setting_thirdparty,
//     thirdparty_middle.mid_send_check_antipassback_entrance,
//     parking_middle.mid_proc_parking_process_entrance_3rdparty_api_rfid,
//     parking_middle.mid_proc_audit_handle_fail_parking_entrance_3rdparty_api,
//     action_parking_entrance_qrcode_booking
// );





module.exports = router;