/*
Emi's Rocket Patrol (yeah I'm not great at names)
Code by: Emily Barnes
23 April 2021
Time spent overall: About 8 hours


POINTS BREAKDOWN
* Track a high score that persists across scenes and display it in the UI (5)
* Randomize each spaceship's movement direction at the start of each play (5)
* Create a new scrolling tile sprite for the background (5)
* Allow the player to control the Rocket after it's fired (5)

* Create 4 new explosion SFX and randomize which one plays on impact (10)
* Create a new animated sprite for the Spaceship enemies (10)

* Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
* Implement an alternating two-player mode (20)
* Create and implement a new weapon (w/ new behavior and graphics) (20)

*Total (5*4)+(2*10)+(3*20) = 100 points
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Player]
}
//test
let game = new Phaser.Game(config);

//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyG, keyH;

//local high score
let highScore = 0;

//active player def
let activePlayer=1;

//UI
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;