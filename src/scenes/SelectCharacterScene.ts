import * as Phaser from "phaser";

import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";
import { AssetKeys } from "../constants/assetKeys";
import { StartScene } from "./StartScene";
import { BLACK, WARM_GREEN } from "../constants/hexColors";
import { DinoType } from "../constants/dinoType";

export class SelectCharacterScene extends AbstractScene {
  selector: Phaser.GameObjects.Graphics | null = null;
  selectedCharacter: DinoType = DinoType.TYRANNOSAUR;

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

    this.createBackground();
    this.createCharacterSelection();
    this.createTapListener();

    StartScene.initFullScreenListeners(this);
  }

  update(_time: number, _delta: number): void {}

  createBackground(): void {
    this.add.image(0, 0, AssetKeys.BACKGROUND).setOrigin(0, 0);
  }

  createCharacterSelection(): void {
    this.add
      .graphics()
      .fillStyle(BLACK, 0.5)
      .fillRoundedRect(
        this.scene.scene.scale.width / 2 - 400,
        this.scene.scene.scale.height / 2 - 250,
        300,
        300
      );
    this.add
      .graphics()
      .fillStyle(BLACK, 0.5)
      .fillRoundedRect(
        this.scene.scene.scale.width / 2 + 100,
        this.scene.scene.scale.height / 2 - 250,
        300,
        300
      );

    this.selector = this.add
      .graphics()
      .fillStyle(WARM_GREEN, 0.5)
      .fillRoundedRect(
        this.scene.scene.scale.width / 2 - 400,
        this.scene.scene.scale.height / 2 - 250,
        300,
        300
      );
    this.selectedCharacter = DinoType.TYRANNOSAUR;
  }

  createTapListener(): void {
    if (!this?.input?.keyboard) {
      return;
    }

    this.input.keyboard.once("keydown-ENTER", () => {
      this.scene.start(SceneKeys.GAME, {
        selectedCharacter: this.selectedCharacter,
      });
    });

    this.input.keyboard.on("keydown-LEFT", () => {
      this.selectedCharacter = DinoType.TYRANNOSAUR;
      this.selector?.destroy();

      this.selector = this.add
        .graphics()
        .fillStyle(WARM_GREEN, 0.5)
        .fillRoundedRect(
          this.scene.scene.scale.width / 2 - 400,
          this.scene.scene.scale.height / 2 - 250,
          300,
          300
        );
    });

    this.input.keyboard.on("keydown-RIGHT", () => {
      this.selectedCharacter = DinoType.SPINOSAURUS;
      this.selector?.destroy();

      this.selector = this.add
        .graphics()
        .fillStyle(WARM_GREEN, 0.5)
        .fillRoundedRect(
          this.scene.scene.scale.width / 2 + 100,
          this.scene.scene.scale.height / 2 - 250,
          300,
          300
        );
    });
  }
}
