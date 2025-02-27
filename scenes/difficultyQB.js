class DifficultyQB extends Phaser.Scene {
    constructor() {
        super('qbDifficultyScene');
    }
    preload() {

        this.titleScreenWhite = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 49.50).setTintFill(0xc4ced4).setOrigin(0.5)
        this.titleScreenRed = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 50).setTintFill(0xe31837).setOrigin(0.5)
        this.titleScreenBlue = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 50.50).setTintFill(0x002b5c).setOrigin(0.5)

        
        this.easyModeText = this.add.bitmapText(10,  100, 'pixelKey', '-PRESS ONE: FOR BEGINNER MODE', 30).setTintFill(0x808080)
        this.mediumModeText = this.add.bitmapText(10, 150, 'pixelKey', '-PRESS TWO: FOR INTERMEDIATE MODE', 30).setTintFill(0x002b5c)
        this.expertModeText = this.add.bitmapText(10, 200, 'pixelKey', '-PRESS THREE: FOR EXPERT MODE', 30).setTintFill(0xe31837)

        this.spacebarKey = this.add.bitmapText(10, 250, 'pixelKey', '-PRESS SPACE: TO POSITIONS', 30).setTintFill(0xfdbb30)
    }

    create() {

        this.oneKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        this.twoKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
        this.threeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE)

        this.spacebarKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.playerModelLeft = this.physics.add.sprite(centerX + 350, centerY + 230, 'player')
        this.playerModelLeft.setFlipX(true)
        this.playerModelLeft.setScale(8)
    }

    update() {

        //beginner mode
        if (Phaser.Input.Keyboard.JustDown(this.oneKey)) {
            game.settingsQB = {
                footballVelocity: (Phaser.Math.Between(-300, -500)),
                footballKickedVelocity: -500,    
            }
            this.sound.play('kickerScoreSound')
            this.scene.start('playKickerScene')
        }
        //intermediate mode
        if (Phaser.Input.Keyboard.JustDown(this.twoKey)) {
            game.settingsQB = {
                footballVelocity: (Phaser.Math.Between(-500, -1500)),
                footballKickedVelocity: -900,    
            }
            this.sound.play('kickerScoreSound')
            this.scene.start('playKickerScene')
        }
        //expert mode
        if (Phaser.Input.Keyboard.JustDown(this.threeKey)) {
            game.settingsQB = {
                footballVelocity: (Phaser.Math.Between(-1500, -2500)),
                footballKickedVelocity: -1200,    
            }
            this.sound.play('kickerScoreSound')
            this.scene.start('playKickerScene')
        }

        //back to previous scene
        if (Phaser.Input.Keyboard.JustDown(this.spacebarKey)) {
            this.scene.start('selectPosScene')
        }
    }
}
