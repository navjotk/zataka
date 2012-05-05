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
  console.log('called');
  //Get turn
  turn = player.input * this.game.THETA_MOVE;
  
  //Update velocity first
  mag = player.velocity.mag;
  theta = player.velocity.theta + turn;
  player.velocity.setPolar (mag,theta);
  
  //Update position
  x = player.position.x + velocity.dx;
  y = player.position.y + velocity.dy;
  player.position.setPosition (x, y);
  
  //Update position history
  player.positionHistory.push (new position(x,y));
  
  //Reset the input
  player.setInput (0);
}

Engine.prototype.getCollisions = function(players) {
  //Process collisions for each player's current position
  for (player in players) {
    if (!player.isAlive)
	  continue;

	//Get other player collisions
	for (otherPlayer in players) {
	  if (!player.isAlive)
	    break;
	  if (!otherPlayer.isAlive || otherPlayer == player)
	    continue;
	  for (otherPosition in otherPlayer.positionHistory)
		// Collided with opponent?
		if (player.position.x == otherPosition.x && player.position.y == otherPosition.y) {
		  player.isAlive = false;
		  break;
		}
	}
  }
}


Engine.prototype.process = function(players) {
  for (player in players) {
    if (player.isAlive)
	  this.updateState (player);
  	this.getCollisions (players);
  }
}