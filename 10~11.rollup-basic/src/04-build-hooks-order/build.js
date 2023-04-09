const rollup = require('rollup');
const util = require('util');

const sleep = async (delay) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  })
}

const DELAY_LONG = 10000
const DELAY_SHORT = 3000
const TIME_LOG_LABEL = 'Counting......'

async function build() {
  const bundle = await rollup.rollup({
    input: ['./index.js'],
    plugins: [
      {
        name: 'Plugin 1',
        // Async + Sequential
        async options(inputOptions) {
          console.time(TIME_LOG_LABEL)
          console.log(`1 options === await ${DELAY_LONG}ms === inputOptions`, inputOptions)
          console.timeLog(TIME_LOG_LABEL)
          await sleep(DELAY_LONG)
          console.log(`1 options === await ${DELAY_LONG}ms DONE!!!`)
          console.timeLog(TIME_LOG_LABEL)
          return null
        },
        // Async + Parallel
        async buildStart(inputOptions) {
          console.log(`1 buildStart === await ${DELAY_LONG}ms === inputOptions`, inputOptions)
          console.timeLog(TIME_LOG_LABEL)
          await sleep(DELAY_LONG)
          console.log(`1 buildStart === await ${DELAY_LONG}ms DONE!!!`)
          console.timeLog(TIME_LOG_LABEL)
          return null
        },
        // Async + First
        resolveId(source, importer, options) {
          /**
           * options: { custom: {}, isEntry: true }
           */
          console.log('1 resolveId === source', source)
          console.log('1 resolveId === importer', importer)
          console.log('1 resolveId === options', options)
          console.timeLog(TIME_LOG_LABEL)
          return null
        },
      },
      {
        name: 'Plugin 2',
        options(inputOptions) {
          console.log('2 options === inputOptions', inputOptions)
          console.timeLog(TIME_LOG_LABEL)
          return null
        },
        buildStart(inputOptions) {
          console.log('2 buildStart === inputOptions', inputOptions)
          console.timeLog(TIME_LOG_LABEL)
          return null
        },
        resolveId(source, importer, options) {
          console.log('2 resolveId === source', source)
          console.log('2 resolveId === importer', importer)
          console.log('2 resolveId === options', options)
          console.timeLog(TIME_LOG_LABEL)
          return null
        },
      },
      {
        name: 'Plugin 3',
        async options(inputOptions) {
          console.log(`3 options === await ${DELAY_SHORT}ms === inputOptions`, inputOptions)
          console.timeLog(TIME_LOG_LABEL)
          await sleep(DELAY_SHORT)
          console.log(`3 options === await ${DELAY_SHORT}ms DONE!!! === inputOptions`, inputOptions)
          console.timeLog(TIME_LOG_LABEL)
          return null
        },
        async buildStart(inputOptions) {
          console.log(`3 buildStart === await ${DELAY_SHORT}ms === inputOptions`, inputOptions)
          console.timeLog(TIME_LOG_LABEL)
          await sleep(DELAY_SHORT)
          console.log(`3 buildStart === await ${DELAY_SHORT}ms DONE!!!`, inputOptions)
          console.timeLog(TIME_LOG_LABEL)
          return null
        },
        resolveId(source, importer, options) {
          console.log('3 resolveId === source', source)
          console.log('3 resolveId === importer', importer)
          console.log('3 resolveId === options', options)
          console.timeLog(TIME_LOG_LABEL)
          return null
        },
        // Async + Parallel
        buildEnd() {
          console.log('3 buildEnd ===')
          console.timeEnd(TIME_LOG_LABEL)
          return null
        }
      },
    ]
  });

  console.log('inspect bundle ===', util.inspect(bundle));
}

build();
