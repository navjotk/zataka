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

Engine.prototype.process = function(players) {
  for (player in players) {
	updateState (player);
  //getCollisions (players);
  }
}

Engine.prototype.updateState = function(player) {
  var turn = 0;
  
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

/*
Engine.prototype.getCollisions = function(players) {
  curentPositions = positionHistory[positionHistory.size()-1];
  
  //Process collisions for each player's current position
  for (i=0; n<currentPositions.size(); ++i) {
    if (!isAlive[i])
	  continue;
    position = currentPositions[i];
	
	//Get current position
    x = position.getX();
    y = position.getY();
	
	//Get maze collisions
	for (m=0; m<maze.size(); ++m) {
	  mazeX = maze.getX();
	  mazeY = maze.getY();
	  if (x == mazeX && y == mazeY) {
	    isAlive[i] = false;
		break;
	  }
	}

	//Get other player collisions
	for (j=0; j<currentPositions.size(); ++j) {
	  if (!isAlive[i])
	    break;
	  if (i==j || !isAlive[j])
	    continue;
	  for (k=0; k<positionHistor.size(); ++k) {
	    opponentPosition = positionHistory[k][j];
		ox = opponentPosition.getX();
		oy = opponentPosition.getY();
		// Collided with opponent?
		if (x == ox && y == oy) {
		  isAlive[i] = false;
		  break;
		}
	  }
	}
  }
}
		
*/