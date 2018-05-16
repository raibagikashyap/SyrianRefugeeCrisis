(function stackedbar() {

  var width = 350;
  var height = 600;

  var index_to_year = {
    2006: 0,
    2007: 1,
    2008: 2,
    2009: 3,
    2010: 4,
    2011: 5,
    2012: 6,
    2013: 7,
    2014: 8,
    2015: 9
  }

  var margin = {
    top: 20,
    bottom: 20,
    right: 200,
    left: 80
  };

  var svg = d3.select("#application")
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  var g = svg.append("g")
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  width = width - margin.left - margin.right;
  height = height - margin.top - margin.bottom;

  var y_scale = d3.scaleLinear()
    .range([0, height]);

  var color_scale = d3.scaleOrdinal()
    .range(['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061']);

  var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 100]);

  function make_y_gridlines() {
    return d3.axisLeft(y);
  }

  d3.csv("refugeestatus1.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
      d['Total pending start-year'] = +d['Total pending start-year'].split(",").join("");
      d['Of which UNHCR-assisted'] = +d['Of which UNHCR-assisted'].split(",").join("");
      d['Applied during year'] = +d['Applied during year'].split(",").join("");
      d['Decision Recognized'] = +d['Decision Recognized'].split(",").join("");
      d['Decisions Other'] = +d['Decisions Other'].split(",").join("");
      d['Rejected'] = +d['Rejected'].split(",").join("");
      d['Otherwise closed'] = +d['Otherwise closed'].split(",").join("");
      d['Total Decisions'] = +d['Total Decisions'].split(",").join("");
      d['Total Pending End-year'] = +d['Total Pending End-year'].split(",").join("");
      d['Of which UNHCR-assisted2'] = +d['Of which UNHCR-assisted2'].split(",").join("");
    });

    svg.append("g")
      .attr("class", "grid")
      .call(make_y_gridlines()
        .ticks(10)
        .tickSize(-150)
        .tickFormat(d => d + "%")
      )
      .style("stroke-dasharray", "2 2")
      .attr('transform', 'translate(30,20)');

    function update(p) {

      var categories = data.columns.slice(1);

      var t = d3.transition()
        .duration(1000)

      var total = data[p]['Total pending start-year'] +
        data[p]['Of which UNHCR-assisted'] +
        data[p]['Applied during year'] +
        data[p]['Decision Recognized'] +
        data[p]['Decisions Other'] +
        data[p]['Rejected'] +
        data[p]['Otherwise closed'] +
        data[p]['Total Decisions'] +
        data[p]['Total Pending End-year'] +
        data[p]['Of which UNHCR-assisted2'];
      
      y_scale.domain([0, total]);

      var filtered_data = [
        data[p]['Total pending start-year'],
        data[p]['Of which UNHCR-assisted'],
        data[p]['Applied during year'],
        data[p]['Decision Recognized'],
        data[p]['Decisions Other'],
        data[p]['Rejected'],
        data[p]['Otherwise closed'],
        data[p]['Total Decisions'],
        data[p]['Total Pending End-year'],
        data[p]['Of which UNHCR-assisted2']
      ];

      y_lengths = [
        y_scale(filtered_data[0]),
        y_scale(filtered_data[1]),
        y_scale(filtered_data[2]),
        y_scale(filtered_data[3]),
        y_scale(filtered_data[4]),
        y_scale(filtered_data[5]),
        y_scale(filtered_data[6]),
        y_scale(filtered_data[7]),
        y_scale(filtered_data[8]),
        y_scale(filtered_data[9])
      ];

      var bars = g.selectAll()
        .data(filtered_data)

      bars
        .exit()
        .remove()

      var new_bars = bars
        .enter()
        .append('rect');

      new_bars.merge(bars)
        .attr('y', function(d, i) {
          var x = 0
          for (var j = 0; j < i; j++) {
            x += y_scale(filtered_data[j]);
          }
          return x;
        })
        .attr('height', function(d) {
          return y_scale(d)
        })
        .attr('width', 100)
        .attr('fill', function(d) {
          return color_scale(d);
        })
        .attr('stroke', '#000');

      //Get the labels -----------------------
      var labels = g.selectAll(".label")
        .data(categories)

      labels
        .exit()
        .remove();

      var new_labels = labels
        .enter()
        .append("text")
        .attr('class', 'label');

      new_labels.merge(labels)
        .attr('x', '110')
        .attr('y', function(d, i) {
          var x = 0
          for (var j = 0; j < i; j++) {
            x += y_scale(filtered_data[j]);
          }
          return x + y_lengths[i] / 2 + 5;
        })
        .text(function(d) {
          return d
        })
        .style('font-size', '12px');

    }

    var slider = document.getElementById("year")
    slider.addEventListener("change", function() {
      var slider_x = document.getElementById('year').value;
      document.getElementById('slidervalue').innerHTML = slider_x;
      var year = index_to_year[slider_x];
      update(year)
    })
    update(0)

  });
})();
