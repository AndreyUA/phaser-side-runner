import { AbstractScene } from "./AbstractScene";
import { SceneKeys } from "../constants/sceneKeys";
import { AssetKeys } from "../constants/assetKeys";

export class PreloadScene extends AbstractScene {
  constructor() {
    super({ key: SceneKeys.PRELOAD, active: false });
  }

  init(): void {
    super.init();
  }

  preload(): void {
    this.load.atlas(
      AssetKeys.DINO_ATLAS_SPINOSAURUS,
      "./dino_a.png",
      "./dino_a.json"
    );
    this.load.atlas(
      AssetKeys.DINO_ATLAS_TYRANNOSAURUS,
      "./dino_b.png",
      "./dino_b.json"
    );

    this.load.image(AssetKeys.BACKGROUND, "./background.png");
    this.load.image(AssetKeys.CLOUD_1, "./cloud1.png");
    this.load.image(AssetKeys.CLOUD_2, "./cloud2.png");
    this.load.image(AssetKeys.CACTUS_1, "./cactus1.png");
    this.load.image(AssetKeys.CACTUS_2, "./cactus2.png");
    this.load.image(AssetKeys.CACTUS_3, "./cactus3.png");

    this.load.audio(AssetKeys.DIED, "./you_died.mp3");
  }

  create(): void {
    super.create();

    this.scene.start(SceneKeys.START);
  }

  update(_time: number, _delta: number): void {}
}
