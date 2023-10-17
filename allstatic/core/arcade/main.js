var gameSettings = {
    increaseFactor: 1,
    cellSpeed: 12,
    offsetWidth: 1500,
    offsetHeight: 800,
    minHeight: 70,
    maxHeight: 530
    
}

var scoreText;



var config = {
    width: 1000,
    height: 600,
    parent: 'gameCanvas',
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
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
    }
}

var game = new Phaser.Game(config);