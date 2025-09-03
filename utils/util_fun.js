const os = require('os');

let util_moment_date = require("./util_moment_date");

exports.getWirelessIP = () => {

  // Get network interfaces
  const networkInterfaces = os.networkInterfaces();
  const results = []
  // Filter and print IPv4 addresses
  Object.keys(networkInterfaces).forEach(interfaceName => {
    const interfaces = networkInterfaces[interfaceName];
    interfaces.forEach(interfaceInfo => {
      if (interfaceInfo.family === 'IPv4') {


        results.push(`${interfaceName} -> ${interfaceInfo.address}`);


      }
    });
  });



  return results[0] + ' - ' + results[1]


}




exports.base64Decode = (encoded) => {
  return atob(encoded);

}
