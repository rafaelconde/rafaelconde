const { DateTime } = require('luxon');


module.exports = function(eleventyConfig) {

  // static passthroughs
  eleventyConfig.addPassthroughCopy("src/site/assets");
  eleventyConfig.addPassthroughCopy("src/site/favicon.ico");


  // Add a friendly date filter to nunjucks.
  // Defaults to format of LLLL d, y unless an
  // alternate is passed as a parameter.
  // {{ date | friendlyDate('OPTIONAL FORMAT STRING') }}
  // List of supported tokens: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
  eleventyConfig.addFilter('friendlyDate', function(dateObj, format) {
    var formatString = format ? format : 'LLLL d, y';
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat(formatString);
  });



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
