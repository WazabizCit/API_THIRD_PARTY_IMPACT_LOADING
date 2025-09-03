const express = require('express');
const router = express.Router();
const {


  action_get_helthcheck,
  


} = require("../controllers/action_utils_controller")



const auth_middle = require("../middleware/auth_middle");





router.get('/helthcheck',
  action_get_helthcheck
);










module.exports = router;