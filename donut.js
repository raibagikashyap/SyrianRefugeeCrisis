(function donut() {


  var margin = {
      top: 20,
      right: 100,
      bottom: 20,
      left: 20
    },
    width = 400,
    height = 400,
    radius = 150;

  var arc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 80)

  var svg = d3.select('#PopTypeVis')
    .append('svg')
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 3.2 + "," + height / 3.2 + ")");

  width = width - margin.left - margin.right;
  height = height - margin.top - margin.bottom;

  var color = d3.scaleOrdinal()
    .range(['#b2182b',	'#ef8a62',	'#fddbc7',	'#f7f7f7',	'#d1e5f0',	'#67a9cf',	'#2166ac']);

  d3.csv("refugeetype.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
        d['2006'] = +d['2006'],
        d['2007'] = +d['2007'],
        d['2008'] = +d['2008'],
        d['2009'] = +d['2009'],
        d['2010'] = +d['2010'],
        d['2011'] = +d['2011'],
        d['2012'] = +d['2012'],
        d['2013'] = +d['2013'],
        d['2014'] = +d['2014'],
        d['2015'] = +d['2015']
    });

    function update(p) {

      var pie = d3.pie()
        .sort(null)
        .value(function(d) {
          return d[p];
        });

      var refugee_types = data.map(function(d) {
        return d.RefugeeType;
      })

      color.domain(refugee_types);

      var g = svg.selectAll(".arc")
        .data(pie(data))

      var new_g = g
        .enter()
        .append("g")
        .attr("class", "arc");

      new_g.append('path');

      new_g.merge(g)
          .select('path')
          .attr("d", arc)
          .attr('fill', function(d) {
            return color(d.data.RefugeeType)
          });

      //Add a legend
      var legend = svg.selectAll(".legend")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("transform", function(d, i) {
          return "translate(" + (width - 160) + "," + (i * 15 + 20) + ")"; // place each legend on the right and bump each one down 15 pixels
        })
        .attr("class", "legend");

      legend.append("rect") // make a matching color rect
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", function(d, i) {
          return color(i);
        });

      legend.append("text") // add the text
        .text(function(d) {
          return d.data.RefugeeType;
        })
        .style("font-size", 12)
        .attr("y", 10)
        .attr("x", 11);


    }
    var slider = document.getElementById("year")
    slider.addEventListener("change", function() {
      var slider_x = document.getElementById('year').value;
      document.getElementById('slidervalue').innerHTML = slider_x;
      update(slider_x);
    })
    update("2006");
  });
})();
