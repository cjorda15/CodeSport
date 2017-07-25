const path = require('path')

module.exports = {
  entry:["./src/index.js"],
  output:{
    path: path.resolve(__dirname,"build"),
    filename:"bundle.js",
  },
  module:{
    loaders:[
      {test:/\.js$/,
       loaders:"babel-loader",
        exclude:/node_modules/},
      {test:/\.jsx$/,
       loaders:"babel-loader",
        exclude:/node_modules/},
      {test:/\.css$/,
       loaders:"style-loader!css-loader"},
       {test: /\.scss$/,
        loaders: "style-loader!css-loader!"
      },
      {
            test: /\.jpg$/,
            loader: "file-loader"
        },]
  },
  resolve: {
  extensions: ['.js', '.jsx', '.json', '.scss', '.css']
}
}
