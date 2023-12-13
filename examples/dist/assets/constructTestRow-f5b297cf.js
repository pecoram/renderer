import { w as waitForTextDimensions } from "./utils-4cd19c14.js";
const CONTAINER_SIZE = 200;
const PADDING = 20;
async function constructTestRow(options, testNodes) {
  const {
    renderer,
    rowNode,
    containerSize = CONTAINER_SIZE,
    padding = PADDING
  } = options;
  let curX = 0;
  const curY = 0;
  for (const testNode of testNodes) {
    if (typeof testNode === "string") {
      const dimensions = await waitForTextDimensions(
        renderer.createTextNode({
          mountY: 0.5,
          x: curX,
          y: containerSize / 2,
          text: testNode,
          parent: rowNode
        })
      );
      curX += dimensions.width + padding;
    } else {
      const container = renderer.createNode({
        parent: rowNode,
        color: 4294967295,
        width: containerSize,
        height: containerSize,
        clipping: true,
        x: curX,
        y: curY
      });
      testNode.parent = container;
      curX += containerSize + padding;
    }
  }
  return curY + containerSize;
}
export {
  constructTestRow as c
};
//# sourceMappingURL=constructTestRow-f5b297cf.js.map
