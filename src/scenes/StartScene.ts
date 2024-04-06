import * as Phaser from "phaser";

import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";

export class StartScene extends AbstractScene {
  constructor() {
    super({ key: SceneKeys.START, active: false });
  }

  init(): void {
    super.init();
  }

  preload(): void {}

  create(): void {
    super.create();

    this.scene.start(SceneKeys.GAME);
  }

  update(_time: number, _delta: number): void {}
}
