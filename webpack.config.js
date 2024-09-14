const path = require('path');

module.exports = {
  target:'web',
  entry: {
    index:'./src/FontSizeTool.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'font-size-tool.js',
    library: 'FontSizeTool',
    libraryTarget: 'umd',
    globalObject: "this",
    umdNamedDefine: true,
    libraryExport: 'default',
  },
  
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.svg$/,
        use : [{
            loader  : 'svg-inline-loader',
            options : {
                removeSVGTagAttrs : false
            }
        }]
      }
    ],
  },
};
