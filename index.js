const width = 960;
const height = 600;

div = d3.select('#container');
mapLayer = div.append('svg').attr('id', 'map').attr('width', width).attr('height', height);
canvasLayer = div.append('canvas').attr('id', 'heatmap').attr('width', width).attr('height', height);

var canvas = canvasLayer.node(),
    context = canvas.getContext("2d");

// context.globalAlpha = 0.5;

var projection = d3.geoMercator().translate([width/2, height/2]),
    path = d3.geoPath(projection),
    airportMap;

d3.queue()
    .defer(d3.json, 'world-50m.json')
    .defer(d3.json, 'airports.json')
//    .defer(d3.csv, 'dests.csv')
    .defer(d3.csv, 'flexwatch.csv')
    .await(main);


function main(error, world, airports, dests) {
    console.log(airports)

    airports.forEach(d => { d.coords = projection([d.longitude, d.latitude]); })
    airportMap = d3.map(airports, d => d.id);

    var countries = topojson.feature(world, world.objects.countries).features;

    mapLayer
        .append('g')
        .classed('countries', true)
        .selectAll(".country")
          .data(countries)
        .enter()
          .append("path")
          .attr("class", "country")
          .attr("d", path);

    mapLayer
      .append('g')
      .classed('airports', true)
      .selectAll('.airport')
        .data(airports)
      .enter().append('circle')
        .attr('r', 1)
            .attr('cx', function(d) { return d.coords && d.coords[0]; })
            .attr('cy', function(d) { return d.coords && d.coords[1]; })

    var heat = simpleheat(canvas);

    // set data of [[x, y, value], ...] format
    heat.data(dests.map(d => {a = airportMap.get(d.destination); return [a.coords[0], a.coords[1], +d.watches]}));

    // set point radius and blur radius (25 and 15 by default)
    heat.radius(10, 10);

    // optionally customize gradient colors, e.g. below
    // (would be nicer if d3 color scale worked here)
    // heat.gradient({0: '#0000ff', 0.5: '#00ff00', 1: '#ff0000'});

    // set maximum for domain
    heat.max(d3.max(dests, d => +d.watches));

    // draw into canvas, with minimum opacity threshold
    heat.draw(0.05);
}