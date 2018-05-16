(function mainfigure() {

  var margin = {
      top: 50,
      right: 20,
      bottom: 30,
      left: 50
    },
    width = 350 - margin.left - margin.right,
    height = 275 - margin.top - margin.bottom;

  var parseTime = d3.timeParse("%Y");

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

  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  var valueline = d3.line()
    .x(function(d) {
      return x(d.Year);
    })
    .y(function(d) {
      return y(d.Refugees);
    });

  var svg = d3.select("#mainfigure").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Inserting a subtitle
  var title = svg.append('text')
    .attr('class', 'title');

  d3.csv("mainfigure.csv", function(error, data) {
    if (error) throw error;


    data.forEach(function(d) {
      d.Year = parseTime(d.Year);
      d.Refugees = +d.Refugees;
    });

    x.domain(d3.extent(data, function(d) {
      return d.Year;
    }));
    y.domain([0, d3.max(data, function(d) {
      return d.Refugees;
    })])

    var y_axis = d3.axisLeft(y)
      .tickFormat(function(d) {
        if ((d / 1000000) >= 1) {
          d = d / 1000000 + "M";
        }
        return d;
      });

    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(y_axis)

    function update(p) {

      var yr = [ data[p].Year, data[p].Refugees ];

      var t = d3.transition()
        .duration(1000)

      var marker = svg.selectAll('.circle')
        .data(yr);

      marker
        .exit()
        .remove();

      var new_marker = marker
        .enter()
        .append('circle')
        .attr('class', 'circle')

      new_marker.merge(marker)
      .transition(t)
      .attr('cx', function(d) { return x(yr[0] )})
      .attr('cy', function(d) { return y(yr[1] )})
      .attr('r', 5)
      .attr('fill', '#4393c3');

      var format = d3.format(',');
      var ref = format(data[p].Refugees);

      svg.selectAll('.title')
        .text(ref)
        .attr('transform', 'translate(30,10)');
    }


    var slider = document.getElementById("year")
    slider.addEventListener("change", function() {
      var slider_x = document.getElementById('year').value;
      document.getElementById('slidervalue').innerHTML = slider_x;
      var ind = index_to_year[slider_x];
      update(ind)
    })
    update(0)
  });
})();
