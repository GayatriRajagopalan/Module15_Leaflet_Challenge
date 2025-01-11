// Create the base layers
//satellite layer
let sat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
// Grayscale map layer
let grayscale = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CartoDB</a>'
});

// Outdoors map layer
let outdoors = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CartoDB</a>'
});



// Creating the map object
let myMap = L.map("map", {
    center: [34.052235, -118.243683],
    zoom: 3,
    layers: [sat]
  });

// Create a baseMaps object to hold the base layers
let baseMaps = {
    "Satellite": sat,
    "Grayscale": grayscale,
    "Outdoors": outdoors    
}

// Add the layer control to the map to allow switching between different layers
//L.control.layers(baseMaps).addTo(myMap);

//Function to determine marker size based on magnitude
function markerSize(magnitude){
    return magnitude * 4;
}
//Function to determine marker color based on depth
function markerColor(depth) {
    if (depth >= 90) return "#ea2c2c";  // Depths 90+ are bright red
    else if (depth >= 70) return "#ea822c";  // Depths 70-90 are bright orange
    else if (depth >= 50) return "#ee9c00";  // Depths 50-70 are bright yellow
    else if (depth >= 30) return "#eecc00";  // Depths 30-50 are bright yellow-green
    else if (depth >= 10) return "#d4ee00";  // Depths 10-30 are bright green
    else return "#98ee00";  // Depths -10-10 are bright light green
}

// Use this earthquake link to get the GeoJSON data.
earthquake_link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
//Getting our geoJSON data
d3.json(earthquake_link).then(function(data){
    let earthquakes = L.geoJSON(data, {
        pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: markerColor(feature.geometry.coordinates[2]), // depth-based color
                color: "#000",  // border color of the circle
                weight: 1,  // border weight
                opacity: 1,
                fillOpacity: 0.7  // fill opacity
            }).bindPopup("<h3>" + feature.properties.place + "</h3><hr>" +
                "<p><strong>Magnitude:</strong> " + feature.properties.mag + "</p>" +
                "<p><strong>Depth:</strong> " + feature.geometry.coordinates[2] + " km</p>" +
                "<p><strong>Time:</strong> " + new Date(feature.properties.time).toLocaleString() + "</p>");
        }
    });
    // Add earthquake layer to the map
    earthquakes.addTo(myMap);  

    

    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");

        let colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"];
        let depthRange = [-10, 10, 30, 50, 70, 90];

        // Loop through each range and create a label with color
        for (let i = 0; i < depthRange.length; i++) {
            div.innerHTML += 
            "<div style='display: flex; align-items: center;'>" +
            "<i style='background: " + colors[i] + "; width: 20px; height: 20px; display: inline-block; margin-right: 5px;'></i>" +
            "<strong>" + depthRange[i] + (depthRange[i + 1] ? "&ndash;" + depthRange[i + 1] + "</strong><br>" : "+</strong>") +
            "</div>";
        }

        return div;
    };

    // Add the legend to the map
    legend.addTo(myMap);


    // Add a layer control to toggle between earthquake data and tectonic plates
    let overlays = {
        "Earthquakes": earthquakes
    };

    // Fetch the tectonic plates GeoJSON data
    //let tectonicPlatesLink = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/plates.geojson";
    let tectonicPlatesLink = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";
    
    d3.json(tectonicPlatesLink).then(function (tectonicData) {
        console.log(tectonicData);
        let tectonicPlates = L.geoJSON(tectonicData, {
            style: {
                color: "orange",
                weight: 2
            }
        });

        // Add tectonic plates to overlays
        overlays["Tectonic Plates"] = tectonicPlates;

        // Add the overlays control to the map
        L.control.layers(baseMaps, overlays).addTo(myMap);

        // Add tectonic plates to the map
        tectonicPlates.addTo(myMap);
    });

    


});
