import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";
import { defaultTextStyle } from "../constants/defaultTextStyle";

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
  }

  update(_time: number, _delta: number): void {}

  createTapListener(): void {
    if (!this?.input?.keyboard) {
      return;
    }

    this.input.keyboard.once("keydown-ENTER", () => {
      this.isFirstStart = false;
      this.scene.start(SceneKeys.GAME);
    });
  }

  createStartText(): void {
    if (!this.isFirstStart) {
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
        "Press ENTER to start the game.\n\n      Use SPACE to jump.",
        defaultTextStyle
      )
      .setOrigin(0.5, 0.5);
  }
}
