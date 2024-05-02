import * as Phaser from "phaser";

import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";
import { AssetKeys } from "../constants/assetKeys";
import { StartScene } from "./StartScene";
import { BLACK, WARM_GREEN } from "../constants/hexColors";
import { DinoType } from "../constants/dinoType";
import { SessionStorageKeys } from "../constants/sessionStorageKeys";

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
    this.createFaces();

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

  createFaces(): void {
    // TODO: place tyrannosaurus face here
    this.add
      .image(
        this.scene.scene.scale.width / 2 - 400 + 10,
        this.scene.scene.scale.height / 2 - 250 + 10,
        AssetKeys.DINO_FACE_SPINOSAURUS
      )
      .setOrigin(0, 0)
      .setDepth(1);

    this.add
      .image(
        this.scene.scene.scale.width / 2 + 100 + 10,
        this.scene.scene.scale.height / 2 - 250 + 10,
        AssetKeys.DINO_FACE_SPINOSAURUS
      )
      .setOrigin(0, 0)
      .setDepth(1);
  }

  createTapListener(): void {
    if (!this?.input?.keyboard) {
      return;
    }

    this.input.keyboard.once("keydown-ENTER", () => {
      try {
        globalThis.sessionStorage.setItem(
          SessionStorageKeys.SELECTED_CHARACTER,
          this.selectedCharacter
        );
      } catch (_error) {
        console.error("Failed to save selected character to session storage");
      } finally {
        this.scene.start(SceneKeys.GAME, {
          selectedCharacter: this.selectedCharacter,
        });
      }
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
