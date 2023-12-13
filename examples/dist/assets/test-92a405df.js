import { r as rockoImg } from "./rocko-f986afff.js";
import { e as elevatorImg, s as spritemap } from "./spritemap-5738692a.js";
import { a as assertTruthy } from "./CoreExtension-34643308.js";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class Character {
  constructor(props, renderer, rightFrames) {
    this.props = props;
    this.renderer = renderer;
    this.rightFrames = rightFrames;
    __publicField(this, "node");
    __publicField(this, "curIntervalAnimation", null);
    __publicField(this, "direction");
    __publicField(this, "state");
    __publicField(this, "leftFrames", []);
    this.node = renderer.createNode({
      x: props.x,
      y: props.y,
      width: 200 / 2,
      height: 300 / 2,
      texture: rightFrames[0],
      parent: renderer.root,
      zIndex: props.zIndex
    });
    this.leftFrames = rightFrames.map((frame) => {
      return renderer.createTexture("SubTexture", frame.props, {
        flipX: true
      });
    });
    assertTruthy(this.node);
    this.setState("right", "idle");
  }
  setState(direction, state) {
    if (this.direction === direction && this.state === state) {
      return;
    }
    this.direction = direction;
    this.state = state;
    switch (state) {
      case "idle":
        this.animateCharacter(direction, 2, 3, 100);
        break;
      case "walk":
        this.animateCharacter(direction, 0, 7, 100);
        break;
      case "run":
        this.animateCharacter(direction, 0, 7, 100);
        break;
      case "jump":
        this.animateCharacter(direction, 0, 7, 100);
        break;
    }
  }
  animateCharacter(direction, iStart, iEnd, intervalMs) {
    let curI = iStart;
    const frameArr = direction === "left" ? this.leftFrames : this.rightFrames;
    if (iEnd + 1 > frameArr.length || iStart < 0) {
      throw new Error("Animation out of bounds");
    }
    if (this.curIntervalAnimation) {
      clearInterval(this.curIntervalAnimation);
    }
    const nextFrame = () => {
      this.node.texture = frameArr[curI];
      curI++;
      if (curI > iEnd) {
        curI = iStart;
      }
    };
    nextFrame();
    this.curIntervalAnimation = setInterval(nextFrame, intervalMs);
  }
}
async function test({ renderer, testRoot }) {
  const redRect = renderer.createNode({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    color: 4278190335,
    shader: renderer.createShader("RoundedRectangle", {
      radius: 50
    }),
    parent: testRoot
  });
  const holder = renderer.createNode({
    x: 150,
    y: 900,
    width: 100,
    height: 100,
    color: 4278190335,
    parent: testRoot,
    zIndex: 0,
    zIndexLocked: 0,
    alpha: 0.5
  });
  renderer.createNode({
    x: 111,
    y: 0,
    width: 111,
    height: 111,
    color: 4278190335,
    parent: holder,
    zIndex: 12,
    alpha: 0.5
  });
  const greenRect = renderer.createNode({
    x: 100,
    y: 0,
    width: 100,
    height: 100,
    color: 16711935,
    parent: testRoot
  });
  const shaft = renderer.createNode({
    x: 395,
    y: 0,
    width: 210,
    height: renderer.settings.appHeight,
    color: 4294967295,
    texture: renderer.createTexture("NoiseTexture", {
      width: 210,
      height: renderer.settings.appHeight
    }),
    parent: testRoot
  });
  const relativePositioningPlatform = renderer.createNode({
    x: 605,
    y: 230,
    width: 1315,
    height: 50,
    color: 2864408319,
    texture: renderer.createTexture("NoiseTexture", {
      width: 1315,
      height: 50
    }),
    parent: testRoot
  });
  const relativePositioningChild = renderer.createNode({
    x: 10,
    y: 10,
    width: 1315 - 20,
    height: 30,
    color: 2867724202,
    parent: relativePositioningPlatform,
    texture: renderer.createTexture("NoiseTexture", {
      width: 1315 - 20,
      height: 30
    })
  });
  renderer.createNode({
    x: 10,
    y: 10,
    width: 1315 - 20 - 20,
    height: 10,
    color: 4278255615,
    parent: relativePositioningChild,
    texture: renderer.createTexture("NoiseTexture", {
      width: 1315 - 20 - 20,
      height: 50
    })
  });
  const rockoRect = renderer.createNode({
    x: -181,
    y: renderer.settings.appHeight - 218,
    width: 181,
    height: 218,
    src: rockoImg,
    color: 4294967295,
    parent: testRoot,
    zIndex: 1
  });
  const elevatorRect = renderer.createNode({
    x: 400,
    y: 0,
    width: 200,
    height: 268,
    src: elevatorImg,
    color: 65535,
    parent: testRoot,
    zIndex: 2,
    alpha: 0.9
  });
  const elevatorNumber = renderer.createTextNode({
    x: 0,
    y: 0,
    width: 200,
    height: 268,
    color: 4294967295,
    alpha: 1,
    text: "Dn",
    contain: "both",
    fontFamily: "Ubuntu",
    fontSize: 100,
    textAlign: "center",
    parent: elevatorRect,
    zIndex: 3
  });
  setInterval(() => {
    shaft.texture = renderer.createTexture(
      "NoiseTexture",
      {
        width: 210,
        height: renderer.settings.appHeight,
        cacheId: Math.floor(Math.random() * 1e5)
      },
      {
        preload: true
      }
    );
  }, 1e3);
  let rockoAnimation = null;
  setTimeout(async () => {
    while (true) {
      rockoRect.zIndex = 1;
      rockoAnimation = rockoRect.animate({}, { duration: 1e3 }).start();
      await rockoAnimation.waitUntilStopped();
      rockoAnimation = rockoRect.animate(
        {
          x: 400
        },
        {
          duration: 1e3
        }
      ).start();
      await rockoAnimation.waitUntilStopped();
      rockoAnimation = rockoRect.animate(
        {
          y: elevatorRect.height - rockoRect.height
        },
        {
          duration: 1e3
        }
      ).start();
      await rockoAnimation.waitUntilStopped();
      rockoRect.zIndex = 3;
      rockoAnimation = rockoRect.animate(
        {
          x: renderer.settings.appWidth
          // y: 100,
        },
        {
          duration: 2616
        }
      ).start();
      await rockoAnimation.waitUntilStopped();
      console.log("resetting rocko");
      rockoRect.x = -rockoRect.width;
      rockoRect.y = renderer.settings.appHeight - 218;
      rockoRect.flush();
    }
  }, 1e3);
  let elevatorAnimation = null;
  setTimeout(async () => {
    while (true) {
      elevatorNumber.text = "Dn";
      elevatorRect.color = 65535;
      elevatorAnimation = elevatorRect.animate(
        {
          y: 1080 - elevatorRect.height
        },
        {
          duration: 1e3
        }
      ).start();
      await elevatorAnimation.waitUntilStopped();
      elevatorAnimation = elevatorRect.animate(
        {
          // y: 1080 - elevatorRect.height,
        },
        {
          duration: 1e3
        }
      ).start();
      await elevatorAnimation.waitUntilStopped();
      elevatorNumber.text = "Up";
      elevatorRect.color = 16711935;
      elevatorAnimation = elevatorRect.animate(
        {
          y: 0
        },
        {
          duration: 1e3
        }
      ).start();
      await elevatorAnimation.waitUntilStopped();
      elevatorRect.color = 16711935;
      elevatorAnimation = elevatorRect.animate(
        {
          // y: 0,
        },
        {
          duration: 2616
        }
      ).start();
      await elevatorAnimation.waitUntilStopped();
    }
  }, 1e3);
  let blueRect = null;
  setInterval(() => {
    redRect.color++;
  }, 100);
  setInterval(() => {
    if (blueRect) {
      blueRect.destroy();
      blueRect = null;
    } else {
      blueRect = renderer.createNode({
        x: 200,
        y: 0,
        width: 100,
        height: 100,
        color: 65535,
        parent: testRoot
      });
    }
  }, 500);
  setInterval(() => {
    if (greenRect.parent) {
      greenRect.parent = null;
    } else {
      greenRect.parent = testRoot;
    }
  }, 1e3);
  const spriteMapTexture = renderer.createTexture("ImageTexture", {
    src: spritemap
  });
  const frames = Array.from(Array(8).keys()).map((i) => {
    const x = i % 8 * 100;
    const y = Math.floor(i / 8) * 150;
    return renderer.createTexture("SubTexture", {
      texture: spriteMapTexture,
      x,
      y,
      width: 100,
      height: 150
    });
  });
  for (let i = 0; i < 5; i++) {
    new Character(
      { x: 800 + i * 200, y: 125, zIndex: i % 2 === 0 ? 3 : 1 },
      renderer,
      frames
    );
  }
  const character = new Character(
    { x: 1800, y: 125, zIndex: 6 },
    renderer,
    frames
  );
  window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
      character.setState("left", "walk");
      character.node.animate(
        {
          x: character.node.x - 30
        },
        { duration: 200 }
      ).start();
    } else if (e.code === "ArrowRight") {
      character.setState("right", "walk");
      character.node.animate(
        {
          x: character.node.x + 30
        },
        { duration: 200 }
      ).start();
    } else if (e.code === "Space") {
      character.setState(character.direction, "jump");
    }
  });
  window.addEventListener("keyup", (e) => {
    if (e.code === "ArrowLeft") {
      character.setState("left", "idle");
    } else if (e.code === "ArrowRight") {
      character.setState("right", "idle");
    }
  });
  const textNode = renderer.createTextNode({
    x: shaft.x + shaft.width,
    y: relativePositioningPlatform.y + relativePositioningPlatform.height,
    width: 300,
    height: 200,
    color: 4294967295,
    alpha: 1,
    text: "Text Test: 0",
    fontFamily: "Ubuntu",
    contain: "width",
    textAlign: "center",
    fontSize: 100,
    scale: 1,
    parent: testRoot
  });
  renderer.createTextNode({
    x: renderer.settings.appWidth - 300,
    y: renderer.settings.appHeight - 200,
    width: 300,
    height: 200,
    color: 4294967295,
    alpha: 1,
    text: "Rocko Test",
    fontFamily: "NotoSans",
    contain: "width",
    textAlign: "center",
    fontSize: 100,
    parent: testRoot
  });
  let count = 1;
  setInterval(() => {
    textNode.text = `Text Test: ${count++}`;
  }, 1e3);
  console.log("ready!");
}
export {
  test as default
};
//# sourceMappingURL=test-92a405df.js.map
