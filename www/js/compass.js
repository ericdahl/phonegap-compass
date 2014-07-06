/* global d3, module */
var compass = (function() {
    'use strict';

    var data = {
        length: 30,
        color: '#ff0000',
        heading: 0
    };

    var svg = d3.select('.compass-container')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox','0 0 100 100')
        .append('g')
            .attr('transform', 'translate(50, 50)');

    svg.append('g')
        .attr('opacity', 30).append('rect')
            .attr('x', -50)
            .attr('y', -50)
            .attr('fill', 'yellow')
            .attr('width', 100)
            .attr('height', 100);

    function setHeading(angleDegrees) {
        data.heading = angleDegrees;

        var line = svg.selectAll('line').data([data]);

        line.enter()
            .append('line')
            .attr('id', 'compass')
            .attr('x1', 0)
            .attr('y1', function(d) { return d.length / 2; })
            .attr('x2', 0)
            .attr('y2', function(d) { return -d.length / 2; })
            .attr('stroke', function(d) { return d.color; });

        line.transition().attr('transform', function(d) { return 'rotate(' + -d.heading + ', 0,0)';});

        line.exit().remove();

        svg.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 2);

        var headingText = svg.selectAll('#heading').data([data]);
        headingText.enter()
            .append('text')
            .attr('id', 'heading')
            .style('text-anchor', 'middle')
            .attr('font-size', '0.3em')
            .attr('x', 0)
            .attr('y', 40);

        headingText.text(function(d) { return d.heading.toFixed(2) + '\u00b0'; });
        headingText.exit().remove();

        var updateText = svg.selectAll('#update').data([data]);
        updateText.enter()
            .append('text')
            .attr('id', 'update')
            .style('text-anchor', 'middle')
            .attr('font-size', '0.3em')
            .attr('x', 0)
            .attr('y', 45);

        updateText.text(function() { return new Date().toLocaleTimeString(); });
        updateText.exit().remove();
    }

    setHeading(0);

    return {
        setHeading: setHeading
    };
})();

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = compass;
}