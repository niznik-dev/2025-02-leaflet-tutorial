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

        // Load GeoJSON data from a URL
        fetch('https://gist.githubusercontent.com/rajinwonderland/80b3ac9c7dc75337594fb5e711e461a7/raw/6cf57ddbe377b652345a5a44bdf0c420693ef32d/stadiums.geojson')
            .then(response => response.json())
            .then(data => {
                L.geoJSON(data, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.name1);
                    },
                    pointToLayer: function(feature, latlng) {
                        return L.circleMarker(latlng, {
                            radius: 10,
                            color: "brown",
                            fillColor: "brown",
                            weight: 2,
                            opacity: 0.5,
                            fillOpacity: 0.5,
                        });
                    },
                }).addTo(map);
            })
            .catch(error => console.error("Error loading GeoJSON:", error));

        var userMarkers = L.layerGroup().addTo(map);

        map.on('click', function(e) {
            var lat_fmt = e.latlng.lat.toFixed(5) + " N";
            var lng_fmt = e.latlng.lng.toFixed(5) + " W";

            // alert("What a cool spot! That's " + e.latlng);
            // alert("What a cool spot! That's " + e.latlng.lat + " N " + Math.abs(e.latlng.lng) + " W!");
            // alert("What a cool spot! That's " + lat_fmt + " " + lng_fmt);
            var new_marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
            new_marker.bindPopup("You clicked here! " + lat_fmt + " " + lng_fmt);
            userMarkers.addLayer(new_marker);
        });

        document.getElementById("toggleMarkers").addEventListener("click", function() {
            if (map.hasLayer(userMarkers)) {
                map.removeLayer(userMarkers);
            } else {
                map.addLayer(userMarkers);
            }
        });

        // You could do the same thing with jQuery or another framework if you prefer
        document.getElementById("clearMarkers").addEventListener("click", function() {
            if (!map.hasLayer(userMarkers)) {
                alert('Please show the markers before clearing them!');
                return;
            }
            userMarkers.clearLayers();
        });
    }
});