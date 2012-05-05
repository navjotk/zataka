function Game(canvas) {
	this.SCREEN_HEIGHT = 500;
	this.SCREEN_WIDTH = 500;
	this.players = new Array();
	this.renderer = new Renderer(canvas, this);
	this.colors = ['#f00', '#0f0', '#00f'];
	this.engine = new Engine(this);
}

Game.prototype.addPlayer = function() {
	if(this.players.length==this.colors.length) {
		return false;
	}
	var initial_location_velocity = this.engine.getRandomLocationAndVelocity();
	var color = this.colors[this.players.length];
	var player = new Player(color, this.renderer, initial_location_velocity[0], initial_location_velocity[1]);
	this.players.push(player);
	return true;
}
var game;

window.onload = function() {
	game = new Game(document.getElementById('canvas_container'));
	game.addPlayer();
	game.addPlayer();
	game.addPlayer();
}

function Position(x,y) {
	this.x = x;
	this.y = y;
}

function Velocity() {
}

Velocity.prototype.setPolar = function (mag, theta) {
	this.mag = mag;
	this.theta = theta;
	this.dy = this.mag * Math.sin (this.theta);
    this.dx = this.mag * Math.cos (this.theta);
}