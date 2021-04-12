class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
//assets
    preload(){
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield", "./assets/starfield.png")
    }

    create() {
       //Green
       this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize*2,0x00FF00).setOrigin(0,0);
       //White Border
       this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
       this.add.rectangle(0, game.config.height-borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
       this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
       this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
       //scrolling stars
       this.starfield = this.add.tileSprite(0,0,640, 480, "starfield").setOrigin(0,0);
       //rocket
       this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height-borderUISize, "rocket").setOrigin(0.5,0);
       //controls
       keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
       keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update(){
        this.starfield.tilePositionX -=4;
        
    }
}