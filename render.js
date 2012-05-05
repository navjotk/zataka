var paper;
var point_width = 3;
var point_fill_color = '#9cf';

function Renderer(canvas, game) {
	this.paper = new Raphael(canvas, game.SCREEN_WIDTH, game.SCREEN_HEIGHT);
	this.point_width = 3;
	this.game = game;
}

Renderer.prototype.drawDot = function(x,y,color) {
	console.log(x);
	console.log(y);
	console.log(color);
	var point = this.paper.circle(x,y,point_width);
	point.attr({fill: color, stroke: color});
};

Renderer.prototype.drawMove = function(curr_x, curr_y, move_x, move_y) {
	var line = this.paper.path("M "+curr_x+" "+curr_y+" l "+move_x+" "+move_y);
	line.attr({stroke: point_fill_color, 'stroke-width': point_width});
};

