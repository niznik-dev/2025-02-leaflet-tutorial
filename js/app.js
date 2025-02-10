// I'm using vanilla JS here, but if you want to use another framework you can do an equivalent thing with it
document.addEventListener("DOMContentLoaded", function() {
    var clickMarkers = [];
    
    const mapElement = document.getElementById("map");

    if (mapElement) {
        // Need to make sure that the #map element exists before we can do anything fun
        initializeMap();
    } else {
        console.error("Map element not found!");
    }

    function initializeMap() {
        // "L" is the Leaflet object, which is available because we included the Leaflet library in the HTML file
        var map = L.map('map').setView([40.34265, -74.65815], 19); // Set the center point and zoom level
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 21,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        var marker = L.marker([40.34597, -74.65210]).addTo(map);
        marker.bindPopup("<b>Fine Hall Vis Lab</b><br>Where we are right now!<br>(...more or less...)");
    
        // This could be useful for uncertainty visualization
        var circle = L.circle([40.34597, -74.65210], {
            color: 'orange',
            fillColor: 'orange',
            fillOpacity: 0.3,
            radius: 10
        }).addTo(map);

        var polygon = L.polygon([
            [40.34275, -74.65739],
            [40.34256, -74.65811],
            [40.34297, -74.65832],
            [40.34317, -74.65759]
        ], {
            color: '#aaddff',
            fillColor: '#aaddff',
            fillOpacity: 0.3,
        }).addTo(map);
        polygon.bindPopup("Hockey tends to happen here 🏒");

        map.on('click', function(e) {
            var lat_fmt = e.latlng.lat.toFixed(5) + " N";
            var lng_fmt = e.latlng.lng.toFixed(5) + " W";

            // alert("What a cool spot! That's " + e.latlng);
            // alert("What a cool spot! That's " + e.latlng.lat + " N " + Math.abs(e.latlng.lng) + " W!");
            // alert("What a cool spot! That's " + lat_fmt + " " + lng_fmt);
            var new_marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
            new_marker.bindPopup("You clicked here! " + lat_fmt + " " + lng_fmt);
            clickMarkers.push(new_marker);
        });

        // You could do the same thing with jQuery or another framework if you prefer
        document.getElementById("clearMarkers").addEventListener("click", function() {
            for (var i = 0; i < clickMarkers.length; i++) {
                // Remove each marker from the map
                map.removeLayer(clickMarkers[i]);
            }
            // Reset the array of markers
            clickMarkers = [];
        });
    }
});