module.exports = function(eleventyConfig) {

  // static passthroughs
  eleventyConfig.addPassthroughCopy("src/site/assets");
  eleventyConfig.addPassthroughCopy("src/site/favicon.ico");

  // compress and combine js files
  eleventyConfig.addFilter("jsmin", function(code) {
    const UglifyJS = require("uglify-js");
    let minified = UglifyJS.minify(code);
      if( minified.error ) {
          console.log("UglifyJS error: ", minified.error);
          return code;
      }
      return minified.code;
  });

  // minify the html output for bonus points from the web perf pixies
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    const htmlmin = require("html-minifier");
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  // Set up main folders and template options
  return {
    dir: {
      input: "src/site",
      output: "dist",
    },
    templateFormats : ["njk", "md", "11ty.js"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };

};
