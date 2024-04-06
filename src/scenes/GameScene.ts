import * as Phaser from "phaser";

import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";

export class GameScene extends AbstractScene {
  constructor() {
    super({ key: SceneKeys.GAME, active: false });
  }

  init(): void {
    super.init();
  }

  preload(): void {}

  create(): void {
    super.create();
  }

  update(_time: number, _delta: number): void {}
}
