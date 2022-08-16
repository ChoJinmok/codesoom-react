module.exports = {
  testEnvironment: 'jsdom',
  // 파일을 가져와서 파일을 테스트할 때마다 넣어주는 설정
  setupFilesAfterEnv: ['./jest.setup.js'],
};
