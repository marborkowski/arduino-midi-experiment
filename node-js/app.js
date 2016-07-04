var midi = require('midi');
var output = new midi.output();

output.getPortCount();

console.log(output.getPortName(0));

try {
  output.openPort(0);
} catch (_error) {
  error = _error;
  output.openVirtualPort('');
  console.log(error);
}

output.sendMessage([144, 49, 100]);
output.sendMessage([144, 43, 100]);
output.sendMessage([144, 53, 100]);

setTimeout(function () {
  output.sendMessage([128, 49, 100]);
  output.sendMessage([128, 43, 100]);
  output.sendMessage([128, 53, 100]);

  output.closePort();
}, 1500);
