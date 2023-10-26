
class Core extends Phaser.Scene {
    constructor (){
        super("playGame");
        this.score = 0;
        this.isClicking = false;
        this.maxAtp = 4;
        this.atpCount = 0 + this.maxAtp;
        this.healthOffset = 40;
        this.health = 3;
        this.healthInitialPos = 900;
    }

    endGame(){
        console.log(this.score);
        this.scene.start("GameOver", this.score);
    }

    updateScore(amount){
        this.score += amount;
        scoreText.setText('Puntaje: ' + this.score);
        gameSettings.increaseFactor += amount*0.02;
        if(this.score % 40 == 0){
            this.addHeart();
            this.beam2.play();
        }
    }

    addHeart() {
        let guiHeart = this.add.image((this.healthInitialPos + (this.healthOffset * this.health)), 695, 'whiteHeart').setScale(1.5);
        this.healthGroup.add(guiHeart);
        this.health ++;
    }      
    
    removeHeart() {
        if(this.health > 1){
            this.healthGroup.remove(this.healthGroup.getLast(true), true);
            this.health--;
        }else{
            this.healthGroup.remove(this.healthGroup.getLast(true), true);
            this.health--;
            this.endGame();
        }
    }
      

    moveObject(object, speed){
        object.x -= speed + gameSettings.increaseFactor;
        
        if (object.x < 0-object.width){
            this.resetObjectPos(object);
        }
    }

    resetObjectPos(object){
        object.x = gameSettings.offsetWidth + Phaser.Math.Between(0, 1000);
        let randomY = Phaser.Math.Between(gameSettings.minHeight, gameSettings.maxHeight);
        object.y = randomY;

    }

    worldMovement(){
        this.background.tilePositionX += 0.4 * gameSettings.increaseFactor;    
        this.wallBottom.tilePositionX -= 1 * gameSettings.increaseFactor; // remember the inverted angle
        this.wallTop.tilePositionX += 1 * gameSettings.increaseFactor;
    }

    hitAtp(cell, atp){
        this.updateScore(1);
        this.resetObjectPos(atp);
        this.swirl.play();
    }

    moveAtp(){
        this.atpGroup.children.each(function(instance){
            this.moveObject(instance, 3);
        }, this);
    }

    spawnAtp(){
        for(let i=0; i<2; i++){
            let atpInstance = this.physics.add.sprite(50, 300, "atp").setScale(0.2);
            this.resetObjectPos(atpInstance);
            this.atpGroup.add(atpInstance);
        }
    }


    moveBaddies(){
        this.bacilluses.children.each(function(instance){
            this.moveObject(instance, 3);
        }, this);
        this.estreptococoses.children.each(function(instance){
            this.moveObject(instance, 3);
        }, this);
    }

    spawnBaddies(){
        if(Math.random() > 0.5){
            let bacillus = this.physics.add.sprite(900, 300, 'bacillus');
            bacillus.setScale(0.9 + gameSettings.increaseFactor*0.1);
            this.resetObjectPos(bacillus);
            this.bacilluses.add(bacillus);
            bacillus.play("bacillus_swim");
        } else {
            let cocos = this.physics.add.sprite(900, 300, 'estreptococos');
            cocos.setScale(0.2 + gameSettings.increaseFactor*0.1);
            this.resetObjectPos(cocos);
            this.estreptococoses.add(cocos);
            cocos.play("estreptococos_swim");
        }
    }

    increaseDifficulty(){
        this.spawnAtp()
        this.spawnBaddies();
        this.updateScore(1);
        gameSettings.cellSpeed ++;
        this.beam2.play();

    }
    
    moveCell(){
        if(!this.input.activePointer.isDown && this.isClicking == true){
            this.cell.setData('positionY', this.input.activePointer.position.y);    
            this.isClicking = false;            
        } else if(this.input.activePointer.isDown && this.isClicking == false){
            this.isClicking = true;
        }

        if(Math.abs(this.cell.y - this.cell.getData('positionY')) <=20){
            this.cell.y = this.cell.getData('positionY');

        } else if(this.cell.y < this.cell.getData('positionY')){
            this.cell.y += gameSettings.cellSpeed + (Math.abs(this.cell.y - this.cell.getData('positionY'))*0.1);

        }else if(this.cell.y > this.cell.getData('positionY')){

            this.cell.y -= gameSettings.cellSpeed + (Math.abs(this.cell.y - this.cell.getData('positionY'))*0.1);
        }

    }


