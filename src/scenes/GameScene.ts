import * as Phaser from "phaser";

import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";
import { Dino } from "../prefabs/Dino";

export class GameScene extends AbstractScene {
  spaceCursor: Phaser.Input.Keyboard.Key | null = null;
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
    this.createCursorKeys();
  }

  update(_time: number, _delta: number): void {
    this.dino?.onMove();
  }

  createCursorKeys(): void {
    if (!this.input.keyboard) {
      return;
    }

    this.spaceCursor = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  createDino(): void {
    this.dino = new Dino(this);
  }
}
