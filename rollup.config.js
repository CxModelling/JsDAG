const definition = require("./package.json");
const dependencies = Object.keys(definition.dependencies || {});


export default {
    external: dependencies,
    entry: "index.js",
    format: "cjs",
    dest: "dist/epidag.js",
    plugins: []
};