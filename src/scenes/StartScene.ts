import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";
import { defaultTextStyle } from "../constants/defaultTextStyle";

export class StartScene extends AbstractScene {
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

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start(SceneKeys.GAME);
    });
  }

  createStartText(): void {
    this.add
      .text(
        this.scene.scene.scale.width / 2,
        this.scene.scene.scale.height / 2,
        "Press SPACE to start the game.",
        defaultTextStyle
      )
      .setOrigin(0.5, 0.5);
  }
}
