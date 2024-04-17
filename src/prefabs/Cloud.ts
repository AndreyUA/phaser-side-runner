import * as Phaser from "phaser";

import { GameScene } from "../scenes/GameScene";
import { AssetKeys } from "../constants/assetKeys";

export class Cloud extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;

  constructor(scene: GameScene) {
    super(
      scene,
      scene.cameras.main.width + 100,
      Cloud.generateRandomYPosition(scene),
      Cloud.generateRandomCloud()
    );
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setDepth(1);

    this.startCloudMovement();
    this.subscribeOnUpdates();
  }

  detectPositionForDestroy(): void {
    if (this.x < -this.width) {
      this.unSubscribeFromUpdates();
      this.destroy();
    }
  }

  startCloudMovement(): void {
    this.setVelocityX(-300);
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

  static generateRandomCloud(): AssetKeys.CLOUD_1 | AssetKeys.CLOUD_2 {
    const randomCactusNumber = Phaser.Math.Between(1, 2);

    switch (randomCactusNumber) {
      case 1:
        return AssetKeys.CLOUD_1;
      case 2:
        return AssetKeys.CLOUD_2;
      default:
        return AssetKeys.CLOUD_1;
    }
  }

  static generateRandomYPosition(scene: GameScene): number {
    return Phaser.Math.Between(
      scene.cameras.main.height * 0.1,
      scene.cameras.main.height * 0.4
    );
  }
}
