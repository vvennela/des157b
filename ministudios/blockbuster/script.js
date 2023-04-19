(function() {
    'use strict';
    const myVideo = document.querySelector('#video');
    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const line4 = document.querySelector('#line4');

    const poem =  {
        start: [0, 3, 7, 10],
        stop: [2, 5, 9, 12],
        line: [line1, line2, line3, line4]
        }

    const intervalID = setInterval(checkTime, 1000);

    function checkTime() {
        console.log(parseInt(myVideo.currentTime));

        for (let i = 0; i < poem.start.length; i++) {
            if (poem.start[i] < myVideo.currentTime && myVideo.currentTime < poem.stop[i]) {
                poem.line[i].className = "showing";
                }
            else {
                poem.line[i].className = "hidden"; 
            }
        }
    }
})();