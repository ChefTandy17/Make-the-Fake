class DifficultyKicker extends Phaser.Scene {
    constructor() {
        super('kickerDifficultyScene');
    }
    preload() {

        this.titleScreenWhite = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 49.50).setTintFill(0xc4ced4).setOrigin(0.5)
        this.titleScreenRed = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 50).setTintFill(0xe31837).setOrigin(0.5)
        this.titleScreenBlue = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 50.50).setTintFill(0x002b5c).setOrigin(0.5)

        this.easyModeText = this.add.bitmapText(10,  100, 'pixelKey', '-PRESS ONE: BEGINNER MODE', 30).setTintFill(0x808080)
        this.mediumModeText = this.add.bitmapText(10, 150, 'pixelKey', '-PRESS TWO: INTERMEDIATE MODE', 30).setTintFill(0x002b5c)
        this.expertModeText = this.add.bitmapText(10, 200, 'pixelKey', '-PRESS THREE: EXPERT MODE', 30).setTintFill(0xe31837)

        this.spacebarKey = this.add.bitmapText(10, 250, 'pixelKey', '-PRESS SPACE: TO POSITIONS', 30).setTintFill(0xfdbb30)
    }

    create() {

        this.oneKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        this.twoKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
        this.threeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE)

        this.spacebarKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.playerModelRight = this.physics.add.sprite(centerX - 350, centerY + 250, 'player')
        this.playerModelRight.setFlipX(false)
        this.playerModelRight.setScale(8)
    }

    update() {

        //beginner mode
        if (Phaser.Input.Keyboard.JustDown(this.oneKey)) {
            game.settingsKicker = {
                kickerReaction: (Phaser.Math.Between(500, 1000)),
                kickerIdlePos: 1000
            }
            this.sound.play('kickerScoreSound')
            this.scene.start('playQBScene')
        }

        //intermediate mode
        if (Phaser.Input.Keyboard.JustDown(this.twoKey)) {
            let randomNum = Math.random()
            let kickerReactionTimer
            if(randomNum < 0.2){
                kickerReactionTimer = Phaser.Math.Between(100, 500)
            }
            else{
                kickerReactionTimer = Phaser.Math.Between(500, 1000)
            }
            game.settingsKicker = {
                kickerReaction: kickerReactionTimer,
                kickerIdlePos: 1000
            }
            this.sound.play('kickerScoreSound')
            this.scene.start('playQBScene')
        }
        
        //expert mode
        if (Phaser.Input.Keyboard.JustDown(this.threeKey)) {
            let randomNum = Math.random()
            let kickerReactionTimer
            if(randomNum < 0.3){
                kickerReactionTimer = Phaser.Math.Between(100, 300)
            }
            else if(0.3 <= randomNum < 0.6){
                kickerReactionTimer = Phaser.Math.Between(400, 800)
            }
            else{
                kickerReactionTimer = Phaser.Math.Between(900,1000)
            }
            game.settingsKicker = {
                kickerReaction: kickerReactionTimer,
                kickerIdlePos: 1000
            }
            this.sound.play('kickerScoreSound')
            this.scene.start('playQBScene')
        }

        //back to previous scene
        if (Phaser.Input.Keyboard.JustDown(this.spacebarKey)) {
            this.scene.start('selectPosScene')
        }
    }
}