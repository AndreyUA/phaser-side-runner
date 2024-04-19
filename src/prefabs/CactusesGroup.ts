import * as Phaser from "phaser";

import { GameScene } from "../scenes/GameScene";
import { Cactus } from "./Cactus";

export class CactusesGroup extends Phaser.Physics.Arcade.Group {
  scene: GameScene;

  constructor(scene: GameScene) {
    super(scene.physics.world, scene);

    this.scene = scene;
  }

  generateNewCactus(): void {
    const cactus = new Cactus(this.scene);

    this.add(cactus);
  }

  moveGroup(): void {
    this.children.iterate((cactus) => {
      if (cactus instanceof Cactus) {
        cactus.move();

        return true;
      }

      return false;
    });
  }
}
