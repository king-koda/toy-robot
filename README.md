# toy-robot

Description:
As part of an interview assessment, this application is required to move a toy robot along a 5x5 grid in the direction specified from the location it is initially placed. Rotating the toy robot and proceeding in the new direction, as well as the ability to report the current location and facing direction of the toy robot should also be possible and output to the CLI upon request.

Installation Instructions:

- clone the repo
- ensure Node and NPM are installed on the computer first
- run the command "npm i" within the root directory
- run the command "npm run start" to start the application

Toy Robot Commands:

- to place the robot, the format is "PLACE X,Y,DIRECTION", supporting directions NORTH,EAST,SOUTH,WEST, and the X,Y coordinates 0,0 -> 4,4
- to move the robot, the format is "MOVE"
- to change the direction of the robot, the format is "ROTATEDIRECTION", supporting directions LEFT,RIGHT
- to report the location of the robot, the format is "REPORT"

Constraints:

- the robot should never move out of bounds
- invalid commands should be handled
