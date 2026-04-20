const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const CleanCSS = require("clean-css");

const fileName = "myriad.css";

module.exports = class {
  async data() {
    const rawFilepath = path.join(__dirname, `../_includes/postcss/${fileName}`);

    return {
      permalink: `css/${fileName}`,
      rawFilepath,
      rawCss: fs.readFileSync(rawFilepath)
    };
  }

  async render({ rawCss, rawFilepath }) {
    return postcss([
      require("postcss-import"),
      require("precss"),
      require("autoprefixer")
    ])
      .process(rawCss, { from: rawFilepath })
      .then((result) => new CleanCSS().minify(result.css).styles);
  }
};
