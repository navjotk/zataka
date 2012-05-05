function Player(color, renderer, initial_position, initial_velocity, game) {
	this.color = color;
	this.renderer = renderer;
	this.renderer.drawDot(initial_position.x, initial_position.y, this.color);
	this.position = initial_position;
	this.velocity = initial_velocity;
	this.input = 0;
	this.isAlive = true;
	this.positionHistory = new Array();
	this.game = game;
	var theObj = this;
	this.position.setListener(function(x,y) {theObj.handlePositionChanged(x,y);});
}

Player.prototype.moveBy = function(diff_x, diff_y) {
	this.renderer.drawMove(this.position.x, this.position.y, diff_x, diff_y, this.color);
};

Player.prototype.setInput = function(input) {
	this.input = input;
};

Player.prototype.handlePositionChanged = function(x,y) {
	var diff_x = x - this.position.x;
	var diff_y = y - this.position.y;
	this.moveBy(diff_x, diff_y);
};

Player.prototype.kill = function() {
	this.isAlive = false;
	this.game.activePlayerCount--;
};