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