function customSettings(urlParams) {
  const finalizationRegistry = urlParams.get("finalizationRegistry") === "true";
  return {
    textureCleanupOptions: {
      textureCleanupAgeThreadholdMs: 6e3,
      textureCleanupIntervalMs: 1e3
    },
    experimental_FinalizationRegistryTextureUsageTracker: finalizationRegistry
  };
}
async function textureMemoryStress({ renderer, testRoot }) {
  const screen = renderer.createNode({
    x: 0,
    y: 0,
    width: renderer.settings.appWidth,
    height: renderer.settings.appHeight,
    parent: testRoot,
    color: 4278255615
  });
  renderer.createTextNode({
    x: 0,
    y: 0,
    text: "Texture Memory Stress Test",
    parent: screen,
    fontFamily: "Ubuntu",
    fontSize: 60
  });
  renderer.createTextNode({
    x: 0,
    y: 100,
    width: renderer.settings.appWidth,
    contain: "width",
    text: `This test will create and display a random texture every 10ms.

To test that the textures are being properly disposed of, you can use the Chrome Task Manager to monitor the GPU's memory usage:

1. Click Window > Task Manager
2. Locate the "GPU Process"
3. Observe the "Memory Footprint" column
4. The value should eventually drop significantly toward a minimum and/or reach a
threadhold.

By default, the ManualCountTextureUsageTracker is used to track texture usage. Also test the experimental FinalizationRegistryTextureUsageTracker instead, by setting the URL param "finalizationRegistry=true".
    `,
    parent: screen,
    fontFamily: "Ubuntu",
    fontSize: 40
  });
  setInterval(() => {
    screen.texture = renderer.createTexture(
      "NoiseTexture",
      {
        width: 500,
        height: 500,
        cacheId: Math.floor(Math.random() * 1e5)
      },
      {
        preload: true
      }
    );
  }, 10);
}
export {
  customSettings,
  textureMemoryStress as default
};
//# sourceMappingURL=texture-memory-stress-16164442.js.map
