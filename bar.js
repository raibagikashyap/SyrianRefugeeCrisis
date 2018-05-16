(function bar() {

  // Declaration of all the variables
  var width = 430;
  var height = 300;

  var y_labels = ['0 to 4', '5 to 11', '12 to 17', '18 to 59', '60+'];

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
    bottom: 50,
    right: 20,
    left: 50
  };

  var svg = d3.select("#vis")
    .append("svg")
    .attr('width', width)
    .attr('height', height)

  var g = svg.append("g")
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  width = width - margin.left - margin.right;
  height = height - margin.top - margin.bottom;

  var x_scale = d3.scaleLinear()
    .range([0, width])
    .domain([1, 85000]);

  var y_scale = d3.scaleBand()
    .range([0, height])
    .domain([0, 1, 2, 3, 4])
    .paddingInner(0.1);

  //var y_axis = d3.axisLeft(y_scale);

  var x_axis = d3.axisBottom(x_scale)
    .tickFormat(function(d) {
      if ((d / 1000) >= 1) {
        d = d / 1000 + "K";
      }
      return d;
    });

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(5,' + (height + 20) + ')');

  // ------------------------- UPDATE function to update the bar chart--------------------------------
  d3.csv("agedata.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
      d['0 to 4'] = +d['0 to 4'].split(",").join("");
      d['5 to 11'] = +d['5 to 11'].split(",").join("");
      d['12 to 17'] = +d['12 to 17'].split(",").join("");
      d['18 to 59'] = +d['18 to 59'].split(",").join("");
      d['60+'] = +d['60+'].split(",").join("");
    });

    function update(p) {

      y_label = [data.columns[1],
        data.columns[2],
        data.columns[3],
        data.columns[4],
        data.columns[5]
      ];


      d = [ data[p]['0 to 4'],
            data[p]['5 to 11'],
            data[p]['12 to 17'],
            data[p]['18 to 59'],
            data[p]['60+']
          ];

      var t = d3.transition()
        .duration(1000)
      // Start drawing -----------------------------------------------------------
      // Get the bars ----------------------
      var bars = g.selectAll(".bar")
        .data(d);

      bars
        .exit()
        .remove();

      var new_bars = bars
        .enter()
        .append('rect')
        .attr('class', 'bar');

      new_bars.merge(bars)
        .transition(t)
        .attr("height", y_scale.bandwidth())
        .attr("width", function(d, i) {
          return x_scale(d) + 'px';
        })
        .attr("y", function(d, i) {
          return y_scale(i);
        })
        .attr("fill", "#67a9cf");


      // Get the labels -----------------------
      var format = d3.format(',');

      var labels = g.selectAll(".label")
        .data(d)

      labels
        .exit()
        .remove();

      var new_labels = labels
        .enter()
        .append("text")
        .attr('class', 'label');

      new_labels.merge(labels)
        .transition(t)
        .attr('x', function(d, i) {
          return x_scale(d) + 5;
        })
        .attr('y', function(d, i) {
          return y_scale(i) + 25;
        })
        .text(function(d) {
          return format(d);
        })
        .style('font-size', '12px');

      // Get the axis --------------------
      g.append('g')
        .call(x_axis)
        .attr('transform', 'translate(0 ,' + (height + 5) + ')');;

      // Get the Y axis labels --------------------
      var y_label = svg.selectAll('.ylabel')
        .data(y_label);

      y_label.exit()
        .remove();

      new_y_label = y_label
        .enter()
        .append('text')
        .attr('class', 'ylabel')
        .attr('transform', 'translate(5, 30)')

      new_y_label.merge(y_label)
        .attr('x', '0')
        .attr('y', function(d, i) {
          return y_scale(i) + 20
        })
        .text(function(d) {
          return d;
        })
        .style('font-size', '12px');

      // Get the axis names of the Graph
      var xname = 'Number of Refugees';

      var xaxis_name = svg.selectAll('.xaxis_name')
        .data(xname)

      xaxis_name
        .enter()
        .append('text')
        .attr('class', 'xaxis_name')
        .text(xname)
        .attr('transform', 'translate(' + (width / 2) + ',' + (height + 60) + ')')

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
