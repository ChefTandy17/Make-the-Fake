class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init(){

    }

    preload(){

    }

//width: 1000, x
//height: 500, y

    create() {
    
    //to create the background for the game
    this.scoringRect = this.add.rectangle(500, 480, 1000, 100, 0x000000) // x, y, width, height, color
    this.purpleRect = this.add.rectangle(500, 330, 1000, 100, 0xdf57f6)
    this.yellowRect = this.add.rectangle(500, 0, 1000, 250, 0xf4f976)

    //to create an invisible barrier in the middle
    let invisibleBarrierMiddle = this.physics.add.sprite(500, 1).setOrigin(0).setSize(1, 1000).setVisible(false)

    //let kickSoundDetector = this.physics.add.sprite(0, 100).setOrigin(0).setSize(1000, 1).setVisible(false)

/*  used for testing
    this.add.bitmapText(centerX, centerY, 'pixelKey', 'Hello').setOrigin(0.5)
    this.add.bitmapText(centerX, centerY, 'pixelKey', 'World', 36, 1).setOrigin(0.5)
*/

/*
    let scoreConfig = {
        fontFamily: 'Impact',
        fontSize: '50Px',
        color: '#FFFFFF',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        }
    }
*/

    this.kickerScore = 0
    this.qbScore = 0

    this.kickerScoreText = this.add.bitmapText(50, 450, 'pixelKey', 'P1:000', 40).setTintFill(0xffffff)
    this.qbScoreText = this.add.bitmapText(550, 450, 'pixelKey', 'P2:000', 40).setTintFill(0xffffff)

/*
    this.kickerScoreText = this.add.text(50, 430, "P1: ", scoreConfig)
    this.qbScoreText = this.add.text(550, 430, "P2: ", scoreConfig)
*/  

    //saved to make the game look more polish or maybe more fun
    //this.cursors = this.input.keyboard.createCursorKeys()    //an object that stores in cursors for the four arrow keys

    //for the kicker to kick the ball
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

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
    
        //create a kick animations for the kicker
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

        //create a throwing animations for the quarterback    
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

        //to set up the first throw of the game (probably theres a better way, buts thats all I can come up with)
        this.firstQBThrow()
}
  
//for the CPU to perform a throw. this is called only once to set up the game
firstQBThrow(){
        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000),
            callback: () => {
                this.sound.play('qbThrow')
                this.qb.play('throw')
                this.football.setVelocity(-300,0)
                },
            callbackScope: this,
            loop: false,               //to perform this only once
        })
}

//when the football is out of bounds, figure out who to give the score to, reset velocity and position, and delay the next throw.
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

    if(!this.gameOver){
        //similar function as the firstQBThrow
        this.time.addEvent({
            delay: Phaser.Math.Between(2000, 4000),
            callback: () => {
                this.sound.play('qbThrow')
                this.qb.play('throw')
                this.football.setVelocity(-300, 0)
            },
            callbackScope: this
        })
    }
}

//display victory screen for the kicker or the qb
victoryScreen(checkKickerScore, checkQBScore, player, pixelTextFont){

/*
    let scoreConfig = {
        fontFamily: 'Impact',
        fontSize: '50Px',
        color: '#FFFFFF',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        }
    }

this.kickerScoreText = this.add.bitmapText(50, 450, 'pixelKey', 'P1:000', 40).setTintFill(0xffffff)
this.qbScoreText = this.add.bitmapText(550, 450, 'pixelKey', 'P2:000', 40).setTintFill(0xffffff)

*/

    if(player == "kicker" && checkKickerScore >= 1000){
        //this.add.bitmaptext(centerX / 2, centerY / 2, "KICKER VICTORY", pixelTextFont).setOrigin(0.5)
        let kickerVictory = this.add.bitmapText(centerX, centerY, pixelTextFont, "KICKER VICTORY", 40).setTintFill(0xffffff).setOrigin(0.5)
        kickerVictory.setDepth(1)
        console.log("in kicker")
        this.sound.play('victorySound1')
        this.gameOver = true
    }
    else if(player = 'qb' && checkQBScore >= 1000){
        //this.add.bitmaptext(centerX / 2, centerY / 2, "QUARTERBACK VICTORY", pixelTextFont).setOrigin(0.5)
        let qbVictory = this.add.bitmapText(centerX, centerY, pixelTextFont, "QUARTERBACK VICTORY", 35).setTintFill(0xffffff).setOrigin(0.5)
        qbVictory.setDepth(1)
        console.log("in qb")
        this.sound.play('victorySound1')
        this.gameOver = true
    }

    //NOTE: if main menu scene exist, sent it to main menu scene
    if(this.gameOver){
        //to restart the play scene
        this.time.addEvent({
            delay: 7000,
            callback: () => {
                this.scene.restart()
            },
            callbackScope: this
        })
    }

}

update() {

        //used for testing
        //this.football.body.setVelocityX(-300)

    if(!this.gameOver){
        //if the kicker kicks the ball
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.kicker.play('kick')
            this.kicker.setSize(5, 5)
            this.kicker.setOffset(25, 14)

            this.time.addEvent({
                delay: 300,
                callback: () => {
                    this.kicker.play('kickerIdle')
                    this.kicker.body.setSize(5, 5)
                    this.kicker.setOffset(10,50)
                    },
                callbackScope: this
            })
        }


        this.physics.add.collider(this.kicker, this.football, (kicker, football) => {
            if(!this.kickSoundFlag){
                this.sound.play('kickSound')
            }
            this.kickSoundFlag = true
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.kickSoundFlag = false
                    },
                callbackScope: this
            })
            this.football.setVelocity(0,-300)
        })

        //the kicker gets 100 points everytime the football is out of bounds
        if (this.football.y < 0 || this.football.y > this.sys.game.config.height) {
            this.resetFootball("kicker", 'pixelKey')
            this.qb.play('qbIdle')
        }

/*      //BUG: when the kicker kicks the ball, it goes way over 100 points depening on the hitbox    
        //the kicker gets 100 points if they successfully kick the footbal
        this.physics.add.collider(this.kicker, this.football, (kicker, football) => {
            this.football.setVelocity(0,-300)
            this.kickerScore += 100
            this.kickerScoreText.setText("P1: " + this.kickerScore)
            this.qbThrow
        })
*/

        //the qb gets 100 points everytime the football is out of bounds
        if (this.football.x < 0 || this.football.x > this.sys.game.config.width) {
            this.resetFootball("qb",'pixelKey')
            this.qb.play('qbIdle')
        }
    }
}
}