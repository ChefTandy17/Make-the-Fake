//Tyvin Tandy
//Pro Football 1861

//Credits:
//Press Start P2 font was created by CodeMan38


let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    backgroundColor: '#95e7fc', 
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    render: {
        pixelArt: true 
    },
    physics: {
        default: 'arcade',
        arcade: {                  
            debug: true //to set debug mode on or off             
        },
    },
    scene: [ Play ]
};

//set up the game
let game = new Phaser.Game(config);

