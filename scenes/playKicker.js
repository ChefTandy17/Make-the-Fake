class PlayKicker extends Phaser.Scene {
    constructor() {
        super('playKickerScene')
    }
    create() {

    //to create the background for the game
    this.scoringRect = this.add.rectangle(500, 480, 1000, 100, 0x000000) // x, y, width, height, color
    this.purpleRect = this.add.rectangle(500, 330, 1000, 100, 0xdf57f6)
    this.yellowRect = this.add.rectangle(500, 0, 1000, 250, 0xf4f976)

    //Experiment: To add a pause screen
    this.pausedScreen = this.add.rectangle(0, 0 , 5500, 5500, 0xbebebe)
    //as a way to set the pause screen faint and to layer it up
    this.pausedScreen.setAlpha(0)
    this.pausedScreen.setDepth(5)
    this.pausedText = this.add.bitmapText(centerX, centerY - 100, 'pixelKey', 'WHO CALLED TIMEOUT!?!\n-BMO', 40).setTintFill(0x000000).setOrigin(0.5)
    this.pausedText.setAlpha(0)
    this.pausedText.setDepth(5)
    this.backToMenuText = this.add.bitmapText(centerX, centerY / 2 + 180, 'pixelKey', 'PRESS ESC TO UNPAUSE\nPRESS SPACE TO MENU', 40).setTintFill(0x000000).setOrigin(0.5);
    this.backToMenuText.setAlpha(0)
    this.backToMenuText.setDepth(5)

    //to create a scoring system
    this.kickerScore = 0
    this.qbScore = 0

    //scoring system text
    this.kickerScoreText = this.add.bitmapText(50, 450, 'pixelKey', 'P1:000', 40).setTintFill(0xffffff)
    this.qbScoreText = this.add.bitmapText(550, 450, 'pixelKey', 'P2:000', 40).setTintFill(0xffffff)

    //spacebar input, which gives the player the ability to kick a ball
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    //Experiment: To add a pause feature input
    this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    this.gamePaused = false

    //displaying the kicker
    this.kicker = this.physics.add.sprite(200,240, 'kicker')
    this.kicker.setScale(6)
    this.kicker.setDepth(1)
    this.kicker.body.setSize(5, 5)
    this.kicker.setOffset(10,50)
    this.kicker.body.setCollideWorldBounds(true)
    this.kicker.body.setImmovable(true) 

    //displaying the quarterback
    this.qb = this.physics.add.sprite(800,240, 'qb')
    this.qb.setScale(6)
    this.qb.body.setSize(5, 5)
    this.qb.setOffset(21,50)
    this.qb.flipX = -6
    this.qb.body.setCollideWorldBounds(true)
    this.qb.body.setImmovable(true) 

    //displaying the football
    this.football = this.physics.add.sprite(770,150,'football')
    this.football.setScale(6)

    //game over flag to end the game
    this.gameOver = false
    
    //create an idle animations for the kicker
    this.anims.create({
        key: 'kickerIdle',
        frames: this.anims.generateFrameNumbers('kicker', { 
            start: 0, 
            end: 0 
        }),
        frameRate: 1,
        repeat: 0
    })

    //create a kick animations for the kicker
    this.anims.create({
        key: 'kick',
        frames: this.anims.generateFrameNumbers('kicker', { 
            start: 1, 
            end: 1 
        }),
        frameRate: 1,
        repeat: 0
    })

    //create an idle animations for the quarterback    
    this.anims.create({
        key: 'qbIdle',
        frames: this.anims.generateFrameNumbers('qb', { 
            start: 0, 
            end: 0 
        }),
        frameRate: 1,
        repeat: 0
    })

    //create a throwing animations for the quarterback    
    this.anims.create({
        key: 'throw',
        frames: this.anims.generateFrameNumbers('qb', { 
            start: 1, 
            end: 1 
        }),
        frameRate: 1,
        repeat: 0
    })

    //debugging mode
    this.physics.world.drawDebug = false;
    this.physics.world.debugGraphic = this.add.graphics()
    this.input.keyboard.on('keydown-D', function() {
        this.physics.world.drawDebug = !this.physics.world.drawDebug
        if (!this.physics.world.drawDebug) {
            this.physics.world.debugGraphic.clear()
        }
    }, this)

    //to set up the first throw of the game
    this.firstQBThrow()
}
  
//for the quarterback to throw the first football to the kicker. This is called once to set up the game
firstQBThrow(){
        this.time.addEvent({
            delay: Phaser.Math.Between(3000, 5000),
            callback: () => {
                this.sound.play('qbThrow')
                this.qb.play('throw')
                this.football.setVelocity(game.settingsQB.footballVelocity, 0)
                },
            callbackScope: this,
            loop: false,
        })
}

//when the football is out of bounds, figure out who to give the score to, reset velocity and position of the football, and throw the football again 
resetFootball(player, pixelTextFont) {
    //resets the football position
    this.football.body.updateFromGameObject()
    this.football.setPosition(770, 150)
    this.football.setVelocity(0, 0)

    //check who to give the +100 points to.
    if (player == 'kicker') {
        this.sound.play('kickerScoreSound')
        this.kickerScore += 100
        this.kickerScoreText.setText("P1:" + this.kickerScore)
    } 
    else if (player == 'qb') {
        this.sound.play('qbScoreSound')
        this.qbScore += 100
        this.qbScoreText.setText("P2:" + this.qbScore)
    }

    //this function is called to check if the victory condition is met
    //if its true, it sets the gameOver flag to true.
    this.victoryScreen(this.kickerScore, this.qbScore, player, pixelTextFont)

    //if the gameOver flag continues to be false, have the quarterback to throw the football again. 
    if(!this.gameOver){
        this.time.addEvent({
            delay: Phaser.Math.Between(2000, 6000),
            callback: () => {
                this.sound.play('qbThrow')
                this.qb.play('throw')
                this.football.setVelocity(game.settingsQB.footballVelocity, 0)
            },
            callbackScope: this
        })
    }
}

//display victory screen for the kicker or the qb
victoryScreen(checkKickerScore, checkQBScore, player, pixelTextFont){

    if(player == "kicker" && checkKickerScore >= 1000){
        let kickerVictoryYellow = this.add.bitmapText(centerX, centerY, pixelTextFont, "KICKER VICTORY", 39.5).setTintFill(0xfDc72c).setOrigin(0.5)
        let kickerVictoryBlue = this.add.bitmapText(centerX, centerY, pixelTextFont, "KICKER VICTORY", 40).setTintFill(0x1D428A).setOrigin(0.5)
        kickerVictoryYellow.setDepth(1)
        kickerVictoryBlue.setDepth(2)
        console.log("in kicker")
        this.sound.play('victorySound1')
        this.gameOver = true
    }
    else if(player = 'qb' && checkQBScore >= 1000){
        let qbVictoryBlue = this.add.bitmapText(centerX, centerY, pixelTextFont, "QUARTERBACK VICTORY", 34.5).setTintFill(0x1D428A).setOrigin(0.5)
        let qbVictoryYellow = this.add.bitmapText(centerX, centerY, pixelTextFont, "QUARTERBACK VICTORY", 35).setTintFill(0xfDc72c).setOrigin(0.5)
        qbVictoryBlue.setDepth(1)
        qbVictoryYellow.setDepth(1)
        console.log("in qb")
        this.sound.play('victorySound1')
        this.gameOver = true
    }

    //send the player back to the main menu screen after seven seconds.
    if(this.gameOver){
        this.time.addEvent({
            delay: 7000,
            callback: () => {
                this.scene.start('menuScene')
            },
            callbackScope: this
        })
    }

}

//to pause the game
/*
pausedScene(){
    this.gamePaused = true
    this.pausedScreen.setAlpha(0.5)
    this.football.body.moves = false
    this.gameOver = true

    //experiment: to return out of pause
    if(this.gameOver == true && this.gamePaused == true){
        if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
                this.gamePaused = false
                this.pausedScreen.setAlpha(0)
                this.football.body.moves = true
                this.gameOver = false
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start('menuScene')
        }
}
*/

update() {

    if(this.gamePaused){
        if(this.gameOver == true && this.gamePaused == true){
            if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
                    this.gamePaused = false
                    this.pausedScreen.setAlpha(0)
                    this.pausedText.setAlpha(0)
                    this.backToMenuText.setAlpha(0)
                    this.football.body.moves = true
                    this.gameOver = false
                }
            }
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                this.scene.start('menuScene')
            }
    }

    if(!this.gameOver){

        //experiment: to create a pause menu
        if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
            this.gamePaused = true
            this.pausedScreen.setAlpha(0.7)
            this.pausedText.setAlpha(1)
            this.backToMenuText.setAlpha(1)
            this.football.body.moves = false
            this.gameOver = true
        }

        //sets up a timer for the kicker to prevent players to spam the kick button
        if (this.kickerAbilityTimer == undefined) {
            this.kickerAbilityTimer = 2
        }
        if (this.kickerAbilityTimer > 0) {
            this.kickerAbilityTimer -= this.game.loop.delta / 1000
        }
        if (this.kickerAbilityTimer <= 0){
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {

                //to reset the timer for the ability
                this.kickerAbilityTimer = 2

                //to set the kicker position to kick the ball, changing its hitbox as well
                this.kicker.play('kick')
                this.kicker.setSize(5, 5)
                this.kicker.setOffset(25, 14)

                //to remove the collision hitbox at a certain point in time
                this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.kicker.play('kick')
                        this.kicker.body.setSize(5, 5)
                        this.kicker.setOffset(10,50)
                        },
                    callbackScope: this
                })
                
                //to set the kicker position back to idle after kicking the ball
                this.time.addEvent({
                    delay: 1500,
                    callback: () => {
                        this.kicker.play('kickerIdle')
                        this.kicker.body.setSize(5, 5)
                        this.kicker.setOffset(10,50)
                        },
                    callbackScope: this
                })
            }
        }

        //collision check to move the football up to indicate a successful kick, along with displaying a particle, and play the kick sound
        this.physics.add.collider(this.kicker, this.football, (kicker, football) => {
            if(!this.kickSoundFlag){
                this.sound.play('kickSound')
                const kickParticle = this.add.particles(this.football.x, this.football.y, 'kickParticle', {
                    lifespan: 1000,
                    speed: { min: 150, max: 250 },
                    scale: { start:1 , end: 0 },
                    gravityY: 500,
                    blendMode: 'ADD',
                    emitting: false
                })
                kickParticle.explode(10)
            }
            this.kickSoundFlag = true
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.kickSoundFlag = false
                    },
                callbackScope: this
            })
            this.football.setVelocity(0, game.settingsQB.footballKickedVelocity)
        })

        //the kicker gets 100 points everytime the football is out of bounds
        if (this.football.y < 0 || this.football.y > this.sys.game.config.height) {
            this.resetFootball("kicker", 'pixelKey')
            this.qb.play('qbIdle')                              //to reset the quarterback position to idle
        }

        //the qb gets 100 points everytime the football is out of bounds
        if (this.football.x < 0 || this.football.x > this.sys.game.config.width) {
            this.resetFootball("qb",'pixelKey')
            this.qb.play('qbIdle')                               //to reset the quarterback position to idle
        }
    }
}
}