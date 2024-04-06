import * as Phaser from "phaser";

import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";
import { AssetKeys } from "../constants/assetKeys";

export class PreloadScene extends AbstractScene {
  constructor() {
    super({ key: SceneKeys.PRELOAD, active: false });
  }

  init(): void {
    super.init();
  }

  preload(): void {
    this.load.atlas(AssetKeys.DINO_ATLAS, "./dino.png", "./dino.json");
  }

  create(): void {
    super.create();

    this.scene.start(SceneKeys.START);
  }

  update(_time: number, _delta: number): void {}
}
