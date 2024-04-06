import * as Phaser from "phaser";
import { GameScene } from "../scenes/GameScene";
import { AssetKeys } from "../constants/assetKeys";

export class Dino extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;

  constructor(scene: GameScene) {
    super(scene, 100, 100, AssetKeys.DINO_ATLAS, "dino-1.png");
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    if (this.body) {
      this.body.enable = true;
    }
  }
}
