import Logo from "./logo.svg";

function App() {
  return (
    <>
      {/* 切换以下注释需要同时变更 vite.config.ts 里的配置 */}

      {/* 右键检查元素，可以发现渲染结果是不同的 */}

      {/* 这一行不要解开注释：使用 svgr({ defaultExport: "url" }) */}
      {/* <div>渲染结果是 img</div>
      <img src={Logo} /> */}

      {/* 这一行不要解开注释：使用 svgr() 实际上是使用 svgr({ defaultExport: "component" }) */}
      <div>渲染结果是 svg</div>
      <Logo />
    </>
  );
}

export default App;
