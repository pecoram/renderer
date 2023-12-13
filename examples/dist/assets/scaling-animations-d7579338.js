async function scalingAnimations({ renderer, testRoot }) {
  const randomColor = () => {
    const randomInt = Math.floor(Math.random() * Math.pow(2, 32));
    const hexString = randomInt.toString(16).padStart(8, "0");
    return parseInt(hexString, 16);
  };
  const rnd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  new Array(15).fill(0).forEach((el, idx) => {
    const pivot = Math.random();
    const node = renderer.createNode({
      x: Math.floor(idx % 5) * 360 + 100,
      y: Math.floor(idx / 5) * 360 + 100,
      width: rnd(200, 300),
      height: rnd(200, 300),
      colorBottom: randomColor(),
      colorTop: randomColor(),
      parent: testRoot,
      shader: renderer.createShader("RoundedRectangle", {
        radius: rnd(10, 50)
      }),
      scale: 1,
      pivot
      // x: 0.5 / y:0.5
    });
    const pivotPoint = renderer.createNode({
      x: pivot * 140 - 5,
      y: pivot * 140 - 5,
      width: 20,
      height: 20,
      color: 4294967125,
      parent: node,
      // shader: renderer.createShader('RoundedRectangle', {
      //   radius: 5,
      // }),
      scale: 1
    });
    renderer.createNode({
      x: 2,
      y: 2,
      width: 16,
      height: 16,
      color: 255,
      parent: pivotPoint
      // shader: renderer.createShader('RoundedRectangle', {
      //   radius: 3,
      // }),
    });
    setTimeout(() => {
      node.animate(
        {
          scale: rnd(2, 4),
          rotation: Math.random() * Math.PI,
          y: 460,
          x: 820,
          width: 3,
          height: 180
        },
        {
          duration: rnd(1500, 1700),
          loop: false,
          stopMethod: "reverse",
          easing: "cubic-bezier(0,1.35,.99,-0.07)"
        }
      ).start();
    }, 1500);
  });
  console.log("ready!");
}
export {
  scalingAnimations as default
};
//# sourceMappingURL=scaling-animations-d7579338.js.map
