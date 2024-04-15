import * as Phaser from "phaser";

import { GameScene } from "../scenes/GameScene";
import { AssetKeys } from "../constants/assetKeys";
import { Animations } from "../constants/animations";
import { DINO_DIMENSIONS } from "../constants/dinoDimensions";

export class Dino extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;

  constructor(scene: GameScene) {
    super(
      scene,
      scene.cameras.main.width * 0.05,
      scene.cameras.main.height - DINO_DIMENSIONS.height,
      AssetKeys.DINO_ATLAS,
      "dino-1.png"
    );
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    if (this.body) {
      this.body.enable = true;
    }
    if (this.body && this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body?.setGravityY(4_000);
    }
    this.setDepth(2);

    this.setOrigin(0, 0);
    this.setCollideWorldBounds(true);

    this.generateAtlasAnimation();
  }

  generateAtlasAnimation(): void {
    if (this.scene.anims.exists(Animations.DINO_ANIMATION)) {
      this.play(Animations.DINO_ANIMATION);

      return;
    }

    const frames = this.scene.anims.generateFrameNames(AssetKeys.DINO_ATLAS, {
      prefix: "dino-",
      suffix: ".png",
      start: 1,
      end: 2,
    });

    this.scene.anims.create({
      key: Animations.DINO_ANIMATION,
      frames,
      frameRate: 4,
      repeat: -1,
    });

    this.play(Animations.DINO_ANIMATION);
  }

  onMove(): void {
    if (!this.scene || !this.scene.spaceCursor) {
      return;
    }

    const isDinoOnTheGround = this.body?.blocked?.down;
    const isSpaceKeyDown = Phaser.Input.Keyboard.JustDown(
      this.scene.spaceCursor
    );

    if (isDinoOnTheGround && isSpaceKeyDown) {
      this.setVelocityY(-1_600);
    }
  }
}
