var paper;
var point_width = 3;
var point_fill_color = '#9cf';

function render() {
}

function drawDot(x,y) {
	var point = paper.circle(x,y,point_width);
	point.attr({fill: point_fill_color, stroke: point_fill_color});
}
window.onload = function() {
    paper = new Raphael(document.getElementById('canvas_container'), 500, 500);
    drawDot(100,100);
}