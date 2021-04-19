class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene,x,y,texture,frame);

        //add object to existing scene
        scene.add.existing(this);
        this.moveSpeed = 2; //pixels per frame
        this.isFiring = false;
        this.ricochet = false;
    }

    update(){
        //if fired, moves diagonally
        if(this.isFiring && this.y >= borderUISize * 4 + borderPadding){
            //hit left wall
            if(this.x <= borderUISize+this.width){
                this.ricochet = true;
            }
            //hit right wall
            if(this.x >= game.config.width - borderUISize - this.width){
                this.ricochet=false;
            }
            //bounce right 
            if (!this.ricochet){
                this.x -= this.moveSpeed;
            }
            //bounce left
            if (this.ricochet){
                this.x += this.moveSpeed;
            }

            this.y -= this.moveSpeed;
        }

        if(this.y <= borderUISize * 4 + borderPadding){
            this.reset();
        }
    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding - 12;
        this.ricochet = false;
    }
}