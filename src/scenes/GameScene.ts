import * as Phaser from "phaser";

import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";
import { Dino } from "../prefabs/Dino";
import { Cloud } from "../prefabs/Cloud";
import { CactusesGroup } from "../prefabs/CactusesGroup";
import { defaultTextStyle } from "../constants/defaultTextStyle";
import { AssetKeys } from "../constants/assetKeys";

export class GameScene extends AbstractScene {
  spaceCursor: Phaser.Input.Keyboard.Key | null = null;
  dino: Dino | null = null;
  cactusesGroup: CactusesGroup | null = null;
  cloudTimer: Phaser.Time.TimerEvent | null = null;
  cactusTimer: Phaser.Time.TimerEvent | null = null;
  scoreTimer: Phaser.Time.TimerEvent | null = null;
  statsText: Phaser.GameObjects.Text | null = null;
  backgroundTileSprite: Phaser.GameObjects.TileSprite | null = null;
  score: number = 0;

  constructor() {
    super({ key: SceneKeys.GAME, active: false });
  }

  init(): void {
    super.init();
  }

  preload(): void {}

  create(): void {
    super.create();

    this.createBackground();
    this.createDino();
    this.createCactusesGroup();
    this.createCursorKeys();
    this.createStatsText();
    this.generateCloud();
    this.initTimers();
  }

  update(_time: number, _delta: number): void {
    this.dino?.onMove();

    if (this.backgroundTileSprite) {
      this.backgroundTileSprite.tilePositionX += 11;
    }
  }

  createBackground(): void {
    this.backgroundTileSprite = this.add
      .tileSprite(
        0,
        0,
        +this.game.config.width,
        +this.game.config.height,
        AssetKeys.BACKGROUND
      )
      .setOrigin(0, 0);
  }

  calculateScore(score: number = 0): string {
    return `Score: ${score}`;
  }

  createCactusesGroup(): void {
    this.cactusesGroup = new CactusesGroup(this);

    this.physics.add.overlap(
      this.dino!,
      this.cactusesGroup,
      this.onOverlap,
      undefined,
      this
    );
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

  createStatsText(): void {
    this.statsText = this.add
      .text(
        this.cameras.main.width * 0.05,
        this.cameras.main.height * 0.05,
        this.calculateScore(),
        defaultTextStyle
      )
      .setOrigin(0, 0)
      .setDepth(3);
  }

  generateCactus(): void {
    this.cactusesGroup?.generateNewCactus();
  }

  generateCloud(): void {
    new Cloud(this);
  }

  onOverlap(): void {
    console.log("GAME OVER");

    this.score = 0;
    this.cloudTimer?.destroy();
    this.cactusTimer?.destroy();
    this.scoreTimer?.destroy();

    this.scene.start(SceneKeys.START);
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
    this.scoreTimer = this.time.addEvent({
      delay: 100,
      callback: this.updateStatsText,
      callbackScope: this,
      loop: true,
    });
  }

  updateStatsText(): void {
    this.score++;
    this.statsText?.setText(this.calculateScore(this.score));
  }
}
