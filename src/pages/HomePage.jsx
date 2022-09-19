import { Link } from 'react-router-dom';
// a태그의 경우 새롭게 통신이 일어난다.
// Link는 통신이 일어나지 않고 주소만 바꿔준다 -> SPA구현 가능하게 해준다. -> 로딩중 표시도 가능하게 해줌
// 사용자 경험도 좋고, 실제로 빠르게 일어난다.

export default function HomePage() {
  return (
    <>
      <h2>Index</h2>
      <ol>
        <li><Link to="/counter">Counter App</Link></li>
        <li><Link to="/todos">To-do App</Link></li>
      </ol>
    </>
  );
}
