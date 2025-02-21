class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init(){

    }

    preload(){
        this.load.image('player','./assets/img/Player.png')
        this.load.image('football','./assets/img/Football.png')
        this.load.bitmapFont('pixelKey', 'pixelText.png', 'pixelText.xml')
    }

//width: 1000, x
//height: 500, y

    create() {
    
    //to create the background for the game
    this.scoringRect = this.add.rectangle(500, 480, 1000, 100, 0x000000) // x, y, width, height, color
    this.purpleRect = this.add.rectangle(500, 330, 1000, 100, 0xdf57f6)
    this.yellowRect = this.add.rectangle(500, 0, 1000, 250, 0xf4f976)
       
    let scoreConfig = {
        fontFamily: 'Impact',
        fontSize: '50Px',
        color: '#FFFFFF',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
    }
       
    this.kickerScore = this.add.text(0, 430, "P1:", scoreConfig)
    this.qbScore = this.add.text(550, 430, "P2:", scoreConfig)
    
    this.kicker = this.physics.add.sprite(200,240, 'player')
    this.kicker.setScale(6)

    this.qb = this.physics.add.sprite(800,240, 'player')
    this.qb.setScale(6)
    this.qb.flipX = -6
}
  
    update() {

    }

}