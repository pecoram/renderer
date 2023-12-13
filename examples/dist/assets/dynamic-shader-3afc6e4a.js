async function automation(settings) {
  await test(settings);
  await settings.snapshot();
}
async function test({ renderer, testRoot }) {
  const degToRad = (deg) => {
    return Math.PI / 180 * deg;
  };
  renderer.createNode({
    x: 200,
    y: 100,
    width: 250,
    height: 500,
    shader: renderer.createShader("DynamicShader", {
      effects: [
        {
          type: "radius",
          props: {
            radius: 50
          }
        },
        {
          type: "linearGradient",
          props: {
            angle: 0,
            colors: [
              4278190335,
              16711935,
              4278190335,
              65535,
              4294902015,
              4278190080
            ]
          }
        },
        {
          type: "border",
          props: {
            width: 30,
            color: 4294967295
          }
        },
        {
          type: "linearGradient",
          props: {
            angle: degToRad(40),
            colors: [
              4278190335,
              16711935,
              4278190335,
              65535,
              4294902015,
              4278190335
            ]
          }
        }
      ]
    }),
    parent: testRoot
  });
  renderer.createNode({
    x: 500,
    y: 100,
    width: 250,
    height: 500,
    color: 16711935,
    shader: renderer.createShader("DynamicShader", {
      effects: [
        {
          type: "borderTop",
          props: {
            width: 30,
            color: 4278190335
          }
        },
        {
          type: "borderBottom",
          props: {
            width: 30,
            color: 4278190335
          }
        }
      ]
    }),
    parent: testRoot
  });
  renderer.createNode({
    x: 800,
    y: 100,
    width: 250,
    height: 500,
    shader: renderer.createShader("DynamicShader", {
      effects: [
        {
          type: "linearGradient",
          props: {
            angle: degToRad(90),
            stops: [0.2, 0.3],
            colors: [
              4278190335,
              16711935,
              4278190335,
              65535,
              4294902015,
              4278190335
            ]
          }
        },
        {
          type: "radius",
          props: {
            radius: 50
          }
        }
      ]
    }),
    parent: testRoot
  });
  renderer.createNode({
    x: 1100,
    y: 100,
    width: 250,
    height: 500,
    color: 65535,
    shader: renderer.createShader("DynamicShader", {
      effects: [
        {
          type: "borderRight",
          props: {
            width: 30,
            color: 4278255615
          }
        },
        {
          type: "borderLeft",
          props: {
            width: 15,
            color: 4278255615
          }
        }
      ]
    }),
    parent: testRoot
  });
  renderer.createNode({
    x: 1400,
    y: 100,
    width: 250,
    height: 500,
    color: 4278190335,
    shader: renderer.createShader("DynamicShader", {
      effects: [
        {
          type: "linearGradient",
          props: {
            angle: degToRad(180),
            stops: [0.4, 0.8],
            colors: [65535, 0]
          }
        },
        {
          type: "linearGradient",
          props: {
            angle: degToRad(-90),
            stops: [0.1, 0.75],
            colors: [65535, 0]
          }
        }
      ]
    }),
    parent: testRoot
  });
  renderer.createNode({
    x: 200,
    y: 700,
    width: 750,
    height: 250,
    color: 4278190335,
    shader: renderer.createShader("DynamicShader", {
      effects: [
        {
          type: "radius",
          props: {
            radius: 100
          }
        },
        {
          type: "fadeOut",
          props: {
            fade: [200, 100, 0, 0]
          }
        }
      ]
    }),
    parent: testRoot
  });
  renderer.createNode({
    x: 1e3,
    y: 700,
    width: 750,
    height: 250,
    shader: renderer.createShader("DynamicShader", {
      effects: [
        {
          type: "radialGradient",
          props: {
            colors: [4278190335, 16711935, 0],
            stops: [0.1, 0.4, 1],
            height: 200,
            width: 1e3,
            pivot: [0, 0.5]
          }
        }
      ]
    }),
    parent: testRoot
  });
  console.log("ready!");
}
export {
  automation,
  test as default
};
//# sourceMappingURL=dynamic-shader-3afc6e4a.js.map
