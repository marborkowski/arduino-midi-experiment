'use strict';

var midi = require('midi');
var output = new midi.output();

console.log('Output device: ' + output.getPortName(0));

try {
    output.openPort(0);
} catch (e) {
    output.openVirtualPort('');
}

var song = [];

for (var i = 0; i <= 70; i++) {
  song.push([Math.round(Math.random()*60+40), 1200, 400]);
}

var timeline = 0;

function play() {
    timeline = 0;
    output.sendMessage([144, 60, 100]);
    song.forEach(function (note, index) {
        let noteNo = note[0],
            duration = note[1],
            space = note[2];

        //(function (noteNo, duration, space) {
            setTimeout(function () {
                console.log('Playing: ' + noteNo);
                output.sendMessage([144, noteNo, 100]);
            }, timeline);

            setTimeout(function () {
                console.log('Stop: ' + noteNo + '\n\n');
                output.sendMessage([128, noteNo, 100]);

                if (++index === song.length) {
                  play();
                }
            }, timeline + duration);

            timeline += (duration + space);
        //})(noteNo, duration, space);
    });
}

play();

process.on('SIGINT', function() {
    console.log('\nCaught interrupt signal.');
    process.exit();
});
