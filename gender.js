(function gender() {

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

  d3.csv("genderdata.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
      d['Female'] = +d['Female'].split(",").join("");
      d['Male'] = +d['Male'].split(",").join("");
    });

    function update(p) {
      document.getElementById("icons").innerHTML="";

      var m = data[p]['Female'];
      var f = data[p]['Male'];

      var icons = d3.select('.icons')

      icons.exit()
        .remove()

      var m_rows = Math.floor(m / 10);
      var f_rows = Math.floor(f / 10);

      var m_remainder = m % 10;
      var f_remainder = f % 10;

      for (var i = 0; i < m_rows; i++) {
        var row = icons.append('div')
          .attr('class', 'row male')
        for (var j = 0; j < 10; j++) {
          row.append('i')
            .attr('class', 'fas fa-male');
        }
      }
      if (m_remainder > 0 && f_remainder > 0) {
        var row = icons.append('div')
          .attr('class', 'row male female')
        for (var j = 0; j < m_remainder; j++) {
          row.append('i')
            .attr('class', 'fas fa-male');
        }
        for (var j = 0; j < f_remainder; j++) {
          row.append('i')
            .attr('class', 'fas fa-female');
        }
      }

      for (var i = 0; i < f_rows; i++) {
        var row = icons.append('div')
          .attr('class', 'row female')
        for (var j = 0; j < 10; j++) {
          row.append('i')
            .attr('class', 'fas fa-female');
        }
      }

    }

    var slider = document.getElementById("year")
    slider.addEventListener("change", function() {
      var slider_x = document.getElementById('year').value;
      document.getElementById('slidervalue').innerHTML = slider_x;
      var year = index_to_year[slider_x];
      update(year)
    })
    update(0)
  })
})();
