import { p as paginateTestRows } from "./utils-4cd19c14.js";
import { P as PageContainer } from "./PageContainer-151b4d5b.js";
import { c as constructTestRow } from "./constructTestRow-f5b297cf.js";
import "./CoreExtension-34643308.js";
import "./LocalStorage-f60767e1.js";
const containerSize = 100;
const NODE_PROPS = {
  mount: 0.5,
  x: containerSize / 2,
  y: containerSize / 2,
  color: 255,
  text: "xyz",
  fontFamily: "Ubuntu",
  textRendererOverride: "sdf",
  fontSize: 50
};
async function automation(settings) {
  await (await test(settings)).snapshotPages();
}
async function test(settings) {
  const { renderer, testRoot } = settings;
  const pageContainer = new PageContainer(settings, {
    width: renderer.settings.appWidth,
    height: renderer.settings.appHeight,
    parent: testRoot,
    title: "Text Alpha"
  });
  await paginateTestRows(pageContainer, [
    ...generateAlphaTest(renderer, "sdf"),
    ...generateAlphaTest(renderer, "canvas")
  ]);
  return pageContainer;
}
function generateAlphaTest(renderer, textRenderer) {
  return [
    {
      title: `Direct Alpha Prop (${textRenderer})`,
      content: async (rowNode) => {
        const nodeProps = {
          ...NODE_PROPS,
          textRendererOverride: textRenderer
        };
        return await constructTestRow({ renderer, rowNode, containerSize }, [
          renderer.createTextNode({
            ...nodeProps
          }),
          "alpha 0.5 ->",
          renderer.createTextNode({
            ...nodeProps,
            alpha: 0.5
          }),
          "alpha 0.05 ->",
          renderer.createTextNode({
            ...nodeProps,
            alpha: 0.05
          }),
          "alpha 0 ->",
          renderer.createTextNode({
            ...nodeProps,
            alpha: 0
          })
        ]);
      }
    },
    {
      title: `Parent Alpha Prop (${textRenderer})`,
      content: async (rowNode) => {
        return await constructTestRow({ renderer, rowNode, containerSize }, [
          createContainedTextNode(renderer, textRenderer, {
            alpha: 1
          }),
          "alpha 0.5 ->",
          createContainedTextNode(renderer, textRenderer, {
            alpha: 0.5
          }),
          "alpha 0.05 ->",
          createContainedTextNode(renderer, textRenderer, {
            alpha: 0.05
          }),
          "alpha 0 ->",
          createContainedTextNode(renderer, textRenderer, {
            alpha: 0
          })
        ]);
      }
    },
    {
      title: `Direct Alpha Prop + Color Alpha (${textRenderer})`,
      content: async (rowNode) => {
        const nodeProps = {
          ...NODE_PROPS,
          textRendererOverride: textRenderer
        };
        return await constructTestRow({ renderer, rowNode, containerSize }, [
          renderer.createTextNode({
            ...nodeProps,
            alpha: 1,
            color: 255
          }),
          "color.a -> 0.5",
          renderer.createTextNode({
            ...nodeProps,
            alpha: 1,
            color: 128
          }),
          "alpha -> 0.5",
          renderer.createTextNode({
            ...nodeProps,
            alpha: 0.5,
            color: 128
          })
        ]);
      }
    },
    {
      title: `Parent Alpha Prop + Color Alpha (${textRenderer})`,
      content: async (rowNode) => {
        return await constructTestRow({ renderer, rowNode, containerSize }, [
          createContainedTextNode(renderer, textRenderer, {
            alpha: 1,
            color: 4278190335
          }),
          "container\n  .color.a -> 0.5",
          createContainedTextNode(renderer, textRenderer, {
            alpha: 1,
            // Just changing the color alpha of the container doesn't affect
            // the contained text's alpha
            color: 4278190208
          }),
          "container\n  .alpha -> 0.5",
          createContainedTextNode(renderer, textRenderer, {
            alpha: 0.5,
            color: 4278190208
          })
        ]);
      }
    },
    null
  ];
}
function createContainedTextNode(renderer, textRenderer, containerProps) {
  const container = renderer.createNode({
    width: containerSize,
    height: containerSize,
    color: 16711935,
    ...containerProps
  });
  renderer.createTextNode({
    ...NODE_PROPS,
    textRendererOverride: textRenderer,
    parent: container
    // alpha: 0.50,
  });
  return container;
}
export {
  automation,
  test as default
};
//# sourceMappingURL=text-alpha-46a8d409.js.map
