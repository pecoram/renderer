import { p as paginateTestRows, w as waitForTextDimensions } from "./utils-4cd19c14.js";
import { P as PageContainer } from "./PageContainer-151b4d5b.js";
import { c as constructTestRow } from "./constructTestRow-f5b297cf.js";
import "./CoreExtension-34643308.js";
import "./LocalStorage-f60767e1.js";
async function automation(settings) {
  await (await test(settings)).snapshotPages();
}
async function test(settings) {
  const { renderer, testRoot } = settings;
  const pageContainer = new PageContainer(settings, {
    width: renderer.settings.appWidth,
    height: renderer.settings.appHeight,
    parent: testRoot,
    title: "Text Scaling"
  });
  await paginateTestRows(pageContainer, [
    ...generateScalingTest(renderer, "sdf", "scale"),
    ...generateScalingTest(renderer, "sdf", "scaleX"),
    ...generateScalingTest(renderer, "sdf", "scaleY"),
    ...generateScalingTest(renderer, "canvas", "scale"),
    ...generateScalingTest(renderer, "canvas", "scaleX"),
    ...generateScalingTest(renderer, "canvas", "scaleY")
  ]);
  return pageContainer;
}
const NODE_PROPS = {
  x: 100,
  y: 100,
  color: 255,
  text: "xyz",
  fontFamily: "Ubuntu",
  textRendererOverride: "sdf",
  fontSize: 50
};
function generateScalingTest(renderer, textRenderer, scaleProp) {
  return [
    {
      title: `Text Node ('${scaleProp}', ${textRenderer}, mount = 0)`,
      content: async (rowNode) => {
        const nodeProps = {
          ...NODE_PROPS,
          textRendererOverride: textRenderer
        };
        const baselineNode = renderer.createTextNode({
          ...nodeProps
        });
        const dimensions = await waitForTextDimensions(baselineNode);
        const position = {
          x: 100 - dimensions.width / 2,
          y: 100 - dimensions.height / 2
        };
        baselineNode.x = position.x;
        baselineNode.y = position.y;
        return await constructTestRow({ renderer, rowNode }, [
          baselineNode,
          "scale 2 ->\npivot 0.5 ->",
          renderer.createTextNode({
            ...nodeProps,
            ...position,
            [scaleProp]: 2
            // pivot: 0.5, (should be default)
          }),
          "pivot 0 ->",
          renderer.createTextNode({
            ...nodeProps,
            ...position,
            pivot: 0,
            [scaleProp]: 2
          }),
          "pivot 1 ->",
          renderer.createTextNode({
            ...nodeProps,
            ...position,
            pivot: 1,
            [scaleProp]: 2
          }),
          "pivot 0.5 ->\ncontain -> 'width'",
          renderer.createTextNode({
            ...nodeProps,
            ...position,
            width: dimensions.width,
            pivot: 0.5,
            [scaleProp]: 2,
            contain: "width"
          }),
          "pivot 0.5 ->\ncontain -> 'both'",
          renderer.createTextNode({
            ...nodeProps,
            ...position,
            width: dimensions.width,
            height: dimensions.height,
            pivot: 0.5,
            [scaleProp]: 2,
            contain: "both"
          })
        ]);
      }
    },
    {
      title: `Text Node ('${scaleProp}', ${textRenderer},  mount = 0.5)`,
      content: async (rowNode) => {
        const nodeProps = {
          ...NODE_PROPS,
          mount: 0.5,
          x: 100,
          y: 100,
          textRendererOverride: textRenderer
        };
        const baselineNode = renderer.createTextNode({
          ...nodeProps
        });
        const dimensions = await waitForTextDimensions(baselineNode);
        return await constructTestRow({ renderer, rowNode }, [
          baselineNode,
          "scale 2 ->\npivot 0.5 ->",
          renderer.createTextNode({
            ...nodeProps,
            [scaleProp]: 2
            // pivot: 0.5, (should be default)
          }),
          "pivot 0 ->",
          renderer.createTextNode({
            ...nodeProps,
            pivot: 0,
            [scaleProp]: 2
          }),
          "pivot 1 ->",
          renderer.createTextNode({
            ...nodeProps,
            pivot: 1,
            [scaleProp]: 2
          }),
          "pivot 0.5 ->\ncontain -> 'width'",
          renderer.createTextNode({
            ...nodeProps,
            width: dimensions.width,
            pivot: 0.5,
            [scaleProp]: 2,
            contain: "width"
          }),
          "pivot 0.5 ->\ncontain -> 'both'",
          renderer.createTextNode({
            ...nodeProps,
            width: dimensions.width,
            height: dimensions.height,
            pivot: 0.5,
            [scaleProp]: 2,
            contain: "both"
          })
        ]);
      }
    },
    {
      title: `Text Node ('${scaleProp}', ${textRenderer},  mount = 1)`,
      content: async (rowNode) => {
        const nodeProps = {
          ...NODE_PROPS,
          mount: 1,
          textRendererOverride: textRenderer
        };
        const baselineNode = renderer.createTextNode({
          ...nodeProps
        });
        const dimensions = await waitForTextDimensions(baselineNode);
        const position = {
          x: 100 + dimensions.width / 2,
          y: 100 + dimensions.height / 2
        };
        baselineNode.x = position.x;
        baselineNode.y = position.y;
        return await constructTestRow({ renderer, rowNode }, [
          baselineNode,
          "scale 2 ->\npivot 0.5 ->",
          renderer.createTextNode({
            ...nodeProps,
            ...position,
            [scaleProp]: 2
            // pivot: 0.5, (should be default)
          }),
          "pivot 0 ->",
          renderer.createTextNode({
            ...nodeProps,
            ...position,
            pivot: 0,
            [scaleProp]: 2
          }),
          "pivot 1 ->",
          renderer.createTextNode({
            ...nodeProps,
            ...position,
            pivot: 1,
            [scaleProp]: 2
          }),
          "pivot 0.5 ->\ncontain -> 'width'",
          renderer.createTextNode({
            ...nodeProps,
            ...position,
            width: dimensions.width,
            pivot: 0.5,
            [scaleProp]: 2,
            contain: "width"
          }),
          "pivot 0.5 ->\ncontain -> 'both'",
          renderer.createTextNode({
            ...nodeProps,
            ...position,
            width: dimensions.width,
            height: dimensions.height,
            pivot: 0.5,
            [scaleProp]: 2,
            contain: "both"
          })
        ]);
      }
    }
  ];
}
export {
  automation,
  test as default
};
//# sourceMappingURL=text-scaling-90394712.js.map
