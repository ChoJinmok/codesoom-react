// 표준 라이브러리 path
const path = require('path');

module.exports = {
  // index.jsx파일로도 진입할 수 있게 entry 수정
  // __dirname(현재 디렉토리)경로에 index.jsx 결합
  entry: path.resolve(__dirname, 'src/index.jsx'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
