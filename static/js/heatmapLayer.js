
function fungi_heatmap(){

  var basemapId = 'map'
  var basemapOptions = {center: [6, 45],
                        zoom: 3}
  var myMap = L.map(basemapId, basemapOptions);

  var tileLayerUrlTemplate = "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
  var tileLayerOptions = {attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
                          maxZoom: 18,
                          id: "light-v10",
                          accessToken: API_KEY}
  L.tileLayer(tileLayerUrlTemplate, tileLayerOptions).addTo(myMap);

  var jsonUrlEndpoint = "/api/fungi";


  d3.json(jsonUrlEndpoint).then(function(response) {
    response = JSON.parse(response)
    var heatmapCoordinates = response.map(fungi => {
      var longitude = fungi.Longitude;
      var latitude = fungi.Latitude;
        return [longitude, latitude]
    });

    var heatmapOptions = {radius: 20,
                          blur: 35}

    L.heatLayer(heatmapCoordinates, heatmapOptions).addTo(myMap);
    
  });
}