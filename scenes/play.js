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
       
    let scoreConfig = {
        fontFamily: '',
        fontSize: '64px',
        color: '#FFFFFF',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 100
    }
       
    this.kickerScore = this.add.text(0, 0, "P1:", scoreConfig)


    //rect.setStrokeStyle(15, 0x000000) //to create border lines. if needed
    }
  
    update() {

    }

}