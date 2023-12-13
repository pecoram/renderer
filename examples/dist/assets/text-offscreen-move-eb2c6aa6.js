import { P as PageContainer } from "./PageContainer-151b4d5b.js";
import "./LocalStorage-f60767e1.js";
async function automation(settings) {
  await (await test(settings)).snapshotPages();
}
async function test(settings) {
  const { renderer } = settings;
  const pageContainer = new PageContainer(settings, {
    width: renderer.settings.appWidth,
    height: renderer.settings.appHeight,
    title: "Text Offscreen Move Tests"
  });
  pageContainer.pushPage(createTestCase(renderer, "sdf", "none"));
  pageContainer.pushPage(createTestCase(renderer, "sdf", "width"));
  pageContainer.pushPage(createTestCase(renderer, "sdf", "both"));
  pageContainer.pushPage(createTestCase(renderer, "canvas", "none"));
  pageContainer.pushPage(createTestCase(renderer, "canvas", "width"));
  pageContainer.pushPage(createTestCase(renderer, "canvas", "both"));
  await delay(200);
  pageContainer.finalizePages();
  return pageContainer;
}
const commonTextProps = {
  mount: 0.5,
  width: 400,
  height: 400,
  contain: "none",
  text: "Test passes if this text appears only as green",
  fontFamily: "Ubuntu",
  textRendererOverride: "canvas",
  fontSize: 50
};
function createTestCase(renderer, textRenderer, contain) {
  return async function(page) {
    const subheader = renderer.createTextNode({
      x: 0,
      y: 10,
      text: "",
      fontFamily: "Ubuntu",
      textRendererOverride: "sdf",
      fontSize: 30,
      parent: page
    });
    subheader.text = `textRenderer = ${textRenderer}
contain = ${contain}`;
    renderer.createTextNode({
      ...commonTextProps,
      color: 4278190335,
      x: renderer.settings.appWidth / 2,
      y: renderer.settings.appHeight / 2,
      textRendererOverride: textRenderer,
      contain,
      parent: page
    });
    const offscreenStartText = renderer.createTextNode({
      ...commonTextProps,
      color: 16711935,
      x: -1e3,
      y: -1e3,
      textRendererOverride: textRenderer,
      contain,
      parent: page
    });
    offscreenStartText.x = renderer.settings.appWidth / 2;
    offscreenStartText.y = renderer.settings.appHeight / 2;
  };
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export {
  automation,
  test as default
};
//# sourceMappingURL=text-offscreen-move-eb2c6aa6.js.map
