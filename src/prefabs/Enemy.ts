// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default interface Enemy {
  body: Phaser.Physics.Arcade.Body;
}

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x?: number, y?: number, texture?: string, frame?: number | string) {
    super(scene, x ?? 0, y ?? 0, texture || "ship_1", frame);

    scene.physics.add.existing(this, false);
    this.body.setSize(66, 113, false);
    this.body.collideWorldBounds = true;
    this.body.onCollide = true;
    this.body.onWorldBounds = true;

    /* START-USER-CTR-CODE */
    // Write your code here.
    this.direction = randomDirection();

    scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this);
    scene.physics.world.on(Phaser.Physics.Arcade.Events.WORLD_BOUNDS, this.handleWorldBoundsCollision, this);

    this.moveEvent = scene.time.addEvent({
      delay: 10000,
      callback: () => {
        this.direction = randomDirection();
      },
      loop: true,
    });
    /* END-USER-CTR-CODE */
  }

  private handleTileCollision(go: Phaser.GameObjects.GameObject, tile: Phaser.Tilemaps.Tile) {
    if (go !== this) {
      return;
    }
    this.direction = randomDirection();
  }

  private handleWorldBoundsCollision(body: Phaser.Physics.Arcade.Body) {
    if (body.gameObject !== this) {
      return;
    }
    this.direction = randomDirection();
  }

  /* START-USER-CODE */
  // Write your code here.
  private direction: Direction;
  private moveEvent: Phaser.Time.TimerEvent;

  destroy(fromScene?: boolean): void {
    this.moveEvent.destroy();
    this.scene.physics.world.off(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this);
    this.scene.physics.world.off(Phaser.Physics.Arcade.Events.WORLD_BOUNDS, this.handleWorldBoundsCollision, this);
    super.destroy(fromScene);
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    if (this.active == false) {
      return;
    }

    const speed = 50;

    switch (this.direction) {
      case Direction.DOWN:
        this.setVelocity(0, speed);
        this.angle = 0;
        break;
      case Direction.UP:
        this.setVelocity(0, -speed);
        this.angle = 180;
        break;
      case Direction.LEFT:
        this.setVelocity(-speed, 0);
        this.angle = 90;
        break;
      case Direction.RIGHT:
        this.setVelocity(speed, 0);
        this.angle = -90;
        break;
      default:
        this.setVelocity(0, 0);
    }
  }
  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const randomDirection = (exclude?: Direction): Direction => {
  let newDirection = Phaser.Math.Between(0, 3);
  while (newDirection === exclude) {
    newDirection = Phaser.Math.Between(0, 3);
  }

  return newDirection;
};
