module.exports = [
  {
    name: 'web',
    entry: './src/index.js',
    output: {
      path: `./web/`,
      filename: 'jokeapi-wrapper.js',
      sourceMapFilename: 'jokeapi-wrapper.map',
      library: 'jokeapi_wrapper',
    },
    target: 'web',
    mode: 'production',
  },
  {
    name: 'node',
    entry: './src/index.js',
    output: {
      path: `./dist/`,
      filename: 'jokeapi-wrapper.js',
      sourceMapFilename: 'jokeapi-wrapper.map',
      library: 'jokeapi_wrapper',
      globalObject: 'this',
    },
    target: 'node',
    mode: 'production',
  },
];
