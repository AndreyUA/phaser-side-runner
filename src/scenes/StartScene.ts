import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";
import { defaultTextStyle } from "../constants/defaultTextStyle";
import { AssetKeys } from "../constants/assetKeys";
import { DinoType } from "../constants/dinoType";
import { SessionStorageKeys } from "../constants/sessionStorageKeys";

export class StartScene extends AbstractScene {
  isFirstStart: boolean = true;
  isDinoSelected: boolean = false;

  constructor() {
    super({ key: SceneKeys.START, active: false });

    try {
      const selectedCharacter = globalThis.sessionStorage.getItem(
        SessionStorageKeys.SELECTED_CHARACTER
      ) as keyof typeof DinoType;

      if (
        !selectedCharacter ||
        !(selectedCharacter in DinoType) ||
        !DinoType[selectedCharacter]
      ) {
        return;
      }

      this.isDinoSelected = true;
    } catch (error) {
      this.isDinoSelected = false;
    }
  }

  init(): void {
    super.init();
  }

  preload(): void {}

  create(): void {
    super.create();

    this.createStartText();
    this.createTapListener();
    StartScene.initFullScreenListeners(this);
  }

  update(_time: number, _delta: number): void {}

  createTapListener(): void {
    if (!this?.input?.keyboard) {
      return;
    }

    this.input.keyboard.once("keydown-S", () => {
      this.sound.stopByKey(AssetKeys.DIED);

      try {
        globalThis.sessionStorage.removeItem(
          SessionStorageKeys.SELECTED_CHARACTER
        );
      } catch (error) {
        console.error("Error removing selected character", error);
      } finally {
        this.scene.start(SceneKeys.SELECT_CHARACTER);
      }
    });

    this.input.keyboard.once("keydown-ENTER", () => {
      this.sound.stopByKey(AssetKeys.DIED);
      this.isFirstStart = false;

      try {
        const selectedCharacter = globalThis.sessionStorage.getItem(
          SessionStorageKeys.SELECTED_CHARACTER
        ) as keyof typeof DinoType;

        if (
          !selectedCharacter ||
          !(selectedCharacter in DinoType) ||
          !DinoType[selectedCharacter]
        ) {
          this.scene.start(SceneKeys.SELECT_CHARACTER);

          return;
        }

        this.scene.start(SceneKeys.GAME, {
          selectedCharacter,
        });
      } catch (_error) {
        this.scene.start(SceneKeys.SELECT_CHARACTER);
      }
    });
  }

  createStartText(): void {
    if (!this.isFirstStart) {
      this.sound.play(AssetKeys.DIED, { volume: 1, loop: false });

      this.add
        .text(
          this.scene.scene.scale.width / 2,
          this.scene.scene.scale.height / 2 - 200,
          "YOU DIED",
          {
            fontSize: "120px",
            color: "#8B0000",
          }
        )
        .setOrigin(0.5, 0.5);
    }

    this.add
      .text(
        this.scene.scene.scale.width / 2,
        this.scene.scene.scale.height / 2,
        `Press ENTER to start the game.\n\n      Use SPACE to jump.${
          StartScene.isFullScreenAvailable(this)
            ? "\n\n  Use F to toggle fullscreen."
            : ""
          // TODO: it is not working
        }${this.isDinoSelected ? "\n\n     Use S to change dino!" : ""}`,
        defaultTextStyle
      )
      .setOrigin(0.5, 0.5);
  }

  static initFullScreenListeners(scene: AbstractScene): void {
    if (!scene?.input?.keyboard || !StartScene.isFullScreenAvailable(scene)) {
      return;
    }

    scene.input.keyboard.on("keydown-F", () => {
      if (!StartScene.isFullScreen(scene)) {
        scene.scale.startFullscreen();
      }
    });
  }

  static isFullScreenAvailable(scene: AbstractScene): boolean {
    return scene.sys.game.device.fullscreen.available;
  }

  static isFullScreen(scene: AbstractScene): boolean {
    return scene.scale.isFullscreen;
  }
}