    hitCoco(cell, coco){
        this.resetObjectPos(coco);
        this.updateScore(-1);
        this.removeHeart();
        this.beam.play();
    }

    hitBacillus(cell, bacillus){
        this.resetObjectPos(bacillus);
        this.updateScore(-2);
        this.removeHeart();
        this.beam.play();
    }

    create() {
        // Background
        this.background = this.add.tileSprite(0, 0, config.width, 720, "background");
        this.background.setOrigin(0, 0);
        
        this.wallTop = this.add.tileSprite(628, 20, config.width, 55, "wall");
        this.wallBottom = this.add.tileSprite(628, 700, config.width, 55, "wall");
        
        this.wallBottom.angle = 180;
        this.vesselWalls = this.physics.add.staticGroup();

        this.vesselWalls.add(this.wallBottom);
        this.vesselWalls.add(this.wallTop);

        // ATP         
        this.atpGroup = this.physics.add.group();

        for(let i=0; i<this.maxAtp; i++){
            let atpInstance = this.physics.add.sprite(50, 300, "atp").setScale(0.2);
            this.resetObjectPos(atpInstance);
            this.atpGroup.add(atpInstance);
        }

        // Enemies
        this.estreptococoses = this.physics.add.group();
        this.bacilluses = this.physics.add.group();
        
        this.spawnBaddies();
                
        // Player
        this.cell = this.physics.add.sprite(50, 300, "cell").setScale(0.7);
        this.cell.play("cell_living");

        //Collisions

        this.physics.add.collider(this.cell ,this.vesselWalls);
        this.physics.add.collider(this.cell, this.estreptococoses, this.hitCoco, null, this);
        this.physics.add.collider(this.cell, this.bacilluses, this.hitBacillus, null, this);

        //Overlap
        this.physics.add.overlap(this.cell, this.atpGroup, this.hitAtp, null, this);

        // GUI
        scoreText = this.add.text(430, 5, 'Puntaje: 0', {
            fontSize: '30px', 
            fill: '#FFFFFF',
            fontFamily: 'Pixeboy',
        });

        this.healthGroup = this.add.group();        
        for(let i=0; i<this.health; i++){
            let guiHeart = this.add.image(this.healthInitialPos+this.healthOffset*i, 695, 'whiteHeart').setScale(1.5);
            this.healthGroup.add(guiHeart);
        }

        // Increase difficulty text alert

        this.diffuptext = this.add.text(600, 5, '[!] SUBE LA DIFICULTAD [!]', {
            fontSize: '30px',
            fill: "#FFFFFF",
            fontFamily: 'Pixeboy',
        });

        // Yellow : #f7f723
        // Red : #f72323

        this.input.addDownCallback(function() {
				
            if (game.sound.context.state === 'suspended') {
                game.sound.context.resume();
            }
            
        });

        //SFX and Music

        this.beam = this.sound.add("beam");
        this.swirl = this.sound.add("swirl");
        this.beam2 = this.sound.add("beam2");

        this.bosstime = this.sound.add("BossTime");
        this.cyborgninja = this.sound.add("CyborgNinja");
        this.retroplatforming = this.sound.add("RetroPlatflorming");

        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        let ranMusic = Math.random();
        if( ranMusic < 0.3){
            this.bosstime.play(musicConfig);
        } else if( ranMusic > 0.3  && ranMusic < 0.6){
            this.cyborgninja.play(musicConfig);
        } else{
            this.retroplatforming.play(musicConfig);
        }

        


    }    

    update(){

        this.moveAtp();
        this.moveBaddies();

        this.worldMovement();

        this.moveCell();
        
        if(this.score%10 === 0 && this.score > 0){ 
            this.increaseDifficulty();
        }

        gameSettings.increaseFactor += 0.0005;
    }
}