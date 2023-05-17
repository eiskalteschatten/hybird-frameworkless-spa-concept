module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'inline-source-map',
  entry: {
    async: { import: './assets/scripts/async.ts', filename: 'scripts/async.js' },
    important: { import: './assets/scripts/important.ts', filename: 'scripts/important.js' },
  },
  output: {
    filename: 'scripts/[name].js',
    path: __dirname + '/public/dist',
    clean: process.env.NODE_ENV !== 'development',
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.frontend.json',
        },
      },
    ],
  },
};
