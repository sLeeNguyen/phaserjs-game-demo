/* START OF COMPILED CODE */

import Phaser from "phaser";
import Movement from "../components/Movement";
import Ship from "../prefabs/Ship";
/* START-USER-IMPORTS */
import Enemy from "../prefabs/Enemy";
/* END-USER-IMPORTS */

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");

    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  editorCreate(): void {
    // map
    const map = this.add.tilemap("map");
    map.addTilesetImage("pirate-tileset", "tileset");

    // worldLayer
    const worldLayer = map.createLayer("Water", ["pirate-tileset"], 0, 0)!;

    // groundLayer
    const groundLayer = map.createLayer("Ground", ["pirate-tileset"], 0, -4)!;

    // ship
    const ship = new Enemy(this, 134, 733);
    this.add.existing(ship);
    ship.body.pushable = false;

    // ship_1
    const ship_1 = new Enemy(this, 650, 1180, "ship_2");
    this.add.existing(ship_1);
    ship_1.angle = 90;
    ship_1.body.pushable = false;

    // ship_2
    const ship_2 = new Enemy(this, 378, 1090, "ship_2");
    this.add.existing(ship_2);
    ship_2.angle = 90;
    ship_2.body.pushable = false;

    // player
    const player = new Ship(this, 597, 314, "ship_4");
    this.add.existing(player);
    player.angle = 0;

    // ship_3
    const ship_3 = new Enemy(this, 1053.9580985368352, 1042.985606196969, "ship_2");
    this.add.existing(ship_3);
    ship_3.angle = -180;
    ship_3.body.pushable = false;

    // ship_4
    const ship_4 = new Enemy(this, 1630, 518, "ship_2");
    this.add.existing(ship_4);
    ship_4.angle = -180;
    ship_4.body.pushable = false;

    // ship_5
    const ship_5 = new Enemy(this, 1839.9607814047126, 397.8071466715946, "ship_2");
    this.add.existing(ship_5);
    ship_5.angle = -180;
    ship_5.body.pushable = false;

    // ship_6
    const ship_6 = new Enemy(this, 1258, 188, "ship_2");
    this.add.existing(ship_6);
    ship_6.angle = -180;
    ship_6.body.pushable = false;

    // lists
    const enemies = [ship, ship_2, ship_1, ship_6, ship_4, ship_5, ship_3];

    // player (components)
    const playerMovement = new Movement(player);
    playerMovement.speed = 200;

    this.worldLayer = worldLayer;
    this.groundLayer = groundLayer;
    this.player = player;
    this.enemies = enemies;

    this.events.emit("scene-awake");
  }

  private worldLayer!: Phaser.Tilemaps.TilemapLayer;
  private groundLayer!: Phaser.Tilemaps.TilemapLayer;
  private player!: Ship;
  private enemies!: Ship[];

  /* START-USER-CODE */
  private control: boolean = false;
  private cannonBall: Phaser.Physics.Arcade.Sprite | null = null;
  private explosionSound: Phaser.Sound.BaseSound;
  // Write your code here

  create() {
    this.editorCreate();
    this.explosionSound = this.sound.add("explosion-audio");

    this.physics.world.setBounds(0, 0, this.worldLayer.width, this.worldLayer.height);

    this.cameras.main
      .setBackgroundColor(0x000000)
      .setBounds(0, 0, this.worldLayer.width, this.worldLayer.height)
      .startFollow(this.player, true, 0.1, 0.1);

    this.groundLayer.setCollisionByProperty({ collides: true });

    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // this.groundLayer.renderDebug(debugGraphics, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    // });

    this.physics.add.collider(this.player, this.enemies);
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.enemies, this.groundLayer);
    this.physics.add.collider(this.enemies, this.enemies);

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.control = false;
      },
    });
  }

  update(): void {
    // this.children.each((child) => {
    //   // @ts-ignore
    //   if (DepthSortY.getComponent(child) && child.setDepth) {
    //     // @ts-ignore
    //     child.setDepth(child.y);
    //   }
    // });

    // const worldBounds = this.physics.world.bounds;
    //mouse clicked
    if (this.input.mousePointer.isDown && !this.control) {
      this.control = true;
      this.input.activePointer.updateWorldPoint(this.cameras.main);
      //for fire again
      this.cannonBall = this.physics.add.sprite(this.player.x, this.player.y, "cannonBall");
      //move to mouse position
      this.physics.moveTo(this.cannonBall, this.input.activePointer.worldX, this.input.activePointer.worldY, 500);
      //for collision
      // @ts-ignore
      this.physics.add.overlap(this.cannonBall, this.enemies, this.destroy, undefined, this);
    }
  }

  //collide cannonbal and pirateShip
  destroy(
    cannonball: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    pirateship: Phaser.Physics.Arcade.Sprite
  ) {
    cannonball.destroy();
    // pirateship.destroy();
    pirateship.play(
      {
        key: "explode",
        repeat: 0,
        delay: 50,
        hideOnComplete: true,
      },
      true
    );
    this.explosionSound.play();
    pirateship.once("animationcomplete", () => {
      pirateship.destroy();
    });
    this.control = false;
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
