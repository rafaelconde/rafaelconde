// const postcss = require("postcss");
// const autoprefixer = require("autoprefixer");
const syntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");
const CleanCSS = require("clean-css");
const UglifyJS = require("uglify-js");

module.exports = function(eleventyConfig) {

  // syntax highlighting plugin to use in any md files
  eleventyConfig.addPlugin(syntaxHighlightPlugin, {
    templateFormats: "md"
  });

  // Add date format filter
  // eleventyConfig.addFilter("dateDisplay", require("./src/site/_filters/dates.js") );

  // add a filter to compile postCSS
  // eleventyConfig.addFilter("postCSS", function(code) {
  //   return postcss([autoprefixer]).process(code).css;
  // });
  eleventyConfig.addFilter("cssmin", function(code) {
    const output = new CleanCSS({}).minify(code);

    console.log(output.errors)

    return output.styles;
  });


  // static passthroughs
  eleventyConfig.addPassthroughCopy("src/site/assets");
  eleventyConfig.addPassthroughCopy("src/site/favicon.ico");

  // compress and combine js files
  eleventyConfig.addFilter("jsmin", function(code) {
      let minified = UglifyJS.minify(code);
      if( minified.error ) {
          console.log("UglifyJS error: ", minified.error);
          return code;
      }
      return minified.code;
  });

  // minify the html output for bonus points from the web perf pixies
  const htmlmin = require("html-minifier");
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
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

  // Set up main folders and temaplet options
  return {
    dir: {
      input: "src/site",
      output: "dist",
    },
    templateFormats : ["njk", "md"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };

};
