async function animation({ renderer, testRoot }) {
  const node = renderer.createNode({
    x: 0,
    y: 0,
    width: 1920,
    height: 1080,
    color: 255,
    parent: testRoot
  });
  const animatableNode = renderer.createNode({
    x: 0,
    y: 300,
    width: 200,
    height: 200,
    color: 4294967295,
    parent: node
  });
  const easingLabel = renderer.createTextNode({
    parent: node,
    x: 40,
    y: 40,
    fontFamily: "Ubuntu",
    fontSize: 40,
    text: ""
  });
  renderer.createTextNode({
    parent: node,
    x: 40,
    y: 90,
    fontFamily: "Ubuntu",
    fontSize: 20,
    text: "press left or right arrow key to change easing"
  });
  const easings = [
    "linear",
    "ease-in",
    "ease-out",
    "ease-in-out",
    "ease-in-sine",
    "ease-out-sine",
    "ease-in-out-sine",
    "ease-in-cubic",
    "ease-out-cubic",
    "ease-in-out-cubic",
    "ease-in-circ",
    "ease-out-circ",
    "ease-in-out-circ",
    "ease-in-back",
    "ease-out-back",
    "ease-in-out-back",
    "cubic-bezier(0,1.35,.99,-0.07)",
    "cubic-bezier(.41,.91,.99,-0.07)",
    "loopReverse"
  ];
  let animationIndex = 0;
  let currentAnimation;
  const animationSettings = {
    duration: 2e3,
    loop: false,
    stopMethod: false,
    easing: "linear"
  };
  const execEasing = (index = 0) => {
    var _a;
    const easing = (_a = easings[index]) != null ? _a : "linear";
    easingLabel.text = `Easing demo: ${easing}`;
    animationSettings.easing = easing;
    animatableNode.x = 0;
    if (easing === "loopReverse") {
      animationSettings.loop = true;
      animationSettings.stopMethod = "reverse";
    } else {
      animationSettings.loop = false;
      animationSettings.stopMethod = false;
    }
    if (currentAnimation) {
      currentAnimation.stop();
    }
    currentAnimation = animatableNode.animate(
      {
        x: renderer.settings.appWidth - animatableNode.width
      },
      animationSettings
      // Remove the unnecessary assertion
    );
    currentAnimation.start();
  };
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      animationIndex++;
    }
    if (e.key === "ArrowLeft") {
      animationIndex--;
    }
    if (e.key === "ArrowUp") {
      const s = animationSettings.stopMethod;
      animationSettings.stopMethod = !s ? "reverse" : false;
    }
    animationIndex = (animationIndex % easings.length + easings.length) % easings.length;
    execEasing(animationIndex);
  });
  execEasing(animationIndex);
}
export {
  animation as default
};
//# sourceMappingURL=animation-c6328d91.js.map
