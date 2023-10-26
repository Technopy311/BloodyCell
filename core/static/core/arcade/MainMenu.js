
class MainMenu extends Phaser.Scene{
    constructor(){
        super("mainMenu");
        this.canContinue = false;
    }
    moveObject(object, speed){
        object.x -= speed + gameSettings.increaseFactor;
        
        if (object.x < 0-object.width){
            this.resetObjectPos(object);
        }
    }

    resetObjectPos(object){
        object.x = 820 + Phaser.Math.Between(0, 400);
        let randomY = Phaser.Math.Between(70, 530);
        object.y = randomY;

    }

    worldMovement(){
        this.background.tilePositionX += 0.4 * gameSettings.increaseFactor;
        this.wallBottom.tilePositionX -= 1 + gameSettings.increaseFactor; // remember the inverted angle
        this.wallTop.tilePositionX += 1 + gameSettings.increaseFactor;
    }
    

    hitAtp(cell, atp){
        this.score += 1;
        scoreText.setText('Puntaje: ' + this.score)
        this.resetObjectPos(atp);
    }

    moveAtp(){
        this.atpGroup.children.each(function(instance){
            this.moveObject(instance, 3);
        }, this);
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
        if(Math.random()>0.5){
            let bacillus = this.physics.add.sprite(900, 300, 'bacillus');
            bacillus.setScale(Phaser.Math.Between(1, (1*gameSettings.increaseFactor)))
            this.resetObjectPos(bacillus);
            this.bacilluses.add(bacillus);
            bacillus.play("bacillus_swim");
        } else{
            let cocos = this.physics.add.sprite(900, 300, 'estreptococos');
            cocos.setScale(0.2, 0.2*gameSettings.increaseFactor)
            this.resetObjectPos(cocos);
            this.estreptococoses.add(cocos);
            cocos.play("estreptococos_swim");
        }
    }

    checkOrientation(){
        let orientation = this.scale.orientation;

        if(orientation == Phaser.Scale.PORTRAIT){
            this.alert.alpha = 100;
            this.title.alpha = 0;
            this.startButton.alpha = 0;
            if(this.canContinue === false){
                this.canContinue = true;
                alert("Por favor, voltée el dispositivo.");
            }
        } else if(orientation == Phaser.Scale.LANDSCAPE){
            this.alert.alpha = 0;
            this.title.alpha = 100;
            this.startButton.alpha = 100;
            this.canContinue = true;
        }
    }

    create(){
        // Background
        this.background = this.add.tileSprite(0, 0, config.width, 720, "background");
        this.background.setOrigin(0, 0);
        
        this.wallTop = this.add.tileSprite(640, 20, config.width, 55, "wall");
        this.wallBottom = this.add.tileSprite(640, 700, config.width, 55, "wall");
        
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

        //Overlap

        this.physics.add.overlap(this.cell, this.atpGroup, this.hitAtp, null, this);
        
        this.opacityshader = this.add.image(640, 300, 'opacityShader').setScale(1.5);

        this.title = this.add.text(320, 200, 'BLOODY CELL', {
            fontSize: '140px',
            fill: '#FFFFFF',
            fontFamily: 'Pixeboy'
        });

        this.alert = this.add.text(80, 250, "Por favor utilice el dispositivo\n de manera horizontal", {
            fill: "white",
            fontSize: "80px",
            fontFamily: 'Pixeboy'
        });


        this.startButton = this.add.text(475, 400, '> Jugar <', {
            fill: "white",
            fontSize: "80px",
            fontFamily: 'Pixeboy'
        })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start("playGame"))
            .on('pointerover', () => {
                this.startButton.setStyle({ fill: '#FFC200', fontSize:"85px" })
            })
            .on('pointerout', () => {
                this.startButton.setStyle({ fill: '#FFFFFF', fontSize:"80px" })
            })
        }


    update(){
        this.moveAtp();
        this.moveBaddies();
        this.worldMovement();

        this.checkOrientation();

        gameSettings.increaseFactor += 0.0005;
    }   
}