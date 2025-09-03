const express = require('express');
const router = express.Router();
const {


action_third_party_parking_get_cartype

    


} = require("../controllers/action_third_party_parking_main_controller")

const auth_middle = require("../middleware/auth_middle");

const parking_cit_middle = require("../middleware/parking_cit_middle");








router.post('/get/cartype',
    auth_middle.mid_basicauth,
    parking_cit_middle.mid_send_get_cartype,
    action_third_party_parking_get_cartype
);







module.exports = router;