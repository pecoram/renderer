import { r as rockoImg } from "./rocko-f986afff.js";
import { e as elevatorImg, s as spritemap } from "./spritemap-5738692a.js";
async function textures({
  renderer,
  driverName,
  testRoot
}) {
  const FONT_SIZE = 45;
  const BEGIN_Y = FONT_SIZE;
  renderer.createTextNode({
    text: `Texture Test (${driverName})`,
    fontSize: FONT_SIZE,
    offsetY: -5,
    parent: testRoot
  });
  let curX = 0;
  let curY = BEGIN_Y;
  let curTest = 1;
  const rocko = renderer.createNode({
    x: curX,
    y: curY,
    src: rockoImg,
    parent: testRoot
  });
  await execLoadingTest(rocko, 181, 218);
  const rocko2 = renderer.createNode({
    x: curX,
    y: curY,
    src: rockoImg,
    parent: testRoot
  });
  await execLoadingTest(rocko2, 181, 218);
  const elevator = renderer.createNode({
    x: curX,
    y: curY,
    src: elevatorImg,
    parent: testRoot
  });
  await execLoadingTest(elevator, 200, 268);
  const failure = renderer.createNode({
    x: curX,
    y: curY,
    src: "does-not-exist.png",
    parent: testRoot
  });
  await execFailureTest(failure);
  const failure2 = renderer.createNode({
    x: curX,
    y: curY,
    src: "does-not-exist.png",
    parent: testRoot
  });
  await execFailureTest(failure2);
  curX = renderer.settings.appWidth / 2;
  curY = BEGIN_Y;
  const noiseTexture = renderer.createTexture("NoiseTexture", {
    width: 100,
    height: 100
  });
  const noise = renderer.createNode({
    x: curX,
    y: curY,
    texture: noiseTexture,
    parent: testRoot
  });
  await execLoadingTest(noise, 100, 100);
  const noise2 = renderer.createNode({
    x: curX,
    y: curY,
    texture: noiseTexture,
    parent: testRoot
  });
  await execLoadingTest(noise2, 100, 100);
  const spriteMapTexture = renderer.createTexture("ImageTexture", {
    src: spritemap
  });
  const frames = Array.from(Array(32).keys()).map((i) => {
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
  const subTextureNode = renderer.createNode({
    x: curX,
    y: curY,
    texture: frames[0],
    parent: testRoot
  });
  await execLoadingTest(subTextureNode, 100, 150);
  const subTextureNode2 = renderer.createNode({
    x: curX,
    y: curY,
    texture: frames[0],
    parent: testRoot
  });
  await execLoadingTest(subTextureNode2, 100, 150);
  const failureTexture = renderer.createTexture("ImageTexture", {
    src: "does-not-exist.png"
  });
  const failureFrames = Array.from(Array(32).keys()).map((i) => {
    const x = i % 8 * 120;
    const y = Math.floor(i / 8) * 120;
    return renderer.createTexture("SubTexture", {
      texture: failureTexture,
      x,
      y,
      width: 120,
      height: 120
    });
  });
  const subTxFailure = renderer.createNode({
    x: curX,
    y: curY,
    texture: failureFrames[0],
    parent: testRoot
  });
  await execFailureTest(subTxFailure);
  const subTxFailure2 = renderer.createNode({
    x: curX,
    y: curY,
    texture: failureFrames[0],
    parent: testRoot
  });
  await execFailureTest(subTxFailure2);
  function waitForTxLoaded(imgNode) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("TIMEOUT"));
      }, 1e3);
      imgNode.once("loaded", (target, payload) => {
        resolve(payload.dimensions);
      });
    });
  }
  function waitForTxFailed(imgNode) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("TIMEOUT"));
      }, 1e3);
      imgNode.once("failed", () => {
        resolve(true);
      });
    });
  }
  async function execLoadingTest(imgNode, expectedWidth, expectedHeight) {
    var _a;
    const textNode = renderer.createTextNode({
      x: curX,
      text: "",
      fontSize: FONT_SIZE,
      offsetY: -5,
      parent: testRoot
    });
    let exception = false;
    let dimensions = { width: 0, height: 0 };
    try {
      dimensions = await waitForTxLoaded(imgNode);
    } catch (e) {
      exception = (_a = e == null ? void 0 : e.message) != null ? _a : "Unknown";
    }
    imgNode.width = dimensions.width;
    imgNode.height = dimensions.height;
    textNode.y = imgNode.y + imgNode.height;
    let result = "Fail";
    let expectedPostfix = "";
    if (!exception && imgNode.width === expectedWidth && imgNode.height === expectedHeight) {
      textNode.color = 16711935;
      result = "Pass";
    } else {
      textNode.color = 4278190335;
      if (exception) {
        expectedPostfix = ` (exception: ${exception})`;
      } else {
        expectedPostfix = ` (expected ${expectedWidth}x${expectedHeight})`;
      }
    }
    textNode.text = `${curTest}. Loaded Event Test: ${result} (${imgNode.width}x${imgNode.height})${expectedPostfix}`;
    curY = textNode.y + FONT_SIZE;
    curTest++;
  }
  async function execFailureTest(imgNode) {
    var _a;
    const textNode = renderer.createTextNode({
      x: curX,
      text: "",
      fontSize: FONT_SIZE,
      offsetY: -5,
      parent: testRoot
    });
    let failureTestPass = false;
    let exception = false;
    try {
      failureTestPass = await waitForTxFailed(imgNode);
    } catch (e) {
      exception = (_a = e == null ? void 0 : e.message) != null ? _a : "Unknown";
    }
    textNode.y = imgNode.y + imgNode.height;
    let result = "";
    if (!exception && failureTestPass) {
      textNode.color = 16711935;
      result = "Pass";
    } else {
      textNode.color = 4278190335;
      result = "Fail";
      if (exception) {
        result += ` (exception: ${exception})`;
      }
    }
    textNode.text = `${curTest}. Failure Event Test: ${result}`;
    curY = textNode.y + FONT_SIZE;
    curTest++;
  }
}
export {
  textures as default
};
//# sourceMappingURL=textures-c525fe9d.js.map
