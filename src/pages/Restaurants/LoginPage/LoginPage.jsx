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

// 1. Authentication(인증): 내가 누구인지에 대해 정보를 얻는 것 (id, password를 이용해서)
// 2. Authorization(인가): 얻은 정보를 이용해서 내가 사용할 수 있는 것 (로그인을 해서 리뷰를 남길 수 있다)
// http POST https://eatgo-customer-api.ahastudio.com/restaurants/1
// http POST https://eatgo-customer-api.ahastudio.com/restaurants/1/reviews score=5 description=Good "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjMsIm5hbWUiOiLthYzsiqTthLAifQ.3qbijgcDDeFcVviXBZ45BS8CgdtpQvaCoXTkktEsPks"
// Bearer: 타입 중에 하나 (mdn Authentication 참고) Authentication이 끝나면 Authorization으로 넘겨줌

// http GET https://eatgo-customer-api.ahastudio.com/restaurants/1 | grep good 이런식으로 검색해 줄 수 있음
