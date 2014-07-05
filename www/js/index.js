/* global document, navigator, compass, setInterval */
(function() {
    'use strict';

    function successHeading(heading) {
        document.getElementById('compass-heading').innerHTML = heading.magneticHeading;
        document.getElementById('update-time').innerHTML = new Date();
        compass.setHeading(heading.magneticHeading);
    }

    function errorHeading() {
        document.getElementById('compass-heading').innerHTML = '-999';
        document.getElementById('update-time').innerHTML = new Date();
    }

    function initCompass() {
        navigator.compass.watchHeading(successHeading, errorHeading, {
            frequency: 3000
        });
    }

    function mockCompass() {
        var heading = 0;
        setInterval(function() {
            successHeading({
                magneticHeading: heading
            });
            heading = (heading + 5) % 360;
        }, 1000);
    }

    if (/ios|iphone|ipod|ipad|android/i.test(navigator.userAgent)) {
        document.addEventListener('deviceready', initCompass, false);
    } else {
        mockCompass();
    }

})();

