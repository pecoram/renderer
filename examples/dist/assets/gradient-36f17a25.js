async function gradient({ renderer, testRoot }) {
  const elements = [
    "colorTl",
    "colorTr",
    "colorBl",
    "colorBr",
    "colorTop",
    "colorBottom",
    "colorLeft",
    "colorRight",
    "color"
  ];
  const nodes = elements.map((element, idx) => {
    return renderer.createNode({
      x: idx % 4 * 300 + 100,
      y: Math.floor(idx / 4) * 300 + 100,
      width: 250,
      height: 250,
      color: 255,
      [element]: 4278190335,
      parent: testRoot
    });
  });
  setTimeout(() => {
    nodes.forEach((node, idx) => {
      var _a;
      node.animate(
        {
          [(_a = elements[idx]) != null ? _a : "color"]: 16711935
        },
        {
          duration: 1e3
        }
      ).start();
    });
  }, 2e3);
  console.log("ready!");
}
export {
  gradient as default
};
//# sourceMappingURL=gradient-36f17a25.js.map
