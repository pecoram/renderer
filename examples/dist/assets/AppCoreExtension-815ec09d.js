import { C as CoreExtension, W as WebTrFontFace, S as SdfTrFontFace } from "./CoreExtension-34643308.js";
class AppCoreExtension extends CoreExtension {
  async run(stage) {
    stage.fontManager.addFontFace(
      new WebTrFontFace("NotoSans", {}, "/fonts/NotoSans-Regular.ttf")
    );
    stage.fontManager.addFontFace(
      new WebTrFontFace("Ubuntu", {}, "/fonts/Ubuntu-Regular.ttf")
    );
    stage.fontManager.addFontFace(
      new SdfTrFontFace(
        "Ubuntu",
        {},
        "msdf",
        stage,
        "/fonts/Ubuntu-Regular.msdf.png",
        "/fonts/Ubuntu-Regular.msdf.json"
      )
    );
    stage.fontManager.addFontFace(
      new SdfTrFontFace(
        "Ubuntu-ssdf",
        {},
        "ssdf",
        stage,
        "/fonts/Ubuntu-Regular.ssdf.png",
        "/fonts/Ubuntu-Regular.ssdf.json"
      )
    );
  }
}
export {
  AppCoreExtension as default
};
//# sourceMappingURL=AppCoreExtension-815ec09d.js.map
