let moment = require('moment-timezone');

exports.timestamp_now = () => {  
  return moment().tz('Etc/GMT-7').format('YYYY-MM-DD HH:mm:ss.SSS ZZ')
}

exports.date_now = () => {
  return moment().tz('Etc/GMT-7').format('YYYY-MM-DD')
}



exports.timestamp_now_default = () => {
  return moment().tz('Etc/GMT-7').format('YYYY-MM-DD HH:mm:ss')
}

exports.timestamp_format_unix_timestamp   = (timestamp) => {
  return  moment.tz(timestamp * 1000, 'Etc/GMT-7').format('YYYY-MM-DD HH:mm:ss');
}



