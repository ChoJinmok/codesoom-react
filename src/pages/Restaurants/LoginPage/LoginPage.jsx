import LoginFormContainer from './LoginFormContainer';

export default function LoginPage() {
  return (
    <>
      <h2>Log In</h2>
      <LoginFormContainer />
    </>
  );
}

// REST API
// 메서드 GET/POST/PUT-PATCH/DELETE 가장 많이 사용

// 로그인을 할때는 session이라는 리소스를 만들거야(CRUD 관점에서 Create) -> session - POST
// http POST 주소 필요한정보
// EX. http POST https://eatgo-login-api.ahastudio.com/session email=tester@example.com password=test
//      => 201 created => accessToken 활용
// EX. http POST https://eatgo-login-api.ahastudio.com/session email=test@example.com password=test
//      => 400 Bad Request

// http reponse 300대 redirect

// EX. http POST https://eatgo-customer-api.ahastudio.com/restaurants/1/reviews score=5 description=good
//      => 리뷰 남기기
