class PlayQB extends Phaser.Scene {
    constructor() {
        super('playQBScene')
    }

    init(){
        this.qbVelocity = -500
        this.gameSceneFlag = false
    }

    create() {

        

    //to create the background for the game
    this.scoringRect = this.add.rectangle(500, 480, 1000, 100, 0x000000) // x, y, width, height, color
    this.purpleRect = this.add.rectangle(500, 330, 1000, 100, 0xdf57f6)
    this.yellowRect = this.add.rectangle(500, 0, 1000, 250, 0xf4f976)

    this.kickerScore = 0
    this.qbScore = 0

    this.kickerScoreText = this.add.bitmapText(50, 450, 'pixelKey', 'P1:000', 40).setTintFill(0xffffff)
    this.qbScoreText = this.add.bitmapText(550, 450, 'pixelKey', 'P2:000', 40).setTintFill(0xffffff)

    //for the qb to throw the football, pressing up creates +100 velocity while -50 to slow velocity
    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)

    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

    //maybe to be used to increase or decrease the time
    //this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    //this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)



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
}

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
        //this.add.bitmaptext(centerX / 2, centerY / 2, "QUARTERBACK VICTORY", pixelTextFont).setOrigin(0.5)
        let qbVictoryBlue = this.add.bitmapText(centerX, centerY, pixelTextFont, "QUARTERBACK VICTORY", 34.5).setTintFill(0x1D428A).setOrigin(0.5)
        let qbVictoryYellow = this.add.bitmapText(centerX, centerY, pixelTextFont, "QUARTERBACK VICTORY", 35).setTintFill(0xfDc72c).setOrigin(0.5)
        qbVictoryBlue.setDepth(1)
        qbVictoryYellow.setDepth(1)
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
                this.scene.start('menuScene');
                //this.scene.restart()
            },
            callbackScope: this
        })
    }

}
/*
game.settingsKicker = {
    kickerReaction: (Phaser.Math.Between(8000, 10000)),
    kickerResetPos: (Phaser.Math.Between(1000, 1200)),
    kickerIdlePos:  (Phaser.Math.Between(1200, 1400))
}
*/

update() {

    if(!this.gameOver){
        
        //this.qbVelocity = -500
        //this.gameSceneFlag = false   

        if(Phaser.Input.Keyboard.JustDown(this.upKey)){
            this.qbVelocity -= 50
        }

        if(Phaser.Input.Keyboard.JustDown(this.downKey)){
            //to ensure the player doesn't hit a very low velocity
            if(this.qbVelocity <= -100){
                this.qbVelocity == -100
            }
            else{
                this.qbVelocity += 25
            }
        }     

        if(Phaser.Input.Keyboard.JustDown(this.enterKey)){ 
            //to disable the keys
            this.upKey.enabled = false
            this.downKey.enabled = false
            this.enterKey.enabled = false

            this.gameSceneFlag = true
        }

        if(this.gameSceneFlag == true){

            this.football.setVelocity(this.qbVelocity, 0)

            //the kicker gets 100 points everytime the football is out of bounds
            if (this.football.y < 0 || this.football.y > this.sys.game.config.height) {
                this.gameSceneFlag = false
                this.resetFootball("kicker", 'pixelKey')
                this.qb.play('qbIdle')
            }

            //the qb gets 100 points everytime the football is out of bounds
            if (this.football.x < 0 || this.football.x > this.sys.game.config.width) {
                this.gameSceneFlag = false
                this.resetFootball("qb",'pixelKey')
                this.qb.play('qbIdle')

            }
        }
    }
}
}