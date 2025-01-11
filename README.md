# Leaflet Earthquake Visualization Challenge

# Overview

This project utilizes the Leaflet JavaScript library to build an interactive map that visualizes earthquake data. 

The markers are placed on the map according to the latitude and longitude values from the geoJSON file. 

The radius of each marker is determined by the earthquake's magnitude, which is also extracted from the geoJSON data. 

The marker color reflects the earthquake's depth, as specified in the geoJSON file. 

Each marker includes a popup displaying detailed information, and a legend is provided in the bottom right corner for the user's reference.

# Project Structure

The project is divided into two parts:

Leaflet-Part-1: This part involves creating a basic map to visualize earthquake data.

Leaflet-Part-2 (Optional): This part challenges you to gather additional data, such as tectonic plate boundaries, and plot them on the map.

# Data Source

The earthquake data is fetched from the USGS Earthquake GeoJSON feed.

The data includes:

Earthquake location (latitude, longitude)

Magnitude

Depth

# Files

index.html: This is the main HTML file that contains the structure of the map page. It includes the necessary script tags for both Part 1 (logic.js) and Part 2 (logic_tectonicplates.js). By default, the script for Part 2 is commented out. To switch between the two parts, you can simply uncomment the script tag for logic_tectonicplates.js.

style.css: This CSS file contains the styling for the map and the page layout.

logic.js: This JavaScript file contains the code for Part 1 of the challenge. It handles the earthquake data visualization using Leaflet. In this part, earthquake data is fetched from the USGS GeoJSON feed and displayed on the map with dynamically sized markers based on magnitude and color based on depth.

logic_tectonicplates.js: This JavaScript file contains the code for Part 2 of the challenge. It extends the map by adding tectonic plate boundaries and displaying them alongside the earthquake data. By default, the script for Part 2 is commented out in index.html. To enable Part 2, simply uncomment the relevant script tag in the index.html file.

# How the script tags work:

The index.html file includes both JavaScript files.

The script for logic.js (Part 1) is always active.

The script for logic_tectonicplates.js (Part 2) is commented out in the index.html file by default. To enable Part 2, simply uncomment the relevant script tag.


# Part 1: Create the Earthquake Visualization

Leaflet-Part-1 consists of a basic map that:

Loads earthquake data from the USGS GeoJSON feed.

Plots each earthquake based on its latitude and longitude.

Uses the magnitude to adjust marker sizes and depth to adjust the color of the markers.

Displays popups with additional details for each earthquake.

Includes a legend to explain the color scale for earthquake depths.

# Part 2: (Optional) Gather and Plot More Data

In Leaflet-Part-2,visualization is further enhanced by adding additional dataset, such as tectonic plate boundaries, to provide more context to the earthquake data. 

You can toggle between different layers to view the earthquake data and tectonic plates on the same map.

# Features

Interactive Map: Use Leaflet.js to create an interactive map.

Dynamic Markers: Earthquake markers are dynamically sized and colored based on the earthquake's magnitude and depth.

Popups: Clicking on any earthquake marker opens a popup showing details such as location, magnitude, and depth.

Legend: The map includes a color legend to provide context for earthquake depths.
