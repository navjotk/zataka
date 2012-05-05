function Player(color, renderer, initial_position, initial_velocity) {
	this.color = color;
	this.renderer = renderer;
	this.renderer.drawDot(initial_position.x, initial_position.y, this.color);
	this.position = initial_position;
	this.velocity = initial_velocity;
	this.input = 0;
}

Player.prototype.moveBy = function(diff_x, diff_y) {
	this.renderer.drawMove(this.position.x, this.position.y, diff_x, diff_y);
}

Player.prototype.setInput = function(input) {
	this.input = input;
}