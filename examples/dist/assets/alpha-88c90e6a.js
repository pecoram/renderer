async function automation(settings) {
  await test(settings);
  await settings.snapshot();
}
async function test({ renderer, testRoot }) {
  const parent = renderer.createNode({
    x: 200,
    y: 240,
    width: 500,
    height: 500,
    color: 255,
    parent: testRoot,
    zIndex: 0,
    zIndexLocked: 1,
    alpha: 0.5
  });
  renderer.createNode({
    x: 800,
    y: 0,
    width: 500,
    height: 500,
    color: 4278190335,
    parent,
    zIndex: 12,
    alpha: 1
  });
  console.log("ready!");
}
export {
  automation,
  test as default
};
//# sourceMappingURL=alpha-88c90e6a.js.map
