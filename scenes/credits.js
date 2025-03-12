class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

//Credits:
//Press Start P2 font designed by CodeMan38
//kick greg by djszigen
//Bit Shift by Kevin MacLeod
//BMO voiceline from Adventure Time - Rainly Day Daydream

    preload() {

        this.titleScreenWhite = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 49.50).setTintFill(0xc4ced4).setOrigin(0.5)
        this.titleScreenRed = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 50).setTintFill(0xe31837).setOrigin(0.5)
        this.titleScreenBlue = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 50.50).setTintFill(0x002b5c).setOrigin(0.5)

        this.creditsText = this.add.bitmapText(centerX, centerY / 2, 'pixelKey', 'Press Start P2 font designed by CodeMan38', 15).setTintFill(0x002b5c).setOrigin(0.5)
        this.creditsText = this.add.bitmapText(centerX, centerY / 2 + 30, 'pixelKey', 'Bit Shift by Kevin MacLeod', 15).setTintFill(0x002b5c).setOrigin(0.5)
        this.creditsText = this.add.bitmapText(centerX, centerY / 2 + 60, 'pixelKey', 'kick greg by djszigen', 15).setTintFill(0xe31837).setOrigin(0.5)
        this.creditsText = this.add.bitmapText(centerX, centerY / 2 + 90, 'pixelKey', 'BMO voiceline from Adventure Time episode Rainy Day Daydream', 15).setTintFill(0xe31837).setOrigin(0.5)
        this.creditsText = this.add.bitmapText(centerX, centerY / 2 + 120, 'pixelKey', 'Additional audios were created using jsfxr', 15).setTintFill(0xe31837).setOrigin(0.5)
        this.creditsText = this.add.bitmapText(centerX, centerY / 2 + 150, 'pixelKey', 'Sprites were designed using Piskel', 15).setTintFill(0xe31837).setOrigin(0.5)

        this.spaceBarText = this.add.bitmapText(centerX, centerY / 2 + 340, 'pixelKey', 'PRESS [SPACE] TO GO BACK TO MENU', 30).setTintFill(0xfdbb30).setOrigin(0.5)

    }

    create() {
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.sound.play('qbScoreSound')
            this.scene.start('menuScene');
        }
    }
}