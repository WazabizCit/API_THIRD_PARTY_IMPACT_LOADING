require('dotenv').config();
const util_fun = require("../utils/util_fun");


const config_env = {
    db_config: {


        HOST_DB: process.env.HOST_DB,
        PORT_DB: process.env.PORT_DB,
        DATABASE_DB: process.env.DATABASE_DB,
        USER_DB: process.env.USER_DB,
        PASSWORD_DB: process.env.PASSWORD_DB,
        MAX: process.env.MAX,
        IDLETIMEOUTMILLIS: process.env.IDLETIMEOUTMILLIS,
        CONNECTIONTIMEOUTMILLIS: process.env.CONNECTIONTIMEOUTMILLIS,


    },
    main_config: {


        STATUS_RUN: process.env.STATUS_RUN,
        PORT: process.env.PORT,
        APP_NAME: process.env.APP_NAME,
        USERNAME_BASIC_AUTH_THIRDPARTY: process.env.USERNAME_BASIC_AUTH_THIRDPARTY,
        PASSWORD_BASIC_AUTH_THIRDPARTY: process.env.PASSWORD_BASIC_AUTH_THIRDPARTY,
        USERNAME_BASIC_AUTH_PARKING: process.env.USERNAME_BASIC_AUTH_PARKING,
        PASSWORD_BASIC_AUTH_PARKING: process.env.PASSWORD_BASIC_AUTH_PARKING,

        //CIT

        BASE_URL_PARKING_ENTRANCE: process.env.BASE_URL_PARKING_ENTRANCE,
        USERNAME_PARKING_BASIC_AUTH: process.env.USERNAME_PARKING_BASIC_AUTH,
        PASSWORD_PARKING_BASIC_AUTH: process.env.PASSWORD_PARKING_BASIC_AUTH,



        //VERILY


        BASE_URL_THIRDPARTY_CHECK_LPR: process.env.BASE_URL_THIRDPARTY_CHECK_LPR,
        BASE_URL_THIRDPARTY_CHECK_QRCODE: process.env.BASE_URL_THIRDPARTY_CHECK_QRCODE,
        BASE_URL_THIRDPARTY_CHECK_IN: process.env.BASE_URL_THIRDPARTY_CHECK_IN,
        BASE_URL_THIRDPARTY_CHECK_OUT: process.env.BASE_URL_THIRDPARTY_CHECK_OUT,
        USERNAME_THIRDPARTY_BASIC_AUTH: process.env.USERNAME_THIRDPARTY_BASIC_AUTH,
        PASSWORD_THIRDPARTY_BASIC_AUTH: process.env.PASSWORD_THIRDPARTY_BASIC_AUTH,



    }

}

module.exports = config_env;