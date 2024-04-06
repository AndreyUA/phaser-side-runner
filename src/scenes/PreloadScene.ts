import * as Phaser from "phaser";

import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";

export class PreloadScene extends AbstractScene {
  constructor() {
    super({ key: SceneKeys.PRELOAD, active: false });
  }

  init(): void {
    super.init();
  }

  preload(): void {
    // TODO: load assets here
  }

  create(): void {
    super.create();

    this.scene.start(SceneKeys.START);
  }

  update(_time: number, _delta: number): void {}
}
