class GameOver extends Phaser.Scene {

    constructor() {
        super("GameOver");
    }
    init(score) {
        this.finalScore = score;
    }

    moveObject(object, speed) {
        object.x -= speed + gameSettings.increaseFactor;

        if (object.x < 0 - object.width) {
            this.resetObjectPos(object);
        }
    }

    resetObjectPos(object) {
        object.x = 820 + Phaser.Math.Between(0, 400);
        let randomY = Phaser.Math.Between(70, 530);
        object.y = randomY;

    }

    worldMovement() {
        this.background.tilePositionX += 0.4 * gameSettings.increaseFactor;
        this.wallBottom.tilePositionX -= 1 + gameSettings.increaseFactor; // remember the inverted angle
        this.wallTop.tilePositionX += 1 + gameSettings.increaseFactor;
    }


    hitAtp(cell, atp) {
        this.finalScore += 1;
        scoreText.setText('Puntaje: ' + this.finalScore)
        this.resetObjectPos(atp);
    }

    moveAtp() {
        this.atpGroup.children.each(function (instance) {
            this.moveObject(instance, 3);
        }, this);
    }

    moveBaddies() {
        this.bacilluses.children.each(function (instance) {
            this.moveObject(instance, 3);
        }, this);
        this.estreptococoses.children.each(function (instance) {
            this.moveObject(instance, 3);
        }, this);
    }

    spawnBaddies() {
        if (Math.random() > 0.5) {
            let bacillus = this.physics.add.sprite(900, 300, 'bacillus');
            bacillus.setScale(Phaser.Math.Between(1, (1 * gameSettings.increaseFactor)))
            this.resetObjectPos(bacillus);
            this.bacilluses.add(bacillus);
            bacillus.play("bacillus_swim");
        } else {
            let cocos = this.physics.add.sprite(900, 300, 'estreptococos');
            cocos.setScale(0.2, 0.2 * gameSettings.increaseFactor)
            this.resetObjectPos(cocos);
            this.estreptococoses.add(cocos);
            cocos.play("estreptococos_swim");
        }
    }

    updateFormData(score){
        let scoreInput = document.getElementById("hiddenscore");
        scoreInput.value = score;

        //console.log(scoreInput);
    }

    displayModal(){
        
        var scoreModal = new bootstrap.Modal('#sendScoreModal', {
            focus: true
        })

        scoreModal.toggle();

        
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

        this.physics.add.collider(this.cell, this.vesselWalls);

        //Overlap

        this.physics.add.overlap(this.cell, this.atpGroup, this.hitAtp, null, this);

        this.opacityshader = this.add.image(640, 300, 'opacityShader').setScale(1.5);


        //TEXTS

        this.title = this.add.text(395, 120, 'Game Over', {
            fontFamily: 'Pixeboy',
            fontSize: '120px',
            fill: '#FFFFFF'
        });

        this.subtitle = this.add.text(460, 260, 'Puntaje: ', {
            fontFamily: 'Pixeboy',
            fontSize: '50px',
            fill: '#FFFFFF'
        });

        this.updateFormData(this.finalScore);

        this.finalScoreText = this.add.text(680, 260, ''+this.finalScore, {
            fontFamily: 'Pixeboy',
            fontSize: '50px',
            fill: '#90fff6'
        })


        this.playAgain = this.add.text(200, 500, '[> Jugar de nuevo <]', {
            fill: "white",
            fontSize: "40px",
            fontFamily: 'Pixeboy'
        })
            .setPadding(5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => location.reload())
            .on('pointerover', () => {
                this.playAgain.setStyle({ fill: '#FFC200', fontSize: "40px" })
            })
            .on('pointerout', () => {
                this.playAgain.setStyle({ fill: '#FFFFFF', fontSize: "40px" })
            })

        this.sendScoreButton = this.add.text(710, 500, '[> Enviar Puntaje <]', {
            fill: "white",
            fontSize: "40px",
            fontFamily: 'Pixeboy'
        })
            .setPadding(5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', this.displayModal)
            .on('pointerover', () => {
                this.sendScoreButton.setStyle({ fill: '#FFC200', fontSize: "40px" })
            })
            .on('pointerout', () => {
                this.sendScoreButton.setStyle({ fill: '#FFFFFF', fontSize: "40px" })
            })
    }


    update() {
        this.moveAtp();
        this.moveBaddies();
        this.worldMovement();

        gameSettings.increaseFactor += 0.0005;
    }

}