import { Plugin } from "vite";
import * as process from 'process'

// 执行 pnpm build、pnpm dev 都可以，看不同插件的输出

export default function VerifyHookOrder(): Plugin {
  return {
    name: 'vite-plugin-verify-hook-order',
    // Vite 独有钩子
    config(config) {
      console.log('config ===');
    },
    // Vite 独有钩子
    configResolved(resolvedConfig) {
      console.log('configResolved ===');
    },
    // 通用钩子
    options(opts) {
      console.log('options ===');
      return opts;
    },
    // Vite 独有钩子
    configureServer(server) {
      console.log('configureServer ===');
      // ! 如果要看热更新，这里需要注释
      // setTimeout(() => {
      //   // 手动退出进程
      //   process.kill(process.pid, 'SIGTERM');
      // }, 3000)
    },
    // 通用钩子
    buildStart() {
      console.log('buildStart ===');
    },
    // 通用钩子
    resolveId(source, importer, options) {
      console.log('resolveId === source', source);
      console.log('resolveId === importer', importer);
      // console.log('resolveId === options', options);
    },
    // 通用钩子
    load(id) {
      console.log('load === id', id);
    },
    // 通用钩子
    transform(code, id, options) {
      // console.log('transform === code', code);
      console.log('transform === id', id);
      // console.log('transform === options', options);
    },
    // Vite 独有钩子
    // transformIndexHtml(html, context, bundle) {},
    // Vite 独有钩子
    handleHotUpdate(context) {
      console.log('handleHotUpdate === context', context);
    },
    // 通用钩子
    buildEnd() {
      console.log('buildEnd ===');
    },
    // 通用钩子
    closeBundle() {
      console.log('closeBundle ===');
    }
  };
}
