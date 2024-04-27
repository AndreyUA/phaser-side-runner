import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";
import { defaultTextStyle } from "../constants/defaultTextStyle";
import { AssetKeys } from "../constants/assetKeys";

export class StartScene extends AbstractScene {
  isFirstStart: boolean = true;

  constructor() {
    super({ key: SceneKeys.START, active: false });
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

    this.input.keyboard.once("keydown-ENTER", () => {
      this.sound.stopByKey(AssetKeys.DIED);
      this.isFirstStart = false;

      // TODO: add condition to check if the player has selected a character
      // (from session storage)
      this.scene.start(SceneKeys.SELECT_CHARACTER);
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
        }`,
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
