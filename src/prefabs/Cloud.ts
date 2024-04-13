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
      AssetKeys.CLOUD
    );
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    if (this.body && this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.allowGravity = false;
    }
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
    this.setGravityY(0);
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

  static generateRandomYPosition(scene: GameScene): number {
    return Phaser.Math.Between(
      scene.cameras.main.height * 0.1,
      scene.cameras.main.height * 0.4
    );
  }
}
