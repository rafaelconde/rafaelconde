const fs = require("fs");
const path = require("path");
const UglifyJS = require("uglify-js");

const fileName = "scripts.js";

module.exports = class {
  async data() {
    const rawFilepath = path.join(__dirname, "../_includes/js/scripts.js");

    return {
      permalink: `js/${fileName}`,
      rawFilepath,
      rawJs: fs.readFileSync(rawFilepath, "utf8")
    };
  }

  async render({ rawJs }) {
    const minified = UglifyJS.minify(rawJs);

    if (minified.error) {
      console.log("UglifyJS error: ", minified.error);
      return rawJs;
    }

    return minified.code;
  }
};
