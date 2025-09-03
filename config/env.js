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
        USERNAME_BASIC_AUTH:process.env.USERNAME_BASIC_AUTH,
        PASSWORD_BASIC_AUTH:process.env.PASSWORD_BASIC_AUTH

     



    }

}

module.exports = config_env;