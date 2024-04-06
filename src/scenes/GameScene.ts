import * as Phaser from "phaser";

import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";
import { Dino } from "../prefabs/Dino";

export class GameScene extends AbstractScene {
  dino: Dino | null = null;

  constructor() {
    super({ key: SceneKeys.GAME, active: false });
  }

  init(): void {
    super.init();
  }

  preload(): void {}

  create(): void {
    super.create();

    this.createDino();
  }

  update(_time: number, _delta: number): void {}

  createDino(): void {
    this.dino = new Dino(this);
  }
}
