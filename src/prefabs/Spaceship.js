//spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene,x,y,texture,frame);

        //add object to existing scene
        scene.add.existing(this);
        this.points = pointValue; //track points
        this.moveSpeed = game.settings.spaceshipSpeed; //pixels per frame
        this.direction = Phaser.Math.Between(1,2);
    }


    update(){
        //move spaceship left or right
        if (this.direction == 1){
            this.x -= this.moveSpeed;
        }

        if (this.direction==2){
            this.flipX = true;
            this.x += this.moveSpeed;
        }
        //wrap around
        if(this.x <= 0 - this.width || this.x >= game.config.width){
            this.reset();   
        }




    }

    //position reset
    reset(){
        if(this.x >= game.config.width){
            this.x = 0 - this.width + 1; 
        } 

        else{
            this.x = game.config.width - 1; 
        }

    }
}