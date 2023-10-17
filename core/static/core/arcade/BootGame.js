
class BootGame extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    pleaseRotateDevice(){
        alert("Por favor, rote el dispositivo de manera horizontal");
    }

    preload() {
        this.load.image("background", "/static/assets/arcade/background.jpg");
        this.load.image("wall", "/static/assets/arcade/wall.jpg");
        this.load.image("atp", "/static/assets/arcade/atp.png");    
        this.load.image("energybar", "/static/assets/arcade/energysection.png");
        this.load.spritesheet('estreptococos', '/static/assets/arcade/estreptococoSpritesheet.png',{
          frameWidth: 200,
          frameHeight: 50,
        });

        this.load.spritesheet('cell', '/static/assets/arcade/cellSpriteSheet.png',{
            frameWidth:80,
            frameHeight: 77,
        });

        this.load.spritesheet('bacillus', '/static/assets/arcade/bacillusSpritesheet.png', {
            frameWidth: 32,
            frameHeight: 21,
        })
        
        this.load.image('whiteHeart', '/static/assets/arcade/whiteGlitchHeart.png');
        

        this.load.image('opacityShader', '/static/assets/arcade/opacityShader.png');

    }

    create() {
        this.add.text(20, 20, "Cargando juego...", {fill: "black", font: "40px"});
        
        let orientation = this.scale.orientation;

        this.scene.start("mainMenu");
        
        //Animations - estreptococos
        this.anims.create({
            key: "estreptococos_swim",
            frames: this.anims.generateFrameNumbers("estreptococos"),
            frameRate: 10,
            repeat: -1
        });

        //Animations - bacillus
        this.anims.create({
            key: "bacillus_swim",
            frames: this.anims.generateFrameNumbers("bacillus"),
            frameRate: 12,
            repeat: -1
        });
        
        //Animations - cell
        this.anims.create({
            key: "cell_living",
            frames: this.anims.generateFrameNumbers("cell"),
            frameRate: 10,
            repeat: -1
        })
    }
}
