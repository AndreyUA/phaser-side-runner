import * as Phaser from "phaser";

import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";

export class BootScene extends AbstractScene {
  constructor() {
    super({ key: SceneKeys.BOOT, active: true });
  }

  init(): void {
    super.init();
  }

  preload(): void {
    // TODO: load background image here
  }

  create(): void {
    super.create();

    this.scene.start(SceneKeys.PRELOAD);
  }

  update(_time: number, _delta: number): void {}
}
