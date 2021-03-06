function Engine(game) {
  this.game = game;
}

Engine.prototype.getRandomLocationAndVelocity = function() {
  position = new Position();
  position.x = (this.game.SCREEN_WIDTH * 0.2) + (Math.random () * this.game.SCREEN_WIDTH * 0.6);
  position.y = (this.game.SCREEN_HEIGHT * 0.2) + (Math.random () * this.game.SCREEN_HEIGHT * 0.6);
  
  velocity = new Velocity();
  mag = this.game.PLAYER_SPEED;
  theta = Math.random () * Math.PI * 2;
  velocity.setPolar (mag,theta);
  
  locationAndVelocity = new Array();
  locationAndVelocity[0] = position;
  locationAndVelocity[1] = velocity;
  return locationAndVelocity;
};

Engine.prototype.updateState = function(player) {
  var turn = 0;
  //Get turn
  turn = player.input * this.game.THETA_MOVE;
  //Update velocity first
  mag = player.velocity.mag;
  theta = player.velocity.theta + turn;
  player.velocity.setPolar (mag,theta);
  
  //Update position
  x = player.position.x + player.velocity.dx;
  y = player.position.y + player.velocity.dy;
  player.position.setPosition (x, y);
  
  //Add position to history
  player.positionHistory.push (new Position(x,y));
  
  //Reset the input
  player.setInput (0);
}

Engine.prototype.inViscinity = function (point1, point2) {
  return ((((point1.x - point2.x)*(point1.x - point2.x)) + ((point1.y - point2.y)*(point1.y - point2.y))) < 49);
}

Engine.prototype.getCollisions = function(players) {
  //Process collisions for each player's current position
  for (player in players) {
  	var player = players[player];
    if (!player.isAlive)
	  continue;
	if (player.position.x < 1 || player.position.x > game.SCREEN_WIDTH ||
			player.position.y < 1 || player.position.y > game.SCREEN_HEIGHT) {
		player.kill();
		continue;
	}

	//Get other player collisions
	for (otherPlayer in players) {
		var otherPlayer = players[otherPlayer];
	  if (!player.isAlive)
	    break;
	  var otherPositionHistory = otherPlayer.positionHistory;
	  for (otherPosition in otherPositionHistory) {
			if (player == otherPlayer && otherPosition > (otherPositionHistory.length-(8*(Math.round((1.4/game.PLAYER_SPEED))))))
				continue;
			// Collided with opponent?
			var otherPosition = otherPositionHistory[otherPosition];
			if (this.inViscinity (player.position, otherPosition)) {
			  console.log('Death!');
			  player.kill();
			  break;
			}
		}
	}
  }
}


Engine.prototype.process = function(players) {
  for (player in players) {
  	var player = players[player];
    if (player.isAlive)
	  this.updateState (player);
  	this.getCollisions (players);
  }
}
