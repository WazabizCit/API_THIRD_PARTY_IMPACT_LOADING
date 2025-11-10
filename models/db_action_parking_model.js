const pool_mysql = require("../config/db_con");



exports.db_mid_proc_parking_set_sync_checkin = function (obj, callback) {



    
    let record_no = removeLeadingZeros(obj.obj_parking_entrance.data.record_no)

    pool_mysql.getConnection(function (err, connection) {

        if (err) {
            console.log(err)
            return callback(null, Format.badRequest(err, "error"))
        }

        connection.query({
            sql: `call proc_parking_set_sync_checkin(?)`,
            timeout: 10000, // 10s
            values: [record_no]
        }, function (error, results, fields) {

            connection.release();

            if (error) {
                console.log(error)
                return callback(null, null)

            } else {

                let data =  JSON.parse(JSON.stringify(results))
                return callback(null, data[0])

            }



        });


    });
}



function removeLeadingZeros(str) {
    str = String(str);
    return str.replace(/^0+/, '') || '0';
}