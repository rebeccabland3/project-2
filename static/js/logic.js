// Creating map object
var basemapId = 'plant-map';
var basemapOptions = {center: [30, 5],
                      zoom: 2}
var myMap = L.map(basemapId, basemapOptions);

// Adding tile layer
// var tileLayerUrlTemplate = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
var tileLayerUrlTemplate = "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"

var tileLayerOptions = {attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
                        tileSize: 512,
                        maxZoom: 18,
                        zoomOffset: -1,
                        id: "light-v10",
                        accessToken: API_KEY}
L.tileLayer(tileLayerUrlTemplate, tileLayerOptions).addTo(myMap);

//create paths and variables
var distribution_url = "/api/distribution";
var distribution = d3.json(distribution_url)
var distributionData;
var choro;
var info;
var legend;

function buildMaps(level) {
    var geojsonPath = `/static/Distribution JSON/level${level}.geojson`;
    var geojsonLevel = d3.json(geojsonPath)
    var nameKey = `LEVEL${level}_NAM`;
    var codeKey = `LEVEL${level}_COD`;
    
    var allData = Promise.all([distribution, geojsonLevel])
    allData.then(function(response) {
    // L.geoJSON().clearLayers()
    distributionData = JSON.parse(response[0])
    geojsonData = response[1]

    geojsonData.features = geojsonData.features.map(feature => {
      var match = distributionData.filter(d => (d.tdwg_level == level)
                                            && (d.tdwg_code == feature.properties[codeKey]))[0];
      feature.properties.species_count = match.species_count;
      return feature});

    if (choro !== undefined) {
      choro.remove()
    };

    choro = L.choropleth(geojsonData, choroplethOptions)
    choro.addTo(myMap)

    if (legend !== undefined) {
      legend.remove()
    };

    //legend
    legend = L.control({ position: 'bottomright' })
    legend.onAdd = function (myMap) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = choro.options.limits
    var colors = choro.options.colors
    var labels = []

    // Add min & max
    div.innerHTML = '<div class="labels"><div class="min">Bounds ' + limits[0] + '</div> \
			<div class="max">' + limits[limits.length - 1] + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
  }
  legend.addTo(myMap)
    })

    // chloropleth specifications
    var choroplethOptions =  {valueProperty: "species_count",
                            scale: ["#f7fcf5", "#00441b"],
                            steps: 9,
                            mode: "q",
                            style: {color: "#fff",
                                    weight: 1,
                                    fillOpacity: 0.8},
                            onEachFeature: (feature, layer) => {
                              layer.on({
                                mouseover:(event) => {layer = event.target;
                                                      layer.setStyle({
                                                              weight: 5,
                                                              color: '#666',
                                                              dashArray: '',
                                                              fillOpacity: 0.9
                                                      })
                                                      info.update(layer.feature.properties);},
                              mouseout:(event) => {layer = event.target;
                                layer.setStyle({
                                        weight: 1,
                                        color: '#fff',
                                        dashArray: '',
                                        fillOpacity: 0.8
                                })
                                info.update()},
                              click: (event) => {myMap.fitBounds(event.target.getBounds())}
                              })
                              layer.bindPopup(`Region: ${feature.properties[nameKey]}
                                              <br>Plant Count (Biodiversity):
                                              <br>$${feature.properties.species_count}`)}}
    var legendOptions = {position: "bottomright"};

    if (info !== undefined) {
      info.remove()
    };

    //control legend
    info = L.control();

    info.onAdd = function (myMap) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
    };
    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
      this._div.innerHTML = '<h4>Global Plant Biodiversity</h4>' +  (props ?
          '<b>' + props[nameKey] + '</b><br />' + props.species_count
          : 'Hover over a region');
    };
    info.addTo(myMap);

}



//level selection change
buildMaps(1)
d3.selectAll("#selDataset").on("change", updateMap);
function updateMap() {
  var dropdownMenu = d3.select("#selDataset");
  var level = dropdownMenu.property("value");
  console.log(level)
  buildMaps(level)
};

//fungi map
function fungi_heatmap(){

  var fungiBasemapId = 'fungi-map'
  var fungiBasemapOptions = {center: [30, 5],
                        zoom: 2}
  var myFungiMap = L.map(fungiBasemapId, fungiBasemapOptions);

  var fungiTileLayerUrlTemplate = "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
  var fungiTileLayerOptions = {attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
                          maxZoom: 18,
                          id: "light-v10",
                          accessToken: API_KEY}
  L.tileLayer(fungiTileLayerUrlTemplate, fungiTileLayerOptions).addTo(myFungiMap);

  var jsonUrlEndpoint = "/api/fungi";

  d3.json(jsonUrlEndpoint).then(function(response) {
    response = JSON.parse(response)
    var heatmapCoordinates = response.map(fungi => {
      var longitude = fungi.Longitude;
      var latitude = fungi.Latitude;
        return [longitude, latitude]
    });

    var heatmapOptions = {radius: 20,
                          blur: 10}
    L.heatLayer(heatmapCoordinates, heatmapOptions).addTo(myFungiMap);
  });
};

fungi_heatmap();