function Game(canvas, timerCanvas) {
	this.SCREEN_HEIGHT = 500;
	this.SCREEN_WIDTH = 500;
	this.PLAYER_SPEED = 0.1;
	this.TIMER_INTERVAL = 500;
	this.THETA_MOVE = 0.05;
	this.players = new Array();
	this.renderer = new Renderer(canvas, this);
	this.colors = ['#f00', '#0f0', '#00f'];
	this.keyMappings = [[37,39]];
	this.keyCodes = {};
	this.engine = new Engine(this);
	this.countdownTime = 3;
	this.timerCanvas = timerCanvas;
	timerCanvas.innerHTML = "Starting";
	window.setTimeout("game.countdownTick()", 1000 );
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

Game.prototype.countdownTick = function() {
	if(this.countdownTime<1) {
		this.timerCanvas.innerHTML = "";
		this.start();
		return;
	}
	this.timerCanvas.innerHTML = this.countdownTime+ " seconds to go";
	this.countdownTime--;
	window.setTimeout("game.countdownTick()", 1000);
}

Game.prototype.initializeKeyCodes = function() {
	for(i=0;i<this.keyMappings.length;i++) {
		var keyCode = {};
		keyCode.action = -1;
		keyCode.player = i;
		this.keyCodes[this.keyMappings[i][0]] = keyCode;
		var keyCode = {};
		keyCode.action = 1;
		keyCode.player = i;
		this.keyCodes[this.keyMappings[i][1]] = keyCode;
	}
}

Game.prototype.keyDown = function(event) {
	console.log(event.keyCode);
	if(this.keyCodes[event.keyCode]!=undefined) {
		console.log(this.keyCodes[event.keyCode]);
		var code = this.keyCodes[event.keyCode];
		console.log(code);
		var player = this.players[code.player];
		player.setInput(code.action);
	}
	
}
Game.prototype.start = function() {
	window.setTimeout("game.tick()", this.TIMER_INTERVAL);
	window.onkeydown = function(event) {
		game.keyDown(event);
	}
	game.initializeKeyCodes();
}

Game.prototype.tick = function() {
	//Game tick
	this.engine.process(this.players);
	window.setTimeout("game.tick()", this.TIMER_INTERVAL);
}

var game;

window.onload = function() {
	window.game = new Game(document.getElementById('canvas_container'), document.getElementById('timer_container'));
	game.addPlayer();
	game.addPlayer();
	game.addPlayer();
	
}

function Position(x, y) {
	this.x = x;
	this.y = y;
	this.changeListener = null;
}

Position.prototype.setPosition = function (x,y) {
    this.x = x;
	this.y = y;
	if(this.changeListener!=null) {
		this.changeListener(this.x, this.y);
	}
}

Position.prototype.setListener = function(listener) {
	this.changeListener = listener;
}

function Velocity() {
}

Velocity.prototype.setPolar = function (mag, theta) {
	this.mag = mag;
	this.theta = theta;
	this.dy = this.mag * Math.sin (this.theta);
    this.dx = this.mag * Math.cos (this.theta);
}
