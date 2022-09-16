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
  // resolve 이슈가 일어난다면 확인해봐야한다!
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    // 우리가 요청하는 모든 것이 index로 모이게 할 수 있다.
    // 주소 뒤에 /about 이런식으로 붙여도 index가 보여진다.
    // 이렇게 하면 요청한 것(주소)에 따라서 다른 화면을 구현해줘야한다.
    // historyApiFallback: {
    //   index: 'index.html',
    // },
    historyApiFallback: true,
    // port:
    // 기본 포트번호 설정 가능(기본값 8080)
  },
};

// 실제 서비스 같은 경우 redirect를 사용하거면 모듈 index.html로 몰아줄 수 있음
// 개발 환경에서는 webpack의 devServer설정해줘야함
