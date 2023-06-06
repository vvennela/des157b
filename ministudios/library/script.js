const { Chart } = require("chart.js");

(function() {
    'use strict';
    const demo = document.getElementById('raceChart');

    new Chart(demo, {
        type: 'pie',
        data : {
            datasets: [{
                data: [8580, 7272, 6488, 4994, 1703, 618, 382, 105],
                labels: [
                    'Asian',
                    'Hispanic',
                    'White',
                    'International',
                    'Multi-ethnic',
                    'Black',
                    'Unknown',
                    'Pacific Islander'
            ]
        }]
    }, 


    })






})();