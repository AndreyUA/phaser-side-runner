import * as Phaser from "phaser";
import { GameScene } from "../scenes/GameScene";
import { AssetKeys } from "../constants/assetKeys";
import { Animations } from "../constants/animations";

export class Dino extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;

  constructor(scene: GameScene) {
    super(
      scene,
      scene.cameras.main.width * 0.05,
      scene.cameras.main.height * 0.95,
      AssetKeys.DINO_ATLAS,
      "dino-1.png"
    );
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    if (this.body) {
      this.body.enable = true;
    }

    this.setOrigin(0, 1);

    this.generateAtlasAnimation();
  }

  generateAtlasAnimation(): void {
    const frames = this.scene.anims.generateFrameNames(AssetKeys.DINO_ATLAS, {
      prefix: "dino-",
      suffix: ".png",
      start: 1,
      end: 2,
    });

    this.scene.anims.create({
      key: Animations.DINO_ANIMATION,
      frames,
      frameRate: 2,
      repeat: -1,
    });

    this.play(Animations.DINO_ANIMATION);
  }
}
