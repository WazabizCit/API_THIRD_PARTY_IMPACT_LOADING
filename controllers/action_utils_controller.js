

const format = require('response-format');


const util_fun_log = require("../utils/util_fun_log");
const util_moment_date = require("../utils/util_moment_date");
const axios = require('axios');





exports.action_get_helthcheck = (req, res) => {


    res.status(200).send(`Success ${util_moment_date.timestamp_now_default()}`)

}



