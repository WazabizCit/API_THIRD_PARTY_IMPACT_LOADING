const express = require('express');
const router = express.Router();
const {


action_third_party_parking_get_cartype

    


} = require("../controllers/action_third_party_parking_main_controller")

const auth_middle = require("../middleware/auth_middle");

const parking_middle = require("../middleware/parking_middle");







//TODO ดึงข้อมูล API jojo getcartype
router.post('/get/cartype',
    auth_middle.mid_basicauth,
    parking_middle.mid_send_get_cartype,
    action_third_party_parking_get_cartype
);







module.exports = router;