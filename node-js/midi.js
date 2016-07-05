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

var song = [];

for (var i = 0; i <= 70; i++) {
  song.push([Math.round(Math.random()*60+40), 200 + Math.round(Math.random()*3000), 50 + Math.round(Math.random()*3000)]);
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
                  play();
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
