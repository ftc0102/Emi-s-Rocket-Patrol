    class Menu extends Phaser.Scene {
        constructor(){
            super("menuScene");
        }

        preload(){
            //load audio
            this.load.audio("sfx_select", "./assets/select.wav");
            this.load.audio("sfx_explosion", "./assets/explosion.wav");
            this.load.audio("sfx_explosion2", "https://static.wikia.nocookie.net/bankforcmpm120/images/b/b4/ExplosionAlt1.wav");
            this.load.audio("sfx_explosion3", "https://static.wikia.nocookie.net/bankforcmpm120/images/5/5f/ExplosionAlt2.wav");
            this.load.audio("sfx_explosion4", "https://static.wikia.nocookie.net/bankforcmpm120/images/1/12/ExplosionAlt3.wav");
            this.load.audio("sfx_explosion5", "https://static.wikia.nocookie.net/bankforcmpm120/images/9/96/ExplosionAlt4.wav");
            this.load.audio("sfx_rocket", "./assets/rocket.wav");
        }

        create() {
            //menu text config
            let menuConfig = {
                fontFamily: "Courier",
                fontSize: "28px",
                backgroundColor: "#F3B141",
                color: "#843605",
                align: "right",
                padding: {
                    top:5,
                    bottom:5,
                },
                fixedWidth:0
            }

            //show menu text 
            this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "ROCKET PATROL", menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2, "Use <--> arrows to move & (F) to fire", menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + borderUISize, "(G) shoots left and (H) shoots right", menuConfig).setOrigin(0.5);
            menuConfig.backgroundColor = "#00FF00";
            menuConfig.color = "#000";
            this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2+borderPadding, "Press <- for easy and -> for expert", menuConfig).setOrigin(0.5);

            //KEYS
            keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
            keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
            keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        }

        update() {
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
              // easy mode
              game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
              }
              activePlayer=2; //by setting activePlayer to 2, we can make 2P the default and 1P just skips to the second player
              this.sound.play('sfx_select');
              this.scene.start('playScene');    
            }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
              // hard mode
              game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 10000    
              }
              activePlayer=2; 
              this.sound.play('sfx_select');
              this.scene.start('playScene');    
            }
            if (Phaser.Input.Keyboard.JustDown(keyUP)) {
              // easy mode 2P
              game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
              }
              this.sound.play('sfx_select');
              this.scene.start('playerScene');    
            }

            if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
              // hard mode 2P
              game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 10000    
              }
              this.sound.play('sfx_select');
              this.scene.start('playerScene');    
            }
          }
    }