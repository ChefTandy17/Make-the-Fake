class SelectPos extends Phaser.Scene {
    constructor() {
        super('selectPosScene');
    }
    preload() {

        this.titleScreenWhite = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 49.50).setTintFill(0xc4ced4).setOrigin(0.5)
        this.titleScreenRed = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 50).setTintFill(0xe31837).setOrigin(0.5)
        this.titleScreenBlue = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 50.50).setTintFill(0x002b5c).setOrigin(0.5)

        this.kickerText = this.add.bitmapText(10,  100, 'pixelKey', '-PRESS [ONE]: TO BE KICKER', 30).setTintFill(0x002b5c)
        this.qbText = this.add.bitmapText(10, 150, 'pixelKey', '-PRESS [TWO]: TO BE QUARTERBACK', 30).setTintFill(0xe31837) 

        this.spacebarKey = this.add.bitmapText(10, 230, 'pixelKey', '-PRESS [SPACE]: TO PLAYER SELECTION', 27).setTintFill(0xfdbb30)
    }

    create() {

        this.oneKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        this.twoKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
        this.threeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE)

        this.spacebarKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        //displays the football player
        this.playerModelLeft = this.physics.add.sprite(centerX + 350, centerY + 230, 'player')
        this.playerModelLeft.setFlipX(true)
        this.playerModelLeft.setScale(8)

        this.playerModelRight = this.physics.add.sprite(centerX - 350, centerY + 230, 'player')
        this.playerModelRight.setFlipX(false)
        this.playerModelRight.setScale(8)
    }

    update() {

        //if the player wants to be the kicker
        if (Phaser.Input.Keyboard.JustDown(this.oneKey)) {
            this.sound.play('kickerScoreSound')
            this.scene.start('qbDifficultyScene')
        }
        //if the player wants to be the kicker
        if (Phaser.Input.Keyboard.JustDown(this.twoKey)) {
            this.sound.play('kickerScoreSound')
            this.scene.start('kickerDifficultyScene')
        }
        //go back to select the number of players
        if (Phaser.Input.Keyboard.JustDown(this.spacebarKey)) {
            this.sound.play('qbScoreSound')
            this.scene.start('numPlayersScene')
        }

    }
}
