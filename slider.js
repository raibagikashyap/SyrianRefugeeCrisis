



// var height = 30;
// var width = 1000;
//
// var margin = {
//   top: 5,
//   bottom: 5,
//   left: 50,
//   right: 50
// };
//
// var svg = d3.select("#slider")
//   .append("svg")
//   .attr('width', width)
//   .attr('height', height)
//
// var slider = svg.append('g')
//   .attr('class', 'slider')
//   .attr('transform', 'translate('+ margin.left +','+ margin.top +')');
//
//
// width = width - margin.left - margin.right;
// height = height - margin.top -margin.bottom;
//
// var x = d3.scaleLinear()
//   .range([0, width])
//   .domain([2006,2015])
//   .clamp(true);
//
// slider.append("line")
//   .attr('class','track-overlay')
//   .attr("x1", x.range()[0])
//   .attr("x2", x.range()[1])
//   .attr('step', '1')
//   .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
//     .attr("class", "track-inset")
//   .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
//     .attr("class", "track-overlay")
//     .call(d3.drag()
//         .on("start.interrupt", function() { slider.interrupt(); })
//         .on("start drag", function() { hue(x.invert(d3.event.x)); }));
//         .on("input", function input() {
// 					update();
// 				});
//
// slider.insert("g", ".track-overlay")
//     .attr("class", "ticks")
//     .attr("transform", "translate(0, 15)")
//   .selectAll("text")
//   .data(x.ticks(10))
//   .enter().append("text")
//     .attr("x", x)
//     .attr("text-anchor", "middle")
//     .text(function(d) { return d; });
//
//     var handle = slider.insert("circle", ".track-overlay")
//         .attr("class", "handle")
//         .attr("r", 9);
//
//     slider.transition() // Gratuitous intro!
//         .duration(750)
//         .tween("hue", function() {
//           var i = d3.interpolate(0, 70);
//           return function(t) { hue(i(t)); };
//         });
//
//     function hue(h) {
//       handle.attr("cx", x(h));
//     }
//
//     function update(){
//       console.log('hello');
//     }
