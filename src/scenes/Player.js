class Player extends Phaser.Scene { //this scene allows for us to switch players
    constructor(){
        super("playerScene");
    }

    create(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); //key code

        if(activePlayer == 1){ //P1
            this.add.text(20,20, "P1, Get ready");
        }
        if(activePlayer == 2){ //P2
            this.add.text(20,20, "P2, Get ready");
        }

        this.add.text(40,0, "Press <- to continue"); 
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
    }
}