class Difficulty extends Phaser.Scene {
    constructor() {
        super('difficultyScene');
    }
    preload() {

        this.titleScreenWhite = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 49.50).setTintFill(0xc4ced4).setOrigin(0.5)
        this.titleScreenRed = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 50).setTintFill(0xe31837).setOrigin(0.5)
        this.titleScreenBlue = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 50.50).setTintFill(0x002b5c).setOrigin(0.5)

        this.onePlayerModeText = this.add.bitmapText(10,  100, 'pixelKey', '-PRESS ONE FOR SINGLE PLAYER', 30).setTintFill(0x002b5c)
        this.twoPlayerModeText = this.add.bitmapText(10, 150, 'pixelKey', '-PRESS TWO FOR TWO PLAYER (CS)', 30).setTintFill(0x000000) //0xe31837
        this.backToMenuText = this.add.bitmapText(10, 200, 'pixelKey', '-PRESS SPACE TO MENU', 30).setTintFill(0xfdbb30)

        this.add.image('player','assets/img/Player.png')
    }

    create() {

        this.oneKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        this.twoKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)

        this.spacebarKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.playerModelLeft = this.physics.add.sprite(centerX + 350, centerY + 200, 'player')
        this.playerModelLeft.setFlipX(true)
        this.playerModelLeft.setScale(8)

        this.playerModelRight = this.physics.add.sprite(centerX - 350, centerY + 200, 'player')
        this.playerModelRight.setFlipX(false)
        this.playerModelRight.setScale(8)

        //this.football = this.physics.add.sprite(centerX, centerY + 200,'football')
        //this.football.setScale(6)
 
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.oneKey)) {
            this.sound.play('kickerScoreSound')
            this.scene.start('playScene')
        }
        /*
        if (Phaser.Input.Keyboard.JustDown(this.twoKey)) {
            this.sound.play('kickerScoreSound')
            this.scene.start('playScene')
        }
        */
        if (Phaser.Input.Keyboard.JustDown(this.spacebarKey)) {
            this.scene.start('menuScene')
        }

    }
}
