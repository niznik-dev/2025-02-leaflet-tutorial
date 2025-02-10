// I'm using vanilla JS here, but if you want to use another framework you can do an equivalent thing with it
document.addEventListener("DOMContentLoaded", function() {
    const mapElement = document.getElementById("map");

    if (mapElement) {
        // Need to make sure that the #map element exists before we can do anything fun
        initializeMap();
    } else {
        console.error("Map element not found!");
    }

    function initializeMap() {
        // "L" is the Leaflet object, which is available because we included the Leaflet library in the HTML file
        var map = L.map('map').setView([40.34592, -74.65223], 19); // Set the center point and zoom level
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 21,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    }
});