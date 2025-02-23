class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init(){

    }

    preload(){
        
        this.load.image('player','./assets/img/Player.png')
        this.load.image('football','./assets/img/football.png')

        this.load.bitmapFont('pixelKey', 'pixelText.png', 'pixelText.xml')

        this.load.spritesheet('kicker','./assets/img/kicker.png',{
            frameWidth: 44,
            frameHeight: 54,
        })
        this.load.spritesheet('qb','./assets/img/qb.png',{
            frameWidth: 44,
            frameHeight: 54,
        })
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
    
    this.kickerScore = 0
    this.qbScore = 0
    
    this.kickerScoreText = this.add.text(50, 430, "P1: ", scoreConfig)
    this.qbScoreText = this.add.text(550, 430, "P2: ", scoreConfig)
    

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
                this.qb.play('throw')
                this.football.setVelocity(-300,0)
                },
            callbackScope: this,
            loop: false,               //to perform this only once
        })
}

//when the football is out of bounds, figure out who to give the score to, reset velocity and position, and delay the next throw.
resetFootball(player) {
    this.football.setPosition(770, 150)
    this.football.setVelocity(0, 0)

    if (player == 'kicker') {
        this.kickerScore += 100
        this.kickerScoreText.setText("P1: " + this.kickerScore)
    } 
    else if (player == 'qb') {
        this.qbScore += 100
        this.qbScoreText.setText("P2: " + this.qbScore)
    }
    else{
        console.log("hello there :)")
    }

    //similar function as the firstQBThrow
    this.time.addEvent({
        delay: Phaser.Math.Between(2000, 4000),
        callback: () => {
            this.qb.play('throw')
            this.football.setVelocity(-300, 0)
        },
        callbackScope: this
    })
}

update() {

        //used for testing
        //this.football.body.setVelocityX(-300)

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
            this.football.setVelocity(0,-300)
        })

        if (this.football.y < 0 || this.football.y > this.sys.game.config.height) {
            this.resetFootball("kicker")
            this.qb.play('qbIdle')
        }

/*      //when the kicker kicks the ball, it goes way over 100 points depening on the hitbox    
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
            this.resetFootball("qb")
            this.qb.play('qbIdle')
        }
}
}