class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    preload() {

        this.titleScreenWhite = this.add.bitmapText(centerX, centerY / 2, 'pixelKey', 'PRO FOOTBALL 1861', 49.50).setTintFill(0xc4ced4).setOrigin(0.5)
        this.titleScreenRed = this.add.bitmapText(centerX, centerY / 2, 'pixelKey', 'PRO FOOTBALL 1861', 50).setTintFill(0xe31837).setOrigin(0.5)
        this.titleScreenBlue = this.add.bitmapText(centerX, centerY / 2, 'pixelKey', 'PRO FOOTBALL 1861', 50.50).setTintFill(0x002b5c).setOrigin(0.5)
        this.directionRules = this.add.bitmapText(centerX, centerY / 2 + 230, 'pixelKey', 'PRESS LEFT ARROW KEY FOR RULES', 30).setTintFill(0x63727a).setOrigin(0.5)
        this.directionCredits = this.add.bitmapText(centerX, centerY / 2 + 260, 'pixelKey', 'PRESS RIGHT ARROW KEY FOR CREDITS', 29).setTintFill(0x63727a).setOrigin(0.5)
        this.play = this.add.bitmapText(centerX, centerY / 2 + 320, 'pixelKey', 'PRESS SPACE TO PLAY', 40).setTintFill(0xfdbb30).setOrigin(0.5);


        this.load.image('footballMenu','assets/img/football.png')

        this.load.spritesheet('footballSpritesheet', 'assets/img/footballMain.png', {
            frameWidth: 16,
            frameHeight: 8,
        })
    }

    create() {
        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('footballSpritesheet', { 
                start: 1, 
                end: 10 
            }),
            frameRate: 10,
            repeat: -1
        });

        this.footballMainMenu = this.physics.add.sprite(centerX, centerY, 'footballSpritesheet');
        this.footballMainMenu.setScale(12);
        this.footballMainMenu.setDepth(0);
        this.footballMainMenu.play('spin');

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.leftkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.rightkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(this.leftkey)) {
            this.scene.start('tutorialScene')
        }
        if (Phaser.Input.Keyboard.JustDown(this.rightkey)) {
            this.scene.start('creditsScene')
        }
    }
}