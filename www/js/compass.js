/* global d3, module, window */
var compass = (function() {
    'use strict';

    var data = {
        length: 30,
        color: '#ff0000',
        heading: 0,
        dy: 0,
        dx: 0
    };

    function scale(svg) {
        // TODO: Figure out how to make this work on webkit and remove dx/dy
        /* jshint unused: false */
        /*
        var chart = d3.select('.compass-container'),
            width = chart.style('width').replace('px', ''),
            height = chart.style('height').replace('px', '');

        svg.attr('transform', 'translate(' + width /2 + ',' + height / 2+ ')');
        */
    }


    var svg = d3.select('.compass-container')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox','0 0 100 100')
        .attr('transform', 'translate(100, 100)')
        .attr('preserveAspectRatio','xMinYMin');

    scale(svg);
    d3.select(window).on('resize', function() {
        scale(svg);
    });

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

        line.transition().attr('transform', function(d) { return 'rotate(' + d.heading + ', 0,0)';});

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
            .attr('x', function(d) { return d.dx; })
            .attr('y', function(d) { return d.dy + data.length * 1.3;});

        headingText.text(function(d) { return d.heading.toFixed(2); });
        headingText.exit().remove();

        var updateText = svg.selectAll('#update').data([data]);
        updateText.enter()
            .append('text')
            .attr('id', 'update')
            .style('text-anchor', 'middle')
            .attr('font-size', '0.3em')
            .attr('x', function(d) { return d.dx; })
            .attr('y', function(d) { return d.dy + 5 + data.length * 1.4;});

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