function Game(canvas) {
	this.SCREEN_HEIGHT = 500;
	this.SCREEN_WIDTH = 500;
	this.players = new Array();
	this.renderer = new Renderer(canvas, this);
	this.colors = ['#f00', '#0f0', '#00f'];
	this.engine = new Engine();
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
}

function Position(x,y) {
	this.x = x;
	this.y = y;
}

function Velocity(dx,dy) {
	this.dx = dx;
	this.dy = dy;
}

function Engine() {
}

Engine.prototype.getRandomLocationAndVelocity = function() {
	var ret = new Array(new Position(100,100), new Velocity(1,1));
	return ret;
};