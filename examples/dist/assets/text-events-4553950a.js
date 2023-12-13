import { E as EventEmitter } from "./CoreExtension-34643308.js";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const HEADER_SIZE = 45;
const FONT_SIZE = 60;
const BUTTON_PADDING = 10;
const BEGIN_Y = HEADER_SIZE;
async function textEvents({
  renderer,
  driverName,
  testRoot
}) {
  renderer.createTextNode({
    text: `Text Event Test (${driverName})`,
    fontSize: HEADER_SIZE,
    offsetY: -5,
    parent: testRoot
  });
  renderer.createTextNode({
    text: "SDF:",
    fontSize: 45,
    parent: testRoot,
    x: 100,
    y: renderer.settings.appHeight * 1 / 4 - 45 / 2
  });
  const marqueeSdf = new BoxedText(
    {
      x: 0,
      y: BEGIN_Y,
      boxColor1: 2674786303,
      boxColor2: 11184895,
      textColor: 4294967295,
      fontFamily: "Ubuntu",
      parent: testRoot
    },
    renderer
  );
  marqueeSdf.on("afterLayout", () => {
    marqueeSdf.x = renderer.settings.appWidth / 2 - marqueeSdf.node.width / 2;
    marqueeSdf.y = renderer.settings.appHeight * 1 / 4 - marqueeSdf.node.height / 2;
  });
  renderer.createTextNode({
    text: "Canvas:",
    fontSize: 45,
    parent: testRoot,
    x: 100,
    y: renderer.settings.appHeight * 3 / 4 - 45 / 2
  });
  const marqueeCanvas = new BoxedText(
    {
      x: 0,
      y: BEGIN_Y,
      boxColor1: 11184895,
      boxColor2: 2674786303,
      textColor: 4294967295,
      fontFamily: "NotoSans",
      parent: testRoot
    },
    renderer
  );
  marqueeCanvas.on("afterLayout", () => {
    marqueeCanvas.x = renderer.settings.appWidth / 2 - marqueeCanvas.node.width / 2;
    marqueeCanvas.y = renderer.settings.appHeight * 3 / 4 - marqueeCanvas.node.height / 2;
  });
  const marqueeText = `The following is a test of the text loaded event...
From Philly's streets to Dutch canal's grace,
A code symphony spanned time and space.
Lightning 3 emerged, open and free,
TV apps bloomed like waves on the sea.

JavaScript's art with WebGL's embrace,
A framework for screens, a virtual space.
Dispersed yet aligned, the team took flight,
Philadelphia and Netherlands, day and night.

Together they wove lines of code,
Innovation sparked, passion glowed.
Lightning 3 arose, a collaborative dream,
Uniting two lands, a powerful stream.`;
  const MARQUEE_MAX = 40;
  let numChars = 0;
  let i = 0;
  let state = "growing";
  setInterval(() => {
    if (state === "growing") {
      numChars++;
      if (numChars <= MARQUEE_MAX && numChars <= marqueeText.length - i)
        ;
      else if (numChars >= MARQUEE_MAX && numChars <= marqueeText.length - i) {
        numChars = MARQUEE_MAX;
        state = "scrolling";
      } else if (numChars > 0) {
        state = "shrinking";
      }
    } else if (state === "shrinking") {
      i++;
      numChars--;
      if (numChars === 0) {
        i = 0;
        state = "growing";
      }
    } else {
      i++;
      if (numChars >= marqueeText.length - i) {
        state = "shrinking";
      }
    }
    marqueeSdf.text = marqueeText.substring(i, i + numChars);
    marqueeCanvas.text = marqueeSdf.text;
  }, 50);
  const textFailedEventTest = renderer.createTextNode({
    y: 50,
    fontFamily: "$$SDF_FAILURE_TEST$$",
    textRendererOverride: "sdf",
    parent: testRoot,
    fontSize: 50
  });
  let textError;
  try {
    textError = await waitForTextFailed(textFailedEventTest);
  } catch (e) {
  }
  textFailedEventTest.fontFamily = "Ubuntu";
  if (textError) {
    textFailedEventTest.text = "Failure Event Test Passed!";
    textFailedEventTest.color = 16711935;
  } else {
    textFailedEventTest.text = "Failure Event Test Failed!";
    textFailedEventTest.color = 4278190335;
  }
}
class BoxedText extends EventEmitter {
  constructor(props, renderer) {
    super();
    this.props = props;
    this.renderer = renderer;
    __publicField(this, "node");
    __publicField(this, "textNode");
    __publicField(this, "onTextLoaded", (target, payload) => {
      this.layout(payload.dimensions);
    });
    this.node = renderer.createNode({
      x: props.x,
      y: props.y,
      colorTop: props.boxColor1,
      colorBottom: props.boxColor2,
      shader: renderer.createShader("RoundedRectangle", {
        radius: 10
      }),
      parent: props.parent
    });
    this.textNode = renderer.createTextNode({
      x: 0,
      y: 0,
      fontSize: FONT_SIZE,
      offsetY: -5,
      alpha: 0,
      color: props.textColor,
      fontFamily: props.fontFamily,
      parent: this.node
    });
    this.textNode.on("loaded", this.onTextLoaded);
  }
  layout(textDimensions) {
    this.node.width = textDimensions.width + BUTTON_PADDING * 2;
    this.node.height = textDimensions.height + BUTTON_PADDING * 2;
    this.textNode.x = this.node.width / 2 - textDimensions.width / 2;
    this.textNode.y = this.node.height / 2 - textDimensions.height / 2;
    this.textNode.alpha = 1;
    this.emit("afterLayout");
  }
  get text() {
    return this.textNode.text;
  }
  set text(v) {
    this.textNode.text = v;
  }
  get x() {
    return this.node.x;
  }
  set x(v) {
    this.node.x = v;
  }
  get y() {
    return this.node.y;
  }
  set y(v) {
    this.node.y = v;
  }
  get boxColor1() {
    return this.node.colorTop;
  }
  set boxColor1(v) {
    this.node.colorTop = v;
  }
  get boxColor2() {
    return this.node.colorBottom;
  }
  set boxColor2(v) {
    this.node.colorBottom = v;
  }
  get textColor() {
    return this.textNode.color;
  }
  set textColor(v) {
    this.textNode.color = v;
  }
  get fontFamily() {
    return this.textNode.fontFamily;
  }
  set fontFamily(v) {
    this.textNode.fontFamily = v;
  }
  get parent() {
    return this.node.parent;
  }
  set parent(v) {
    this.node.parent = v;
  }
}
function waitForTextFailed(textNode) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("TIMEOUT"));
    }, 1e3);
    textNode.once("failed", (target, payload) => {
      resolve(payload.error);
    });
  });
}
export {
  textEvents as default
};
//# sourceMappingURL=text-events-4553950a.js.map
