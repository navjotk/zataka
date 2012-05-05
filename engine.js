function Engine (players, game) {
  this.players = players;
  this.game = game
}

Engine.prototype.getRandomLocationAndVelocity () {
  position = new Position();
  position.x = Math.round (Math.random () * this.game.SCREEN_WIDTH);
  position.y = Math.round (Math.random () * this.game.SCREEN_HEIGHT);
  
  velocity = new Velocity();
  theta = Math.random () * Math.PI * 2;
  velocity.dy = this.game.PLAYER_SPEED * Math.sin (theta);
  velocity.dx = this.game.PLAYER_SPEED * Math.cos (theta);
  
  locationAndVelocity = new Array();
  locationAndVelocity[0] = position;
  locationAndVelocity[1] = velocity;
  return locationAndVelocity;
)

/*Engine.prototype.process = function(players, maze) {
  for (player in players) {
	updateState (player);
	updateHistory (positions, positionsHistory);
	getCollisions (positions, positionHistory, maze);
}

Engine.prototype.getCollisions = function(positionHistory, isAlive, maze) {
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
		
Engine.prototype.updateHistory = function(positions, positionHistory) {
  positionHistory.add (positions);
}

Engine.prototype.updateState = function(positions, inputs) {
  if (positions.size() != inputs.size())
    return -1;
  
  for (i=0; i<positions.size(); ++i) {
    position = positions[i];
    x = position.getX();
    y = position.getY();
    dx = position.getDx();
    dy = position.getDy();
    in = input[i];
    switch(in.which) {
      //left
      case 37:
        turn = -1;
        break;
      //right
      case 39:
        turn = 1;
    }
	
	dx
	
	position.setX ( x+dx+ddx );
	position.setY ( y+dy+ddy );
	position.setDx ( dx
  }
}
*/