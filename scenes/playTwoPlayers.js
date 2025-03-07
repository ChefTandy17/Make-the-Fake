class PlayTwoPlayer extends Phaser.Scene {
    constructor() {
        super('playTwoPlayer')
    }

    create() {

    //to create the background for the game
    this.scoringRect = this.add.rectangle(500, 480, 1000, 100, 0x000000)
    this.purpleRect = this.add.rectangle(500, 330, 1000, 100, 0xdf57f6)
    this.yellowRect = this.add.rectangle(500, 0, 1000, 250, 0xf4f976)

    this.escText = this.add.bitmapText(0, 0, 'pixelKey', '[esc] to menu', 20).setTintFill(0x000000)
    this.escText.setAlpha(0.2)

    //the scoring system
    this.kickerScore = 0
    this.qbScore = 0

    //the set variables for the velocity for the qb.
    this.qbVelocity = -500
    this.gameSceneFlag = false  

    this.kickerScoreText = this.add.bitmapText(50, 450, 'pixelKey', 'P1:000', 40).setTintFill(0xffffff)
    this.qbScoreText = this.add.bitmapText(550, 450, 'pixelKey', 'P2:000', 40).setTintFill(0xffffff)

    //for the kicker to kick the ball
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    //input to go to main menu
    this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

    //for the qb to control the ball and to throw the ball
    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)


    this.kicker = this.physics.add.sprite(200,240, 'kicker')
    this.kicker.setScale(6)
    this.kicker.setDepth(1)
    this.kicker.body.setSize(5, 5)
    this.kicker.setOffset(10,50)
    this.kicker.body.setCollideWorldBounds(true)
    this.kicker.body.setImmovable(true) 


    this.qb = this.physics.add.sprite(800,240, 'qb')
    this.qb.setScale(6)
    this.qb.body.setSize(5, 5)
    this.qb.setOffset(21,50)
    this.qb.flipX = -6
    this.qb.body.setCollideWorldBounds(true)
    this.qb.body.setImmovable(true) 

    this.football = this.physics.add.sprite(770,150,'football')
    this.football.setScale(6)

    //game over flag
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

    //create idle animations for the quarterback    
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

    //collision check if the football is kicked. If true, move the football up
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
        this.football.setVelocity(0, -500)
    })
    
    // to set debug mode on or off
    this.physics.world.drawDebug = false;
    this.physics.world.debugGraphic = this.add.graphics()
    this.input.keyboard.on('keydown-D', function() {
        this.physics.world.drawDebug = !this.physics.world.drawDebug
        if (!this.physics.world.drawDebug) {
            this.physics.world.debugGraphic.clear()
        }
    }, this)
}

//to increase the velocity of the football throw
increaseVelocity(){
    if(this.qbVelocity <= -2500){    //to prevent very fast throw speeds
        this.qbVelocity = -2500
    }
    else{
        this.qbVelocity -= 50
    }
}

//to decrease the velocity of the football
decreaseVelocity(){
    if(this.qbVelocity >= -300){    //to prevent very slow throws
        this.qbVelocity = -300
    }
    else{
        this.qbVelocity += 25
    }
}

//disable user inputs, set the gameScene flag to true, and start football velocity function
startGameScene(){
    this.upKey.enabled = false
    this.downKey.enabled = false
    this.enterKey.enabled = false
    this.gameSceneFlag = true

    if(this.gameSceneFlag == true){
        this.velocityScene(this.qbVelocity)
    }
}

//move the football, and havke the kicker to try to kick the ball
velocityScene(qbVelocity){

    //to set the animation for the qb to throw, and to play the throw noise
    this.sound.play('qbThrow')
    this.qb.play('throw')

    //to throw the football
    this.football.setVelocity(qbVelocity, 0)
}

//when the football is out of bounds, figure out who to give the score to, reset velocity and position of the football, and throw the football again 
resetFootball(player, pixelTextFont) {

    this.football.body.updateFromGameObject()
    this.football.setPosition(770, 150)
    this.football.setVelocity(0, 0)

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

    this.victoryScreen(this.kickerScore, this.qbScore, player, pixelTextFont)
    this.upKey.enabled = true
    this.downKey.enabled = true
    this.enterKey.enabled = true
}

//display victory screen for the kicker or the qb
victoryScreen(checkKickerScore, checkQBScore, player, pixelTextFont){

    if(player == "kicker" && checkKickerScore >= 1000){
        //this.add.bitmaptext(centerX / 2, centerY / 2, "KICKER VICTORY", pixelTextFont).setOrigin(0.5)
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

    //goes back to the main menu scene
    if(this.gameOver){
        this.time.addEvent({
            delay: 7000,
            callback: () => {
                this.scene.start('menuScene');
            },
            callbackScope: this
        })
    }

}

update() {

    if(!this.gameOver){ 

        //to go to main menu
        if (Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
            this.scene.start('menuScene')
        }
     
        //control for the kicker   
        //ability timer to prevent the kicker to spam the kick animation
        if (this.kickerAbilityTimer == undefined) {
            this.kickerAbilityTimer = 2
        }
        if (this.kickerAbilityTimer > 0) {
            this.kickerAbilityTimer -= this.game.loop.delta / 1000
        }

        if (this.kickerAbilityTimer <= 0){
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {

                //to reset the timer for the ability to kick the ball again
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
                
                //to set the kicker position back to idle
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

        //controls for the quarterback
        //ability button to prevent players to spam the enter button.
        if (this.qbAbilityTimer == undefined) {
            this.qbAbilityTimer = 3
        }
        if (this.qbAbilityTimer > 0) {
            this.qbAbilityTimer -= this.game.loop.delta / 1000
        }

        //for players to be able to adjust the velocity of the football
        if(Phaser.Input.Keyboard.JustDown(this.upKey)){
            this.increaseVelocity()
        }

        if(Phaser.Input.Keyboard.JustDown(this.downKey)){
            this.decreaseVelocity()
        }   

        //gives the player the ability to throw the football when the cooldown is over
        if (this.qbAbilityTimer <= 0){  
            if(Phaser.Input.Keyboard.JustDown(this.enterKey)){ 

                //to reset the ability timer
                this.qbAbilityTimer = 3

                //start the throw scene
                this.startGameScene()
            }
        }

        //the kicker gets 100 points everytime the football is out of bounds
        if (this.football.y < 0 || this.football.y > this.sys.game.config.height) {
            this.resetFootball("kicker", 'pixelKey')
            this.qb.play('qbIdle')                  //reset quarterback position to idle
            this.gameSceneFlag = false
        }

        //the qb gets 100 points everytime the football is out of bounds
        if (this.football.x < 0 || this.football.x > this.sys.game.config.width) {
            this.resetFootball("qb",'pixelKey')
            this.qb.play('qbIdle')                  //reset quarterback position to idle
            this.gameSceneFlag = false
        }
    }
}
}