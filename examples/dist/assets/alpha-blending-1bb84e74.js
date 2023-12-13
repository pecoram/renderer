import { r as robotImg } from "./robot-53414b9d.js";
import { r as rockoImg } from "./rocko-f986afff.js";
import { l as loadStorage, s as saveStorage } from "./LocalStorage-f60767e1.js";
import { m as mergeColorAlpha } from "./CoreExtension-34643308.js";
const red25 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAADUlEQVQImWP4z8DgAAAEQQFArKo0hgAAAABJRU5ErkJggg==";
const red50 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAADUlEQVQImWP4z8DQAAAEgQGADgLFJAAAAABJRU5ErkJggg==";
const red100 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAADUlEQVQImWP4z8DwHwAFAAH/q842iQAAAABJRU5ErkJggg==";
const green25 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAADUlEQVQImWNg+M/gAAADQgFAcjfFzAAAAABJRU5ErkJggg==";
const green50 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAADUlEQVQImWNg+M/QAAADggGA0J80bgAAAABJRU5ErkJggg==";
const green100 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAADUlEQVQImWNg+M/wHwAEAQH/U7xMcQAAAABJRU5ErkJggg==";
async function automation(settings) {
  const { appElement } = settings;
  const oldBackground = appElement.style.background;
  try {
    await (await test(settings)).snapshotPages();
  } finally {
    appElement.style.background = oldBackground;
  }
}
async function test(settings) {
  const { testName, renderer, appElement, automation: automation2, testRoot } = settings;
  const savedState = automation2 ? null : loadStorage(testName);
  const leftSideBg = "red";
  const rightSideBg = "green";
  let curPage = (savedState == null ? void 0 : savedState.curPage) || 0;
  appElement.style.background = "#ff0000";
  const rightBackground = renderer.createNode({
    x: renderer.settings.appWidth / 2,
    y: 0,
    width: renderer.settings.appWidth / 2,
    height: renderer.settings.appHeight,
    color: 16711935,
    parent: testRoot,
    zIndex: 0,
    alpha: 1
  });
  const PADDING = 20;
  const HEADER_FONT_SIZE = 45;
  const RECT_SIZE = 150;
  renderer.createTextNode({
    text: "WebGL -> Browser Alpha",
    fontFamily: "Ubuntu",
    fontSize: HEADER_FONT_SIZE,
    color: 4294967295,
    contain: "width",
    width: renderer.settings.appWidth / 2,
    y: PADDING,
    textAlign: "center",
    parent: testRoot
  });
  renderer.createTextNode({
    text: "WebGL -> WebGL Alpha",
    fontFamily: "Ubuntu",
    fontSize: HEADER_FONT_SIZE,
    color: 4294967295,
    contain: "width",
    width: renderer.settings.appWidth / 2,
    x: renderer.settings.appWidth / 2,
    y: PADDING,
    textAlign: "center",
    parent: testRoot
  });
  const pageNumberNode = renderer.createTextNode({
    fontFamily: "Ubuntu",
    fontSize: 30,
    color: 4294967295,
    x: PADDING,
    y: renderer.settings.appHeight - 30 - PADDING,
    parent: testRoot
  });
  function buildSidePg0(bgColorName, parent) {
    const bgColor = bgColorName === "red" ? 4278190335 : 16711935;
    let curY = PADDING * 2 + HEADER_FONT_SIZE;
    let curX = PADDING;
    const sideContainer = renderer.createNode({
      parent
    });
    renderer.createTextNode({
      text: "The rectangles below should appear the same",
      fontFamily: "Ubuntu",
      fontSize: 30,
      color: 4294967295,
      y: curY,
      parent: sideContainer
    });
    curY += 30 + PADDING;
    curX = PADDING;
    renderer.createNode({
      x: curX,
      y: curY,
      width: RECT_SIZE,
      height: RECT_SIZE,
      color: 4294967295,
      alpha: 0.5,
      parent: sideContainer
    });
    curX += RECT_SIZE + PADDING;
    renderer.createNode({
      x: curX,
      y: curY,
      width: RECT_SIZE,
      height: RECT_SIZE,
      color: mergeColorAlpha(4294967295, 0.5),
      alpha: 1,
      parent: sideContainer
    });
    curX = PADDING;
    curY += RECT_SIZE + PADDING;
    renderer.createTextNode({
      text: "The rectangles below should appear invisible",
      fontFamily: "Ubuntu",
      fontSize: 30,
      color: 4294967295,
      y: curY,
      parent: sideContainer
    });
    curY += 30 + PADDING;
    curX = PADDING;
    renderer.createNode({
      x: curX,
      y: curY,
      width: RECT_SIZE,
      height: RECT_SIZE,
      color: bgColor,
      parent: sideContainer,
      alpha: 1
    });
    curX += RECT_SIZE + PADDING;
    renderer.createNode({
      x: curX,
      y: curY,
      width: RECT_SIZE,
      height: RECT_SIZE,
      color: bgColor,
      parent: sideContainer,
      alpha: 0.5
    });
    curX += RECT_SIZE + PADDING;
    renderer.createNode({
      x: curX,
      y: curY,
      width: RECT_SIZE,
      height: RECT_SIZE,
      color: mergeColorAlpha(bgColor, 0.5),
      parent: sideContainer,
      alpha: 1
    });
    curX += RECT_SIZE + PADDING;
    renderer.createNode({
      x: curX,
      y: curY,
      width: RECT_SIZE,
      height: RECT_SIZE,
      color: mergeColorAlpha(bgColor, 0.5),
      parent: sideContainer,
      alpha: 0.5
    });
    curY += RECT_SIZE + PADDING;
    curX = PADDING;
    renderer.createTextNode({
      text: "The texture rects below should appear invisible",
      fontFamily: "Ubuntu",
      fontSize: 30,
      color: 4294967295,
      y: curY,
      parent: sideContainer
    });
    curY += 30 + PADDING;
    renderer.createNode({
      x: curX,
      y: curY,
      width: RECT_SIZE,
      height: RECT_SIZE,
      src: bgColorName === "red" ? red100 : green100,
      alpha: 1,
      parent: sideContainer
    });
    curX += RECT_SIZE + PADDING;
    renderer.createNode({
      x: curX,
      y: curY,
      width: RECT_SIZE,
      height: RECT_SIZE,
      src: bgColorName === "red" ? red50 : green50,
      alpha: 1,
      parent: sideContainer
    });
    curX += RECT_SIZE + PADDING;
    renderer.createNode({
      x: curX,
      y: curY,
      width: RECT_SIZE,
      height: RECT_SIZE,
      src: bgColorName === "red" ? red100 : green100,
      alpha: 0.5,
      parent: sideContainer
    });
    curX += RECT_SIZE + PADDING;
    renderer.createNode({
      x: curX,
      y: curY,
      width: RECT_SIZE,
      height: RECT_SIZE,
      src: bgColorName === "red" ? red50 : green50,
      alpha: 0.5,
      parent: sideContainer
    });
    curX += RECT_SIZE + PADDING;
    renderer.createNode({
      x: curX,
      y: curY,
      width: RECT_SIZE,
      height: RECT_SIZE,
      src: bgColorName === "red" ? red25 : green25,
      alpha: 1,
      parent: sideContainer
    });
    return sideContainer;
  }
  function buildSidePg1(bgColorName, parent) {
    const bgColor = bgColorName === "red" ? 4278190335 : 16711935;
    let curY = PADDING * 2 + HEADER_FONT_SIZE;
    let curX = PADDING;
    const sideContainer = renderer.createNode({
      parent
    });
    renderer.createTextNode({
      text: "The text below should appear invisible",
      fontFamily: "Ubuntu",
      fontSize: 30,
      color: 4294967295,
      y: curY,
      parent: sideContainer
    });
    curY += 30 + PADDING;
    const CANVAS_TEXT = 'This "canvas" text should appear invisible';
    renderer.createTextNode({
      text: CANVAS_TEXT,
      fontFamily: "NotoSans",
      fontSize: 30,
      alpha: 1,
      color: bgColor,
      y: curY,
      textRendererOverride: "canvas",
      parent: sideContainer
    });
    curY += 30 + PADDING;
    renderer.createTextNode({
      text: CANVAS_TEXT,
      fontFamily: "NotoSans",
      fontSize: 30,
      alpha: 0.5,
      color: bgColor,
      y: curY,
      textRendererOverride: "canvas",
      parent: sideContainer
    });
    curY += 30 + PADDING;
    renderer.createTextNode({
      text: CANVAS_TEXT,
      fontFamily: "NotoSans",
      fontSize: 30,
      alpha: 1,
      color: mergeColorAlpha(bgColor, 0.5),
      y: curY,
      textRendererOverride: "canvas",
      parent: sideContainer
    });
    curY += 30 + PADDING;
    renderer.createTextNode({
      text: CANVAS_TEXT,
      fontFamily: "NotoSans",
      fontSize: 30,
      alpha: 0.5,
      color: mergeColorAlpha(bgColor, 0.5),
      y: curY,
      textRendererOverride: "canvas",
      parent: sideContainer
    });
    curY += 30 + PADDING;
    const SDF_TEXT = 'This "SDF" text should appear invisible';
    renderer.createTextNode({
      text: SDF_TEXT,
      fontFamily: "Ubuntu",
      fontSize: 30,
      alpha: 1,
      color: bgColor,
      y: curY,
      textRendererOverride: "sdf",
      parent: sideContainer
    });
    curY += 30 + PADDING;
    renderer.createTextNode({
      text: SDF_TEXT,
      fontFamily: "Ubuntu",
      fontSize: 30,
      alpha: 0.5,
      color: bgColor,
      y: curY,
      textRendererOverride: "sdf",
      parent: sideContainer
    });
    curY += 30 + PADDING;
    renderer.createTextNode({
      text: SDF_TEXT,
      fontFamily: "Ubuntu",
      fontSize: 30,
      alpha: 1,
      color: mergeColorAlpha(bgColor, 0.5),
      y: curY,
      textRendererOverride: "sdf",
      parent: sideContainer
    });
    curY += 30 + PADDING;
    renderer.createTextNode({
      text: SDF_TEXT,
      fontFamily: "Ubuntu",
      fontSize: 30,
      alpha: 0.5,
      color: mergeColorAlpha(bgColor, 0.5),
      y: curY,
      textRendererOverride: "sdf",
      parent: sideContainer
    });
    curY += 30 + PADDING;
    renderer.createTextNode({
      text: "The textures below should have smooth edges",
      fontFamily: "Ubuntu",
      fontSize: 30,
      color: 4294967295,
      y: curY,
      parent: sideContainer
    });
    curY += 30 + PADDING;
    const sizeToTexture = (target, payload) => {
      const { width, height } = payload.dimensions;
      target.width = width;
      target.height = height;
    };
    renderer.createNode({
      x: curX,
      y: curY,
      width: RECT_SIZE,
      height: RECT_SIZE,
      src: robotImg,
      alpha: 1,
      parent: sideContainer
    }).once("loaded", sizeToTexture);
    curX += RECT_SIZE + PADDING;
    renderer.createNode({
      x: curX,
      y: curY,
      src: rockoImg,
      alpha: 1,
      parent: sideContainer
    }).once("loaded", sizeToTexture);
    curX += RECT_SIZE + PADDING;
    return sideContainer;
  }
  let curLeftSide = null;
  let curRightSide = null;
  function buildPage(pageNumber) {
    if (curLeftSide) {
      curLeftSide.parent = null;
      curLeftSide.destroy();
      curLeftSide = null;
    }
    if (curRightSide) {
      curRightSide.parent = null;
      curRightSide.destroy();
      curRightSide = null;
    }
    if (pageNumber === 0) {
      curLeftSide = buildSidePg0(leftSideBg, testRoot);
      curRightSide = buildSidePg0(rightSideBg, rightBackground);
    } else if (pageNumber === 1) {
      curLeftSide = buildSidePg1(leftSideBg, testRoot);
      curRightSide = buildSidePg1(rightSideBg, rightBackground);
    }
    pageNumberNode.text = `Page ${pageNumber + 1}/${NUM_PAGES}`;
    if (!automation2) {
      saveStorage(testName, { curPage: pageNumber });
    }
  }
  const NUM_PAGES = 2;
  buildPage(curPage);
  if (!automation2) {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        curPage = (curPage + NUM_PAGES - 1) % NUM_PAGES;
        buildPage(curPage);
      } else if (e.key === "ArrowRight") {
        curPage = (curPage + 1) % NUM_PAGES;
        buildPage(curPage);
      }
    });
  }
  return {
    snapshotPages: async () => {
      if (!automation2) {
        throw new Error("Cannot snapshot pages when not in automation mode");
      }
      for (let i = 0; i < NUM_PAGES; i++) {
        buildPage(i);
        await settings.snapshot();
      }
    }
  };
}
export {
  automation,
  test as default
};
//# sourceMappingURL=alpha-blending-1bb84e74.js.map
