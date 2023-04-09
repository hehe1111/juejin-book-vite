// ! 可以用 vscode 调试：启动「chap12: Launch via PNPM」

import { Plugin } from "vite";
import * as fs from "fs";
import * as resolve from "resolve";

interface SvgrOptions {
  defaultExport: "url" | "component";
}

export default function viteSvgrPlugin(options?: SvgrOptions): Plugin {
  const { defaultExport = "component" } = options || {};

  return {
    name: "vite-plugin-svgr",

    async transform(code, id) {
      // 1. 根据 id 入参（即：import 路径）过滤出 svg 资源
      if (!id.endsWith(".svg")) {
        return code;
      }
      console.log(code, id);
      const svgrTransform = require("@svgr/core").transform;
      const notUsedVitePath = require.resolve("vite") // ! 仅调试用
      // 解析 esbuild 的路径，后续转译 jsx 会用到，这里直接拿 vite 中的 esbuild 即可
      const esbuildPackagePath = resolve.sync("esbuild", {
        basedir: require.resolve("vite"),
      });
      const esbuild = require(esbuildPackagePath);
      // 2. 读取 svg 文件内容
      const svg = await fs.promises.readFile(id, "utf8");
      // 3. 利用 `@svgr/core` 将 svg 转换为 React 组件代码
      const svgrResult = await svgrTransform(
        svg,
        {},
        { componentName: "ReactComponent" }
      );
      let componentCode = svgrResult;
       // 4. 处理默认导出为 url 的情况
      if (defaultExport === "url") {
        componentCode = svgrResult.replace(
          "export default ReactComponent",
          "export { ReactComponent }"
        );
        // 加上 Vite 默认的 `export default 资源路径`
        componentCode += code;
      }
      // 5. 利用 esbuild，将组件中的 jsx 代码转译为浏览器可运行的代码
      const result = await esbuild.transform(componentCode, {
        loader: "jsx",
      });
      return result.code;
    },
  };
}
