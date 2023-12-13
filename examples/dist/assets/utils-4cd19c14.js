import { a as assertTruthy } from "./CoreExtension-34643308.js";
const HEADER_FONT_SIZE = 30;
const PADDING = 20;
function createPageConstructor(curPageRowConstructors) {
  return async function(rowConstructors, pageNode) {
    let curY = 0;
    for (const rowConstructor of rowConstructors) {
      const rowNode = await rowConstructor(pageNode);
      rowNode.y = curY;
      curY += rowNode.height;
    }
  }.bind(null, curPageRowConstructors);
}
async function paginateTestRows(pageContainer, testRows) {
  const renderer = pageContainer.renderer;
  assertTruthy(renderer.root);
  let pageCurY = 0;
  let curPageRowConstructors = [];
  let curRowIndex = 0;
  for (const testRow of testRows) {
    const isLastRow = curRowIndex === testRows.length - 1;
    let newRowConstructor = testRow && (async (pageNode) => {
      assertTruthy(testRow);
      const rowContainer = renderer.createNode({
        x: 0,
        y: pageCurY,
        width: pageContainer.contentWidth,
        height: 0,
        color: 0,
        parent: pageNode
      });
      const rowHeaderNode = renderer.createTextNode({
        fontFamily: "Ubuntu",
        fontSize: HEADER_FONT_SIZE,
        y: PADDING,
        parent: rowContainer
      });
      const rowNode = renderer.createNode({
        y: HEADER_FONT_SIZE + PADDING * 2,
        width: pageContainer.contentWidth,
        height: 0,
        color: 0,
        parent: rowContainer
      });
      const rowHeight = await testRow.content(rowNode);
      rowNode.height = rowHeight;
      rowHeaderNode.text = testRow.title;
      rowContainer.height = HEADER_FONT_SIZE + PADDING * 2 + rowNode.height;
      return rowContainer;
    });
    let itFits = false;
    let tmpRowContainer;
    if (newRowConstructor) {
      tmpRowContainer = await newRowConstructor(renderer.root);
      itFits = pageCurY + tmpRowContainer.height <= pageContainer.contentHeight;
      if (itFits) {
        curPageRowConstructors.push(newRowConstructor);
        pageCurY += tmpRowContainer.height;
        newRowConstructor = null;
      }
    }
    if (!itFits || isLastRow) {
      const pageConstructor = createPageConstructor(curPageRowConstructors);
      pageContainer.pushPage(pageConstructor);
      pageCurY = (tmpRowContainer == null ? void 0 : tmpRowContainer.height) || 0;
      curPageRowConstructors = [];
      if (newRowConstructor) {
        curPageRowConstructors.push(newRowConstructor);
      }
      if (isLastRow && !itFits && curPageRowConstructors.length > 0) {
        const pageConstructor2 = createPageConstructor(curPageRowConstructors);
        pageContainer.pushPage(pageConstructor2);
      }
    }
    if (tmpRowContainer) {
      tmpRowContainer.parent = null;
      tmpRowContainer.destroy();
    }
    curRowIndex++;
  }
  pageContainer.finalizePages();
}
async function waitForTextDimensions(node) {
  return new Promise((resolve) => {
    node.once("loaded", (_node, payload) => {
      const { width, height } = payload.dimensions;
      resolve({
        width,
        height
      });
    });
  });
}
export {
  paginateTestRows as p,
  waitForTextDimensions as w
};
//# sourceMappingURL=utils-4cd19c14.js.map
