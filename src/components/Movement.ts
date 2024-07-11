// You can write more code here

/* START OF COMPILED CODE */

import UserComponent from "./UserComponent";
import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Movement extends UserComponent {
  constructor(gameObject: Phaser.Physics.Arcade.Sprite) {
    super(gameObject);

    this.gameObject = gameObject;
    (gameObject as any)["__Movement"] = this;

    /* START-USER-CTR-CODE */
    this.cursors = this.scene.input.keyboard?.createCursorKeys()!;
    /* END-USER-CTR-CODE */
  }

  static getComponent(gameObject: Phaser.Physics.Arcade.Sprite): Movement {
    return (gameObject as any)["__Movement"];
  }

  private gameObject: Phaser.Physics.Arcade.Sprite;
  public speed: number = 0;

  /* START-USER-CODE */
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  protected update(): void {
    if (this.cursors.down.isDown) {
      this.gameObject.setVelocity(0, this.speed);
      this.gameObject.angle = 0;
      // this.gameObject.play("down-run", true);
    } else if (this.cursors.up.isDown) {
      this.gameObject.setVelocity(0, -this.speed);
      this.gameObject.angle = 180;
      // this.gameObject.play("up-run", true);
    } else if (this.cursors.left.isDown) {
      this.gameObject.setVelocity(-this.speed, 0);
      this.gameObject.angle = 90;
      // this.gameObject.play("left-run", true);
    } else if (this.cursors.right.isDown) {
      this.gameObject.setVelocity(this.speed, 0);
      this.gameObject.angle = -90;
      // this.gameObject.play("right-run", true);
    } else {
      this.gameObject.setVelocity(0, 0);
      // const direction = this.gameObject.anims.currentAnim?.key.split("-")[0] ?? "down";
      // this.gameObject.play(`${direction}-idle`, true);
    }
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
