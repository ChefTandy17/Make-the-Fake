class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene')
    }

    preload() {

        this.titleScreenWhite = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 49.50).setTintFill(0xc4ced4).setOrigin(0.5)
        this.titleScreenRed = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 50).setTintFill(0xe31837).setOrigin(0.5)
        this.titleScreenBlue = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 50.50).setTintFill(0x002b5c).setOrigin(0.5)

        this.kickerDirectionRulesText = this.add.bitmapText(centerX, centerY / 2, 'pixelKey', 'KICKER:PRESS SPACE TO KICK', 20).setTintFill(0x002b5c).setOrigin(0.5)
        this.kickerDirectionRulesText = this.add.bitmapText(centerX, centerY / 2 + 50, 'pixelKey', 'KICKING THE FOOTBALL EQUALS 100 POINTS', 20).setTintFill(0x002b5c).setOrigin(0.5)
        
        this.qbDirectionRulesText = this.add.bitmapText(centerX, centerY / 2 + 100, 'pixelKey', 'QUARTERBACK(QB):PRESS UP KEY TO INCREASE VELOCITY', 20).setTintFill(0xe31837).setOrigin(0.5)
        this.qbDirectionRulesText = this.add.bitmapText(centerX, centerY / 2 + 130, 'pixelKey', 'PRESS DOWN KEY TO DECREASE VELOCITY', 20).setTintFill(0xe31837).setOrigin(0.5)
        this.qbDirectionRulesText = this.add.bitmapText(centerX, centerY / 2 + 160, 'pixelKey', 'PRESS ENTER TO THROW', 20).setTintFill(0xe31837).setOrigin(0.5)
        this.qbDirectionRulesText = this.add.bitmapText(centerX, centerY / 2 + 210, 'pixelKey', 'EACH MISS BY KICKER EQUALS 100 POINTS', 20).setTintFill(0xe31837).setOrigin(0.5)

        this.winConditionText = this.add.bitmapText(centerX, centerY / 2 + 290, 'pixelKey', 'REACH 1,000 POINTS TO WIN', 20).setTintFill(0xfdbb30).setOrigin(0.5);
        this.spaceBarText = this.add.bitmapText(centerX, centerY / 2 + 340, 'pixelKey', 'PRESS SPACE TO GO BACK TO MENU', 30).setTintFill(0xfdbb30).setOrigin(0.5)

    }

    create() {
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start('menuScene');
        }
    }

}