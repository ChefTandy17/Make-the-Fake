class NumPlayers extends Phaser.Scene {
    constructor() {
        super('numPlayersScene');
    }
    preload() {

        this.titleScreenWhite = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 49.50).setTintFill(0xc4ced4).setOrigin(0.5)
        this.titleScreenRed = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 50).setTintFill(0xe31837).setOrigin(0.5)
        this.titleScreenBlue = this.add.bitmapText(centerX, centerY / 6, 'pixelKey', 'PRO FOOTBALL 1861', 50.50).setTintFill(0x002b5c).setOrigin(0.5)

        this.onePlayerModeText = this.add.bitmapText(10,  100, 'pixelKey', '-PRESS ONE: FOR SINGLE PLAYER', 30).setTintFill(0x002b5c)
        this.twoPlayerModeText = this.add.bitmapText(10, 150, 'pixelKey', '-PRESS TWO: FOR TWO PLAYER (CS)', 30).setTintFill(0x000000) //0xe31837
        this.backToMenuText = this.add.bitmapText(10, 230, 'pixelKey', '-PRESS SPACE: TO MENU', 30).setTintFill(0xfdbb30)

        this.add.image('player','assets/img/Player.png')
    }

    create() {

        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('footballSpritesheet', { 
                start: 0, 
                end: 8 
            }),
            frameRate: 10,
            repeat: -1
        });

        this.footballSelectPlayers = this.physics.add.sprite(centerX, centerY + 100, 'footballSpritesheet');
        this.footballSelectPlayers.setScale(12);
        this.footballSelectPlayers.setDepth(0);
        this.footballSelectPlayers.play('spin');

        this.oneKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        this.twoKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)

        this.spacebarKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {

        //NOTE: SEND IT TO NUMPLAY -> POSITION -> DIFFICULTY -> RULES(Maybe) -> PLAY SCENE

        //One player mode. Goes to position select screen
        if (Phaser.Input.Keyboard.JustDown(this.oneKey)) {
            this.sound.play('kickerScoreSound')
            this.scene.start('selectPosScene')
            //this.scene.start('playScene')
        }
        /*
        //NOTE: SEND IT TO A DIFFERENT SCENE
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
