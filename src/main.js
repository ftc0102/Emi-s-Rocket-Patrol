let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play]
}
//test
let game = new Phaser.Game(config);

//UI
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;