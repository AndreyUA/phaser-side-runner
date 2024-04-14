import * as Phaser from "phaser";

import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";
import { Dino } from "../prefabs/Dino";
import { Cloud } from "../prefabs/Cloud";
import { CactusesGroup } from "../prefabs/CactusesGroup";

export class GameScene extends AbstractScene {
  spaceCursor: Phaser.Input.Keyboard.Key | null = null;
  dino: Dino | null = null;
  cactusesGroup: CactusesGroup | null = null;
  cloudTimer: Phaser.Time.TimerEvent | null = null;
  cactusTimer: Phaser.Time.TimerEvent | null = null;

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
    this.createCactuesGroup();
    this.createCursorKeys();
    this.generateCloud();
    this.initTimers();
  }

  update(_time: number, _delta: number): void {
    this.dino?.onMove();
  }

  createCactuesGroup(): void {
    this.cactusesGroup = new CactusesGroup(this);

    this.physics.add.overlap(
      this.dino!,
      this.cactusesGroup,
      this.onOverlap,
      undefined,
      this
    );
  }

  generateCactus(): void {
    this.cactusesGroup?.generateNewCactus();
  }

  generateCloud(): void {
    new Cloud(this);
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

  onOverlap(): void {
    console.log("dino and cactus overlapped!");
  }

  initTimers(): void {
    this.cloudTimer = this.time.addEvent({
      delay: 3_000,
      callback: this.generateCloud,
      callbackScope: this,
      loop: true,
    });
    this.cactusTimer = this.time.addEvent({
      delay: 1_500,
      callback: this.generateCactus,
      callbackScope: this,
      loop: true,
    });
  }
}
