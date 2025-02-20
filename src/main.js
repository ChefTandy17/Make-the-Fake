//Tyvin Tandy
//Pro Football 1861


let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
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
  

//repushing text
