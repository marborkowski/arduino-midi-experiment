'use strict';

var midi = require('midi');
//var mario = require('./mario.js');
var output = new midi.output();

console.log('Output device: ' + output.getPortName(0));
//console.log(mario);

try {
    output.openPort(0);
} catch (e) {
    output.openVirtualPort('');
}

var normal = [
  0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120,
  2, 14, 26, 38, 50, 62, 74, 86, 98, 110, 122,
  4, 16, 28, 40, 52, 64, 76, 88, 100, 112, 124,
  5, 17, 29, 41, 53, 65, 77, 89, 101, 113, 125,
  7, 19, 31, 43, 55, 67, 79, 91, 103, 115, 127,
  9, 21, 33, 45, 57, 69, 81, 93, 105, 117,
  11, 23, 35, 47, 59, 71, 83, 95, 107, 119
];

var song = [];
/**var song = [
  [38, 500, 1000],
  [38, 500, 1000],
  [40, 500, 1000],
  [38, 500, 1000],
  [43, 500, 1000],
];**/

for (var i = 0; i <= 70; i++) {
  song.push([normal[Math.floor(Math.random()*normal.length)], 200 + Math.round(Math.random()*3000), 50 + Math.round(Math.random()*3000)]);
}

var timeline = 0;

function play() {
    timeline = 0;
    //output.sendMessage([144, 60, 100]);
    song.forEach(function (note, index) {
        let noteNo = note[0],
            duration = note[1],
            space = note[2];

            setTimeout(function () {
                console.log('*****');
                console.log('Playing: ' + noteNo);
                output.sendMessage([144, noteNo, 100]);
            }, timeline);

            setTimeout(function () {
                console.log('Stop: ' + noteNo);
                console.log('*****\n\n');
                output.sendMessage([128, noteNo, 100]);

                if (++index === song.length) {
                  setTimeout(function () {
                      play();
                  }, space);
                }
            }, timeline + duration);

            timeline += (duration + space);
    });
}

play();

process.on('SIGINT', function() {
    console.log('\nCaught interrupt signal.');
    process.exit();
});
