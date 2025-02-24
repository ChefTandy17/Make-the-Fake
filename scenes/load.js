class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        
        //used Nathan Altice Paddle Parkcour with modifcations to help create the loading screen
        this.bmoColor = this.add.rectangle(centerX, centerY, 1000, 500, 0xD9FDDC).setOrigin(0.5)

        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()                                 
            loadingBar.fillStyle(0x000000, 1);                  
            loadingBar.fillRect(0, centerY, game.config.width * value, 5);  
        });
        this.load.on('complete', () => {
            loadingBar.destroy()
        });

        this.load.path = './assets/'
        
        this.load.image('player','img/Player.png')
        this.load.image('football','img/football.png')

        this.load.audio('kickSound','sfx/kickSound.mp3')
        this.load.audio('kickerScoreSound','sfx/kickerScoreSound.wav')
        this.load.audio('qbScoreSound','sfx/qbScoreSound.wav')
        this.load.audio('victorySound1','sfx/victorySound1.mp3')
        this.load.audio('victorySound2','sfx/victorySound2.mp3')
        this.load.audio('qbThrow','sfx/qbThrow.wav')
        this.load.audio('bmoVL',"sfx/bmoIntro.mp3")

        this.kickSoundFlag = false

        //to load the bitmap font for the Press Start P2 text
        this.load.bitmapFont('pixelKey', 'fonts/pixelText.png', 'fonts/pixelText.xml')

        this.load.spritesheet('kicker','/img/kicker.png',{
            frameWidth: 44,
            frameHeight: 54,
        })
        this.load.spritesheet('qb','img/qb.png',{
            frameWidth: 44,
            frameHeight: 54,
        })

    }
    create() {
        //let.eyes = this.add.graphics()
        // Create BMO's face from Adventure Time
        this.leftEye = this.add.ellipse(centerX - 200, centerY - 50, 30, 50, 0x000000)
        this.rightEye = this.add.ellipse(centerX + 200, centerY - 50, 30, 50, 0x000000)

        let smile = this.add.graphics()
        smile.lineStyle(6, 0x000000, 1)
        smile.beginPath()
        smile.arc(centerX, centerY + 20, 80, Phaser.Math.DegToRad(10), Phaser.Math.DegToRad(170), false)
        smile.strokePath()

        this.sound.play('bmoVL', {
            volume: 3,
        })

        //go to the main menu scene
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.scene.start('playScene') //its set to play scene for testing
            },
            callbackScope: this
        })
    }
}