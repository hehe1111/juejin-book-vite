const rollup = require('rollup');
const util = require('util');

async function build() {
  const bundle = await rollup.rollup({
    input: ['./index.js'],
    plugins: [
      {
        name: 'DoNothing',
        // Async + Sequential
        options(inputOptions) {
          console.log('options === inputOptions', inputOptions)
          return null
        },
        // Async + Parallel
        buildStart(inputOptions) {
          console.log('buildStart === inputOptions', inputOptions)
          return null
        },
        // Async + First
        resolveId(source, importer, options) {
          console.log('resolveId === source', source)
          console.log('resolveId === importer', importer)
          console.log('resolveId === options', options)
          return null
        },
        // Async + First
        load(id) {
          console.log('load === id', id)
          return null
        },
        // Async + First
        shouldTransformCachedModule(options) {
          /**
           * options
           * {
           *   ast: AcornNode;
           *   code: string;
           *   id: string;
           *   meta: CustomPluginOptions;
           *   moduleSideEffects: boolean | 'no-treeshake';
           *   syntheticNamedExports: boolean | string;
           * }
           */
          console.log('load === options', options)
          return null
        },
        // Async + Sequential
        transform(code, id) {
          console.log('transform === code', code)
          console.log('transform === id', id)
          return null
        },
        // Async + Parallel
        moduleParsed(info) {
          console.log('moduleParsed === info', info)
          return null
        },
        // Async + First
        resolveDynamicImport(specifier, importer) {
          console.log('resolveDynamicImport === specifier', specifier)
          console.log('resolveDynamicImport === importer', importer)
          return null
        },
        // Async + Parallel
        buildEnd(error) {
          console.log('buildEnd === error', error)
          return null
        },
        // Async + Parallel
        // closeWatcher: (this: PluginContext) => void;
        // Async + Parallel
        // watchChange: WatchChangeHook;
      },
    ]
  });

  // console.log('inspect bundle ===', util.inspect(bundle));
  const result = await bundle.generate({
    format: 'es',
    plugins: [
      {
        // Sync + Sequential
        outputOptions(outputOptions) {
          console.log('outputOptions === outputOptions', outputOptions)
          return null
        },
        // Async + Parallel
        renderStart(outputOptions, inputOptions) {
          console.log('renderStart === outputOptions', outputOptions)
          console.log('renderStart === inputOptions', inputOptions)
          return null
        },
        // Async + Sequential
        renderChunk(code, chunk) {
          console.log('renderChunk === code', code)
          console.log('renderChunk === chunk', chunk)
          return null
        },
        // Async + Sequential
        generateBundle(options, bundle, isWrite) {
          console.log('generateBundle === options', options)
          console.log('generateBundle === bundle', bundle)
          console.log('generateBundle === isWrite', isWrite)
          return null
        },
        // ! 需要手动调用 bundle.close() 才会触发 closeBundle，否则不触发
        // Async + Parallel
        closeBundle() {
          console.log('closeBundle ===')
          return null
        }
      }
    ]
  });
  // 调用了也没触发 closeBundle
  // 控制台报错：The "closeBundle" hook used by the output plugin at output position 1 is a build time hook and will not be run for that plugin. Either this plugin cannot be used as an output plugin, or it should have an option to configure it as an output plugin.
  // bundle.close()
  console.log('result:', result);
}

build();
