import * as Phaser from "phaser";

interface InitialInput {
  key: string;
  active: boolean;
}

interface SceneMethods {
  init(): void;
  preload(): void;
  create(): void;
  update(time: number, delta: number): void;
}

export abstract class AbstractScene
  extends Phaser.Scene
  implements SceneMethods
{
  sceneKey: string;

  constructor(initialInput: InitialInput) {
    super(initialInput);

    this.sceneKey = initialInput.key;
  }

  init(): void {
    console.log(`${this.sceneKey} scene was initialized!`);
  }

  preload(): void {}

  create(): void {
    console.log(`${this.sceneKey} scene was created!`);
  }

  update(_time: number, _delta: number): void {}
}
