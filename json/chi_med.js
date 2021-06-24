// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Create the map with our layers
var map = L.map("map", {
  center: [41.890426, -87.62367],
  zoom: 12,

});
// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);
// Create a new marker
// Pass in some initial options, and then add it to the map using the addTo method
var marker = L.marker([41.9157833,-87.6783693], {
    draggable: false,
    title: "Lotties Bar"
  }).addTo(map);
  
  // Binding a pop-up to our marker
  marker.bindPopup("Chicago Med Bar");
  
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
//   COMPLETE: L.ExtraMarkers.icon({

};
