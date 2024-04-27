import * as Phaser from "phaser";

import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";

export class SelectCharacterScene extends AbstractScene {
  constructor() {
    super({ key: SceneKeys.SELECT_CHARACTER, active: false });
  }

  init(): void {
    super.init();
  }

  preload(): void {
    // TODO: load background image here
  }

  create(): void {
    super.create();

    this.scene.start(SceneKeys.GAME);
  }

  update(_time: number, _delta: number): void {}
}
