module.exports = [
  {
    input: "server/index.js",
    output: {
      format: "cjs",
      file: "dist/server-cjs.js",
    },
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/client-esm.js",
      format: "esm",
    },
  },
];
