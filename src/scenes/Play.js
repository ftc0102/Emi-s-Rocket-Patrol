class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
//assets
    preload(){
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield", "./assets/starfield.png");
        this.load.image("ball", "./assets/energy-ball.png");
        this.load.image("ufo", "./assets/ufo.png");

        //load spritesheet
        this.load.spritesheet("explosion", "./assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame:0, endFrame:9});
    }

    create() {
       //scrolling stars
       this.starfield = this.add.tileSprite(0,0,640, 480, "starfield").setOrigin(0,0);
        //Green
       this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize*2,0x00FF00).setOrigin(0,0);
       //add ufo 
       this.ufo1 = new Spaceship(this, game.config.width, borderUISize*9 + borderPadding, "ufo", 0, 100).setOrigin(0,0);
       //White Border
       this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
       this.add.rectangle(0, game.config.height-borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
       this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
       this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
       //rocket
       this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height-borderUISize-borderPadding, "rocket").setOrigin(0.5,0);
       //add 3 spaceships 
       this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, "spaceship", 0, 30).setOrigin(0,0);
       this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, "spaceship", 0, 20).setOrigin(0,0);
       this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, "spaceship", 0, 10).setOrigin(0,0);
       this.ufo1.moveSpeed = 7;
       //add energy ball
       this.ball = new Ball(this, game.config.width/2, game.config.height-borderUISize-borderPadding-12, "ball").setOrigin(0.5,0);
       //controls
       keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
       keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
       keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
       keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
       keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
       keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

       //animation configuration
       this.anims.create({
           key: "explode",
           frames: this.anims.generateFrameNumbers("explosion", {start: 0, end:9, first:0}),
           frameRate: 30
       })
       //define score
       this.p1Score = 0;
       //display score
       let scoreConfig = {
           fontFamily:"Courier",
           fontSize: "28px",
           backgroundColor: "#F3B141",
           color: "#843605",
           align: "center",
           padding:{
               top:5,
               bottom:5,
           },
           fixedWidth: 200
       }
       this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, "Score: 0", scoreConfig);
       //high score display
       this.scoreRecord = this.add.text(game.config.width - borderUISize*8 - borderPadding, borderUISize + borderPadding*2, `High: ${highScore}`, scoreConfig);
       //game over flag
       this.gameOver = false;
       //timer (60 seconds)
       scoreConfig.fixedWidth = 0;
       this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
           if (this.p1Score > highScore){
               highScore = this.p1Score; //update high score 
               this.scoreRecord = `Score: ${highScore}`;
           }
           this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", scoreConfig).setOrigin(0.5);
           this.add.text(game.config.width/2, game.config.height/2 + 64, "Press (R) to Restart or <- for Menu", scoreConfig).setOrigin(0.5);
           this.gameOver = true;
       }, null, this);

    }

    update(){
        //check for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        this.starfield.tilePositionX -=4;
        if (!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ufo1.update();
            this.ball.update();
        }

        //BALL ZONE 

        //set ball postition to rocket position
        if(!this.ball.isFiring){
            this.ball.x = this.p1Rocket.x;
        }
        //fire ball left with G
        if(Phaser.Input.Keyboard.JustDown(keyG) && !this.ball.isFiring && !this.p1Rocket.isFiring){
            this.ball.isFiring = true;
            this.ball.alpha=1;
        }

        //fire ball right with H
        if(Phaser.Input.Keyboard.JustDown(keyH) && !this.ball.isFiring && !this.p1Rocket.isFiring){
            this.ball.ricochet = true;
            this.ball.isFiring = true;
            this.ball.alpha=1;
        }


        //checking collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ufo1)){
            this.p1Rocket.reset();
            this.shipExplode(this.ufo1);
        }
        if (this.checkCollision(this.ball, this.ship03)){
            this.ball.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.ball, this.ship02)){
            this.ball.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.ball, this.ship01)){
            this.ball.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.ball, this.ufo1)){
            this.ball.reset();
            this.shipExplode(this.ufo1);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    }

    checkCollision(rocket, ship){
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true;
        }
        else{
            return false;
        }
    }

    shipExplode(ship){
        //hide ship
        ship.alpha = 0;
        //create explosion
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0,0);
        boom.anims.play("explode");
        boom.on("animationcomplete", () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        //score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text =  `Score: ${this.p1Score}`;

        //sfx randomization
        let rng = Phaser.Math.Between(1,5);
        switch(rng){
            case 1:
                this.sound.play("sfx_explosion");
                break;
            case 2:
                this.sound.play("sfx_explosion2");
                break;
            case 3:
                this.sound.play("sfx_explosion3");
                break;
            case 4:
                this.sound.play("sfx_explosion4");
                break;
            case 5:
                this.sound.play("sfx_explosion5");
                break;
        }
    }
}