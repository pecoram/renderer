import { p as paginateTestRows } from "./utils-4cd19c14.js";
import { P as PageContainer } from "./PageContainer-151b4d5b.js";
import { c as constructTestRow } from "./constructTestRow-f5b297cf.js";
import { r as robotImg } from "./robot-53414b9d.js";
import "./CoreExtension-34643308.js";
import "./LocalStorage-f60767e1.js";
async function automation(settings) {
  await (await test(settings)).snapshotPages();
}
async function test(settings) {
  const { renderer } = settings;
  const pageContainer = new PageContainer(settings, {
    width: renderer.settings.appWidth,
    height: renderer.settings.appHeight,
    title: "Scaling"
  });
  await paginateTestRows(pageContainer, [
    {
      title: "Base Node (`scale`, mount = 0)",
      content: async (rowNode) => {
        const nodeProps = {
          // mount: 0, (should be default)
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          src: robotImg
        };
        return await constructTestRow({ renderer, rowNode }, [
          renderer.createNode({
            ...nodeProps
          }),
          "scale 2 ->\npivot 0.5 ->",
          renderer.createNode({
            ...nodeProps,
            scale: 2
            // pivot: 0.5, (should be default)
          }),
          "pivot 0 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 0,
            scale: 2
          }),
          "pivot 1 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 1,
            scale: 2
          })
        ]);
      }
    },
    {
      title: "Base Node (`scale`, mount = 0.5)",
      content: async (rowNode) => {
        const nodeProps = {
          mount: 0.5,
          x: 100,
          y: 100,
          width: 100,
          height: 100,
          src: robotImg
        };
        return await constructTestRow({ renderer, rowNode }, [
          renderer.createNode({
            ...nodeProps
          }),
          "scale 2 ->\npivot 0.5 ->",
          renderer.createNode({
            ...nodeProps,
            scale: 2
            // pivot: 0.5, (should be default)
          }),
          "pivot 0 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 0,
            scale: 2
          }),
          "pivot 1 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 1,
            scale: 2
          })
        ]);
      }
    },
    {
      title: "Base Node (`scale`, mount = 1)",
      content: async (rowNode) => {
        const nodeProps = {
          mount: 1,
          x: 150,
          y: 150,
          width: 100,
          height: 100,
          src: robotImg
        };
        return await constructTestRow({ renderer, rowNode }, [
          renderer.createNode({
            ...nodeProps
          }),
          "scale 2 ->\npivot 0.5 ->",
          renderer.createNode({
            ...nodeProps,
            scale: 2
            // pivot: 0.5, (should be default)
          }),
          "pivot 0 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 0,
            scale: 2
          }),
          "pivot 1 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 1,
            scale: 2
          })
        ]);
      }
    },
    {
      title: "Base Node (`scaleX`, mount = 0)",
      content: async (rowNode) => {
        const nodeProps = {
          // mount: 0, (should be default)
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          src: robotImg
        };
        return await constructTestRow({ renderer, rowNode }, [
          renderer.createNode({
            ...nodeProps
          }),
          "scale 2 ->\npivot 0.5 ->",
          renderer.createNode({
            ...nodeProps,
            scaleX: 2
            // pivot: 0.5, (should be default)
          }),
          "pivot 0 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 0,
            scaleX: 2
          }),
          "pivot 1 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 1,
            scaleX: 2
          })
        ]);
      }
    },
    {
      title: "Base Node (`scaleX`, mount = 0.5)",
      content: async (rowNode) => {
        const nodeProps = {
          mount: 0.5,
          x: 100,
          y: 100,
          width: 100,
          height: 100,
          src: robotImg
        };
        return await constructTestRow({ renderer, rowNode }, [
          renderer.createNode({
            ...nodeProps
          }),
          "scale 2 ->\npivot 0.5 ->",
          renderer.createNode({
            ...nodeProps,
            scaleX: 2
            // pivot: 0.5, (should be default)
          }),
          "pivot 0 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 0,
            scaleX: 2
          }),
          "pivot 1 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 1,
            scaleX: 2
          })
        ]);
      }
    },
    {
      title: "Base Node (`scaleX`, mount = 1)",
      content: async (rowNode) => {
        const nodeProps = {
          mount: 1,
          x: 150,
          y: 150,
          width: 100,
          height: 100,
          src: robotImg
        };
        return await constructTestRow({ renderer, rowNode }, [
          renderer.createNode({
            ...nodeProps
          }),
          "scale 2 ->\npivot 0.5 ->",
          renderer.createNode({
            ...nodeProps,
            scaleX: 2
            // pivot: 0.5, (should be default)
          }),
          "pivot 0 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 0,
            scaleX: 2
          }),
          "pivot 1 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 1,
            scaleX: 2
          })
        ]);
      }
    },
    {
      title: "Base Node (`scaleY`, mount = 0)",
      content: async (rowNode) => {
        const nodeProps = {
          // mount: 0, (should be default)
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          src: robotImg
        };
        return await constructTestRow({ renderer, rowNode }, [
          renderer.createNode({
            ...nodeProps
          }),
          "scale 2 ->\npivot 0.5 ->",
          renderer.createNode({
            ...nodeProps,
            scaleY: 2
            // pivot: 0.5, (should be default)
          }),
          "pivot 0 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 0,
            scaleY: 2
          }),
          "pivot 1 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 1,
            scaleY: 2
          })
        ]);
      }
    },
    {
      title: "Base Node (`scaleY`, mount = 0.5)",
      content: async (rowNode) => {
        const nodeProps = {
          mount: 0.5,
          x: 100,
          y: 100,
          width: 100,
          height: 100,
          src: robotImg
        };
        return await constructTestRow({ renderer, rowNode }, [
          renderer.createNode({
            ...nodeProps
          }),
          "scale 2 ->\npivot 0.5 ->",
          renderer.createNode({
            ...nodeProps,
            scaleY: 2
            // pivot: 0.5, (should be default)
          }),
          "pivot 0 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 0,
            scaleY: 2
          }),
          "pivot 1 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 1,
            scaleY: 2
          })
        ]);
      }
    },
    {
      title: "Base Node (`scaleY`, mount = 1)",
      content: async (rowNode) => {
        const nodeProps = {
          mount: 1,
          x: 150,
          y: 150,
          width: 100,
          height: 100,
          src: robotImg
        };
        return await constructTestRow({ renderer, rowNode }, [
          renderer.createNode({
            ...nodeProps
          }),
          "scale 2 ->\npivot 0.5 ->",
          renderer.createNode({
            ...nodeProps,
            scaleY: 2
            // pivot: 0.5, (should be default)
          }),
          "pivot 0 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 0,
            scaleY: 2
          }),
          "pivot 1 ->",
          renderer.createNode({
            ...nodeProps,
            pivot: 1,
            scaleY: 2
          })
        ]);
      }
    }
  ]);
  return pageContainer;
}
export {
  automation,
  test as default
};
//# sourceMappingURL=scaling-f542fcb2.js.map
