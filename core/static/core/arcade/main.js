
var scoreText;

var config = {
    width: 1280, // 10:6
    height: 720,
    backgroundColor: 0xFFFFFF,
    scene: [BootGame, MainMenu, Core, GameOver],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            debugShowVelocity: false
        }
    },
    scale: {
        parent: 'gameCanvas',
        mode: Phaser.Scale.FIT,
        autocenter: Phaser.Scale.CENTER_BOTH,
    }
}


var gameSettings = {
    increaseFactor: 1,
    cellSpeed: 12,
    offsetWidth: config.width+500,
    offsetHeight: config.width+200,
    minHeight: 70,
    maxHeight: 680
    
}

var game = new Phaser.Game(config);