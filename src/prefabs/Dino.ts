import * as Phaser from "phaser";

import { GameScene } from "../scenes/GameScene";
import { AssetKeys } from "../constants/assetKeys";
import { DinoAnimations } from "../constants/dinoAnimations";
import { DINO_DIMENSIONS } from "../constants/dinoDimensions";
import { DinoType } from "../constants/dinoType";

export class Dino extends Phaser.Physics.Arcade.Sprite {
  scene: GameScene;
  selectedDinoTexture:
    | AssetKeys.DINO_ATLAS_SPINOSAURUS
    | AssetKeys.DINO_ATLAS_TYRANNOSAURUS;

  constructor(scene: GameScene, dinoType: DinoType) {
    super(
      scene,
      scene.cameras.main.width * 0.1,
      scene.cameras.main.height - DINO_DIMENSIONS.height,
      dinoType === DinoType.SPINOSAURUS
        ? AssetKeys.DINO_ATLAS_SPINOSAURUS
        : AssetKeys.DINO_ATLAS_TYRANNOSAURUS,
      dinoType === DinoType.SPINOSAURUS ? "dino_a_1.png" : "dino_b_1.png"
    );
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    if (this.body) {
      this.body.enable = true;
    }
    if (this.body && this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body?.setGravityY(4_000);
    }
    this.selectedDinoTexture =
      dinoType === DinoType.SPINOSAURUS
        ? AssetKeys.DINO_ATLAS_SPINOSAURUS
        : AssetKeys.DINO_ATLAS_TYRANNOSAURUS;

    this.setDepth(2);
    this.setCollideWorldBounds(true);

    this.generateAtlasAnimation();
  }

  destroyAnimations(): void {
    Object.values(DinoAnimations).forEach((animationKey) => {
      this.scene.anims.remove(animationKey);
    });
  }

  generateAtlasAnimation(): void {
    const runFrames = this.scene.anims.generateFrameNames(
      this.selectedDinoTexture,
      {
        prefix:
          this.selectedDinoTexture === AssetKeys.DINO_ATLAS_SPINOSAURUS
            ? "dino_a_"
            : "dino_b_",
        suffix: ".png",
        start: 1,
        end: 2,
      }
    );
    const jumpFrames = this.scene.anims.generateFrameNames(
      this.selectedDinoTexture,
      {
        prefix:
          this.selectedDinoTexture === AssetKeys.DINO_ATLAS_SPINOSAURUS
            ? "dino_a_"
            : "dino_b_",
        suffix: ".png",
        start: 3,
        end: 3,
      }
    );

    this.scene.anims.create({
      key: DinoAnimations.DINO_RUN,
      frames: runFrames,
      frameRate: 6,
      repeat: -1,
    });

    this.scene.anims.create({
      key: DinoAnimations.DINO_JUMP,
      frames: jumpFrames,
      frameRate: 6,
      repeat: -1,
    });

    this.play(DinoAnimations.DINO_RUN);
  }

  onMove(): void {
    if (!this.scene || !this.scene.spaceCursor) {
      return;
    }

    const isDinoOnTheGround = this.body?.blocked?.down;
    const isSpaceKeyDown = Phaser.Input.Keyboard.JustDown(
      this.scene.spaceCursor
    );

    if (isDinoOnTheGround && isSpaceKeyDown) {
      this.play(DinoAnimations.DINO_JUMP);
      this.setVelocityY(-1_800);

      this.scene.tweens.add({
        targets: this,
        angle: { from: 0, to: 360 },
        duration: 700,
        ease: "Linear",
        repeat: 0,
        yoyo: false,
        callbackScope: this,
        onComplete: () => {
          this.play(DinoAnimations.DINO_RUN);
        },
      });
    }
  }
}
