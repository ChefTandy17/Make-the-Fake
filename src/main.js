//Tyvin Tandy
//Pro Football 1861

// DEBUG MODE: D-KEY

// TECHNICAL EXECUTION:
// The game uses these Phaser Major components...
// Particle Effects (Ex: Successfully kicking the football would display a small particle effect)
// Timer Events (Ex: In playKicker.js and playQB.js, there are timer events which triggers moving the hitbox and display an animation)
// Input Systems (Ex: Pressing space to kick, enter to throw the football, 1,2,3 buttons to navigate the menu and select screen, etc)
// Physics System (Arcade Physics) (Ex: The football moves left, and when kicked, moves up. The velocity can also be adjusted if playing as a quarterback)
// Audio (Ex: Sound is played when the kicker or the quarterback scores)
// Animaition Manager (Ex: The football in the main menu plays a looping animation, while the qb and kicker have only a one frame animation)

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