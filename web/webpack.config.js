module.exports = {
  entry: "./main.js",
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel",
        query: {
          presets: ["es2015", "react"]
        },
      }
    ]
  },
  output: {
    path: "../public/assets/",
    filename: "app.js",
  },
  plugins: [
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"],
    modulesDirectories: [ "node_modules" ],
  }
}
