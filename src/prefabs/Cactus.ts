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
      Cactus.generateRandomCactus()
    );
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    if (this.body) {
      this.body.enable = true;
    }

    this.setDepth(2);
    this.setOrigin(1, 1);

    this.subscribeOnUpdates();
  }

  detectPositionForDestroy(): void {
    if (this.x < -this.width) {
      this.unSubscribeFromUpdates();
      this.destroy();
    }
  }

  subscribeOnUpdates(): void {
    this.scene.events.on(
      Phaser.Scenes.Events.UPDATE,
      this.detectPositionForDestroy,
      this
    );
  }

  unSubscribeFromUpdates(): void {
    this.scene.events.off(
      Phaser.Scenes.Events.UPDATE,
      this.detectPositionForDestroy,
      this
    );
  }

  static generateRandomXPosition(scene: GameScene): number {
    return scene.cameras.main.width + Phaser.Math.Between(100, 600);
  }

  static generateRandomCactus():
    | AssetKeys.CACTUS_1
    | AssetKeys.CACTUS_2
    | AssetKeys.CACTUS_3 {
    const randomCactusNumber = Phaser.Math.Between(1, 3);

    switch (randomCactusNumber) {
      case 1:
        return AssetKeys.CACTUS_1;
      case 2:
        return AssetKeys.CACTUS_2;
      case 3:
        return AssetKeys.CACTUS_3;
      default:
        return AssetKeys.CACTUS_1;
    }
  }
}
