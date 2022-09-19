// 개발 환경에서만 test를 해주기 때문에 -d 모드로 jest, babel-jest(jsx를 사용하면서 babel을 사용하기 때문에 설치해줘야함)
// test.js 확장자명으로 파일을 만들면 테스트가 진행된다.
// VSCode 같은 경우 타입도 같이 적어줘야한다. (@types/jest 설치) 자동완성에서 문제가 생김
// ealint env에 jest 환경 추가
// npx jest --watchAll : 이 프로젝트에 있는 모든 파일들 계속 감시

// TDD Cycle => 계속해서 반복
// RED : 실패하는 테스트 작성(아직 함수가 없기 때문)
// GREEN : return 4를 해서 재빨리 통과시킴
// REFACTORING : 올바르게 되도록 코침

function add(x, y) {
  // TODO:
  // return 4;
  // x, y 매개변수 만들어줌;
  // return 1 + 3;
  return x + y;
}

// 첫번째 인자 : 테스트 이름
// 두번째 인자 : 테스트할 함수
// toBe : matcher(실제로 나온 결과물에대해서 알게해줌)중 하나
test('simple', () => {
  // assertion => A(actual, 실제로 일어난 일)가 B(expect, 기대하는 일)여야 한다.(단언문, 테스트의 기본)
  // 1 + 1 : actual, 2 : expect
  expect(1 + 1).toBe(2);
});

test('add', () => {
  // Signature : 매서드, 함수에 대한 구분할 수 있는 특징 - name(add), parameters(x, y), return(result)
  // ex. add를 어떻게 쓸것이다.
  expect(add(1, 3)).toBe(4);
});
