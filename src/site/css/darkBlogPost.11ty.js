const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

const fileName = "darkBlogPost.css";


module.exports = class {
  async data () {
    const rawFilepath = path.join(__dirname, `../_includes/postcss/${fileName}`);
    return {
      permalink: `css/${fileName}`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath)
    };
  };

  async render ({ rawCss, rawFilepath }) {
    return await postcss([
      require('postcss-import'),
      require('precss'),
      require('autoprefixer')
    ])
    .process(rawCss, { from: rawFilepath })
    .then(result => result.css);
  };
}
