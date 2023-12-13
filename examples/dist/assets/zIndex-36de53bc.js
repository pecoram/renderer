async function automation(settings) {
  await test(settings);
  await settings.snapshot();
}
async function test({ renderer, testRoot }) {
  const rectOne = renderer.createNode({
    x: 200,
    y: 200,
    width: 200,
    height: 200,
    color: 2864408319,
    shader: renderer.createShader("RoundedRectangle", {
      radius: 40
    }),
    zIndex: 1,
    parent: testRoot
  });
  const rectTwo = renderer.createNode({
    x: 220,
    y: 220,
    width: 200,
    height: 200,
    color: 4289392128,
    shader: renderer.createShader("RoundedRectangle", {
      radius: 40
    }),
    zIndex: 3,
    parent: testRoot
  });
  const rectThree = renderer.createNode({
    x: 240,
    y: 240,
    width: 200,
    height: 200,
    color: 65535,
    shader: renderer.createShader("RoundedRectangle", {
      radius: 40
    }),
    zIndex: 4,
    parent: testRoot
  });
  const parentRect = renderer.createNode({
    x: 800,
    y: 200,
    width: 600,
    height: 600,
    color: 2864408319,
    // shader: renderer.createShader('RoundedRectangle', {
    //   radius: 40,
    // }),
    zIndex: 2,
    parent: testRoot,
    zIndexLocked: 1
  });
  const childRectWhite = renderer.createNode({
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    color: 4289392128,
    // shader: renderer.createShader('RoundedRectangle', {
    //   radius: 40,
    // }),
    zIndex: 4,
    parent: parentRect
  });
  const childRectRed = renderer.createNode({
    x: 120,
    y: 120,
    width: 200,
    height: 200,
    color: 65535,
    // shader: renderer.createShader('RoundedRectangle', {
    //   radius: 40,
    // }),
    zIndex: 5,
    parent: parentRect
  });
  const blockingRect = renderer.createNode({
    x: 80,
    y: 80,
    width: 1600,
    height: 800,
    color: 16777215,
    // shader: renderer.createShader('RoundedRectangle', {
    //   radius: 40,
    // }),
    zIndex: 0,
    parent: testRoot
  });
  const rectOrder = [rectOne, rectTwo, rectThree];
  const rectChildOrder = [parentRect, childRectWhite, childRectRed];
  window.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
      console.log("Reversing");
      rectOrder.reverse();
      rectOrder.forEach((rect, i) => {
        rect.zIndex = i + 1;
      });
      rectChildOrder.reverse();
      rectChildOrder.forEach((rect, i) => {
        rect.zIndex = i + 2;
      });
    } else if (e.code === "ArrowRight") {
      console.log("middle");
      rectTwo.zIndex = rectTwo.zIndex === 100 ? 2 : 100;
      childRectWhite.zIndex = childRectWhite.zIndex === 100 ? 4 : 100;
    } else if (e.code === "Space") {
      blockingRect.zIndex = blockingRect.zIndex === 10 ? 0 : 10;
    }
  });
  renderer.createNode({
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    color: 16777215,
    shader: renderer.createShader("RoundedRectangle", {
      radius: 2
    }),
    // eslint-disable-next-line  @typescript-eslint/no-loss-of-precision
    zIndex: 1489014829218491e11,
    // eslint-disable-next-line  @typescript-eslint/no-loss-of-precision
    zIndexLocked: 1489014829218491e11,
    parent: testRoot
  });
  renderer.createNode({
    x: 0,
    y: 900,
    width: 10,
    height: 10,
    color: 16777215,
    shader: renderer.createShader("RoundedRectangle", {
      radius: 2
    }),
    // eslint-disable-next-line  @typescript-eslint/no-loss-of-precision
    zIndex: -1489014829218491e11,
    // eslint-disable-next-line  @typescript-eslint/no-loss-of-precision
    zIndexLocked: -1489014829218491e11,
    parent: testRoot
  });
  renderer.createNode({
    x: 1e3,
    y: 900,
    width: 10,
    height: 10,
    color: 16777215,
    shader: renderer.createShader("RoundedRectangle", {
      radius: 2
    }),
    // @ts-expect-error Invalid prop test
    zIndex: "boop",
    // @ts-expect-error Invalid prop test
    zIndexLocked: "boop",
    parent: testRoot
  });
  renderer.createNode({
    x: 1e3,
    y: 0,
    width: 10,
    height: 10,
    color: 16777215,
    shader: renderer.createShader("RoundedRectangle", {
      radius: 2
    }),
    // @ts-expect-error Invalid prop test
    zIndex: true,
    // @ts-expect-error Invalid prop test
    zIndexLocked: true,
    parent: testRoot
  });
  renderer.createNode({
    x: 1e3,
    y: 0,
    width: 10,
    height: 10,
    color: 16777215,
    shader: renderer.createShader("RoundedRectangle", {
      radius: 2
    }),
    // @ts-expect-error Invalid prop test
    zIndex: null,
    // @ts-expect-error Invalid prop test
    zIndexLocked: null,
    parent: testRoot
  });
  renderer.createNode({
    x: 200,
    y: 0,
    width: 10,
    height: 10,
    color: 16777215,
    shader: renderer.createShader("RoundedRectangle", {
      radius: 2
    }),
    zIndex: void 0,
    zIndexLocked: void 0,
    parent: testRoot
  });
  renderer.createNode({
    x: 200,
    y: 900,
    width: 10,
    height: 10,
    color: 16777215,
    shader: renderer.createShader("RoundedRectangle", {
      radius: 2
    }),
    // @ts-expect-error Invalid prop test
    // eslint-disable-next-line  @typescript-eslint/no-empty-function
    zIndex: () => {
    },
    // @ts-expect-error Invalid prop test
    // eslint-disable-next-line  @typescript-eslint/no-empty-function
    zIndexLocked: () => {
    },
    parent: testRoot
  });
  renderer.createNode({
    x: 500,
    y: 900,
    width: 10,
    height: 10,
    color: 16777215,
    shader: renderer.createShader("RoundedRectangle", {
      radius: 2
    }),
    // @ts-expect-error Invalid prop test
    zIndex: {},
    // @ts-expect-error Invalid prop test
    zIndexLocked: {},
    parent: testRoot
  });
}
export {
  automation,
  test as default
};
//# sourceMappingURL=zIndex-36de53bc.js.map
