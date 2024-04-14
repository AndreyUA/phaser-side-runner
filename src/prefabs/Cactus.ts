import * as Phaser from "phaser";

import { GameScene } from "../scenes/GameScene";
import { AssetKeys } from "../constants/assetKeys";

export class Cactus extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;

  constructor(scene: GameScene) {
    super(
      scene,
      Cactus.generateRandomXPosition(scene),
      scene.cameras.main.height,
      AssetKeys.CACTUS
    );
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    if (this.body) {
      this.body.enable = true;
    }
    if (this.body && this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.allowGravity = false;
    }

    this.setDepth(2);
    this.setOrigin(1, 1);

    this.startCactusMovement();
  }

  startCactusMovement(): void {
    this.setVelocityX(-660);
  }

  static generateRandomXPosition(scene: GameScene): number {
    return scene.cameras.main.width + Phaser.Math.Between(100, 600);
  }
}
