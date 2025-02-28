//Tyvin Tandy
//Pro Football 1861

// you need this 
'use strict'

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
            debug: false //to set debug mode on or off             
        },
    },
    scene: [ Load, Menu, Credits, Tutorial, NumPlayers, SelectPos, DifficultyQB, DifficultyKicker, PlayKicker, PlayQB, PlayTwoPlayer]
}

//set up the game
let game = new Phaser.Game(config);

let { width, height } = game.config
let centerX = width / 2
let centerY = height / 2