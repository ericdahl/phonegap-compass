var app = (function() {

    function successHeading(heading) {
        document.getElementById('compass-heading').innerHTML = heading.magneticHeading;
        document.getElementById('update-time').innerHTML = new Date();
    }

    function errorHeading() {
        document.getElementById('compass-heading').innerHTML = '-999';
        document.getElementById('update-time').innerHTML = new Date();
    }

    function init() {
        navigator.compass.watchHeading(successHeading, errorHeading, {
            frequency: 3000
        });
    }

    document.addEventListener('deviceready', init, false);
})();