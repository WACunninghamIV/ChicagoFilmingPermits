// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});
// Initialize all of the LayerGroups we'll be using
var layers = {
  COMPLETE: new L.LayerGroup(),
  CANCELLED: new L.LayerGroup(),
  FEE_PAYMENT: new L.LayerGroup(),
  INCOMPLETE_APPLICATION: new L.LayerGroup(),
  DENIED: new L.LayerGroup(),
  APPLICATION_IN_REVIEW: new L.LayerGroup()
};
// Create the map with our layers
var map = L.map("map", {
  center: [41.890426, -87.62367],
  zoom: 12,
  layers: [
    layers.COMPLETE,
    layers.CANCELLED,
    layers.FEE_PAYMENT,
    layers.INCOMPLETE_APPLICATION,
    layers.DENIED,
    layers.APPLICATION_IN_REVIEW,
  ]
});
// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);
// Create an overlays object to add to the layer control
var overlays = {
  "Complete": layers.COMPLETE,
  "Cancelled": layers.CANCELLED,
  "Fee Payment": layers.FEE_PAYMENT,
  "Incomplete Application": layers.INCOMPLETE_APPLICATION,
  "Denied": layers.DENIED,
  "Application in Review": layers.APPLICATION_IN_REVIEW
//   // "Out of Order": layers.OUT_OF_ORDER
};
// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);
// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});
// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);
// Initialize an object containing icons for each layer group
var icons = {
  COMPLETE: L.ExtraMarkers.icon({
    icon: "green-star",
    iconColor: "blue",
    markerColor: "white",
    shape: "square",
    svg: true
  }),
  CANCELLED: L.ExtraMarkers.icon({
    icon: "red-star",
    iconColor: "white",
    markerColor: "white",
    shape: "square"
  }),
  FEE_PAYMENT: L.ExtraMarkers.icon({
    icon: "purple-star",
    iconColor: "white",
    markerColor: "white",
    shape: "square"
  }),
  INCOMPLETE_APPLICATION: L.ExtraMarkers.icon({
    icon: "blue-star",
    iconColor: "white",
    markerColor: "white",
    shape: "square"
  }),
  DENIED: L.ExtraMarkers.icon({
    icon: "orange-star",
    iconColor: "white",
    markerColor: "white",
    shape: "square"
  }),
  APPLICATION_IN_REVIEW: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "pink",
    shape: "circle"
  })
};
// Perform an API call to the Citi Bike Station Information endpoint
d3.json("json/data_json.json").then(function(filming_data) {
  console.log(filming_data)
  // When the first API call is complete, perform another call to the Citi Bike Station Status endpoint
  //  var appStatus = filming_data.CURRENTMILESTONE;
    // // Create an object to keep of the number of markers in each layer
    var appCount = {
      COMPLETE: 0,
      CANCELLED: 0,
      FEE_PAYMENT: 0,
      INCOMPLETE_APPLICATION: 0,
      DENIED: 0,
      APPLICATION_IN_REVIEW: 0
    };
    // // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers, icons, and station count for layer group
    let appStatus = undefined;
    // // Loop through the stations (they're the same size and have partially matching data)
    for (var i = 0; i < 2000; i++) {
      appStatus = filming_data[i].CURRENTMILESTONE;
      console.log(i, appStatus, filming_data[i].LATITUDE, filming_data[i].LONGITUDE);
      // Create a new station object with properties of both station objects
      // var station = Object.assign({}, appStatus[i]);
      // If a station is listed but not installed, it's coming soon
      // if (filming_data.CURRENTMILESTONE = "COMPLETE") {
      //   appStatus = "COMPLETE";
      // }
      // // If a station has no bikes available, it's empty
      // else if (!station.num_bikes_available) {
      //   stationStatusCode = "CANCELLED";
      // }
      // // If a station is installed but isn't renting, it's out of order
      // else if (station.is_installed && !station.is_renting) {
      //   stationStatusCode = "FEE PAYMENT";
      // }
      // // If a station has less than 5 bikes, it's status is low
      // else if (station.num_bikes_available < 5) {
      //   stationStatusCode = "INCOMPLETE APPLICATION";
      // }
      // // If a station has less than 5 bikes, it's status is low
      // else if (station.num_bikes_available < 5) {
      //   stationStatusCode = "DENIED";
      // }
      // // Otherwise the station is normal
      // else {
      //   stationStatusCode = "APPLICATION IN REVIEW";
      // }
      // Update the station count
      appCount[appStatus]++;
      if (!filming_data[i].LATITUDE || !filming_data[i].LONGITUDE)
        continue;
      // Create a new marker with the appropriate icon and coordinates
      var newMarker = L.marker([filming_data[i].LATITUDE, filming_data[i].LONGITUDE] );
      console.log(newMarker);
      console.log(layers);
      // Add the new marker to the appropriate layer
      appStatus = appStatus.replace(" ", "_");
      newMarker.setIcon(icons[appStatus.toUpperCase()]);
      newMarker.addTo(layers[appStatus.toUpperCase()]); //appStatus]);
      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      // newMarker.bindPopup(station.name + "<br> Capacity: " + station.capacity + "<br>" + station.num_bikes_available + " Bikes Available");
    }
    // var layers = {
    //   COMPLETE: new L.LayerGroup(),
    //   CANCELLED: new L.LayerGroup(),
    //   FEE_PAYMENT: new L.LayerGroup(),
    //   INCOMPLETE_APPLICATION: new L.LayerGroup(),
    //   DENIED: new L.LayerGroup(),
    //   APPLICATION_IN_REVIEW: new L.LayerGroup()
    // };
    // Call the updateLegend function, which will... update the legend!
    // updateLegend(updatedAt, stationCount);
  });
// // Update the legend's innerHTML with the last updated time and station count
// function updateLegend(time, stationCount) {
//   document.querySelector(".legend").innerHTML = [
//     "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
//     "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
//     "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
//     "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
//     "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
//     "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
//   ].join("");
// }