async function rotation({ renderer, testRoot }) {
  const randomColor = () => {
    const randomInt = Math.floor(Math.random() * Math.pow(2, 32));
    const hexString = randomInt.toString(16).padStart(8, "0");
    return parseInt(hexString, 16);
  };
  const rnd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  new Array(15).fill(0).forEach((el, idx) => {
    const pivot = 0.5;
    const node = renderer.createNode({
      x: Math.floor(idx % 5) * 360 + 100,
      y: Math.floor(idx / 5) * 360 + 100,
      width: 200,
      height: 200,
      colorBottom: randomColor(),
      colorTop: randomColor(),
      parent: testRoot,
      shader: renderer.createShader("RoundedRectangle", {
        radius: rnd(10, 50)
      }),
      scale: 1,
      pivot
    });
    const pivotPoint = renderer.createNode({
      x: pivot * 200 - 5,
      y: pivot * 200 - 5,
      width: 10,
      height: 10,
      color: 4294967125,
      parent: node,
      scale: 1
    });
    renderer.createNode({
      x: 2,
      y: 2,
      width: 6,
      height: 6,
      color: 255,
      parent: pivotPoint
    });
    setTimeout(() => {
      node.animate(
        {
          scale: 1.2,
          y: 460,
          x: 820,
          width: 10,
          height: 180,
          rotation: Math.PI * 2
        },
        {
          duration: rnd(2500, 2700),
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
  rotation as default
};
//# sourceMappingURL=rotation-74cbf435.js.map
