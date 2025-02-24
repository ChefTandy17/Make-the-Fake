class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorialScene')
    }

    preload() {

        this.titleScreenWhite = this.add.bitmapText(centerX, centerY / 2, 'pixelKey', 'PRO FOOTBALL 1861', 49.50).setTintFill(0xc4ced4).setOrigin(0.5)
        this.titleScreenRed = this.add.bitmapText(centerX, centerY / 2, 'pixelKey', 'PRO FOOTBALL 1861', 50).setTintFill(0xe31837).setOrigin(0.5)
        this.titleScreenBlue = this.add.bitmapText(centerX, centerY / 2, 'pixelKey', 'PRO FOOTBALL 1861', 50.50).setTintFill(0x002b5c).setOrigin(0.5)
        
        this.directionRules = this.add.bitmapText(centerX, centerY / 2 + 200, 'pixelKey', 'PRESS SPACE TO KICK THE BALL', 30).setTintFill(0x63727a).setOrigin(0.5)
        this.directionRules = this.add.bitmapText(centerX, centerY / 2 + 230, 'pixelKey', 'EACH KICK EQUALS 100 POINTS', 28).setTintFill(0x63727a).setOrigin(0.5)
        this.directionRules = this.add.bitmapText(centerX, centerY / 2 + 260, 'pixelKey', 'REACH 1000 POINTS TO WIN', 30).setTintFill(0xfdbb30).setOrigin(0.5);
        this.directionRules = this.add.bitmapText(centerX, centerY / 2 + 290, 'pixelKey', 'PRESS SPACE TO GO BACK TO MENU', 30).setTintFill(0xfdbb30).setOrigin(0.5)

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