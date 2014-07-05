var compass = (function() {

    var svg = d3.select("body")
        .append("svg")
        .attr("width", "200px")
        .attr("height", "200px");

    svg.append("line")
        .attr("id", "compass")
        .attr("x1", 100)
        .attr("y1", 100)
        .attr("x2", 100)
        .attr("y2", 0)
        .attr("stroke-width", 2)
        .attr("stroke", "black");


    function setHeading(angleDegrees) {
        svg.select("#compass")
            .attr("x2", 100 + Math.sin(angleDegrees * Math.PI / 180) * 100)
            .attr("y2", 100 - Math.cos(angleDegrees * Math.PI / 180) * 100);
    }

    return {
        setHeading: setHeading
    }
})();

