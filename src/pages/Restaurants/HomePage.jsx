import { Link } from 'react-router-dom';
// a태그의 경우 새롭게 통신이 일어난다.
// Link는 통신이 일어나지 않고 주소만 바꿔준다 -> SPA구현 가능하게 해준다. -> 로딩중 표시도 가능하게 해줌
// 사용자 경험도 좋고, 실제로 빠르게 일어난다.

import styled from '@emotion/styled';

const Title = styled.h2({
  fontSize: '2em',
  margin: 0,
  padding: '.4em 0',
});

const List = styled.ul({
  display: 'flex',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

const Item = styled.li({
  '&:not(:last-child)': {
    marginRight: '1em',
  },
  '& a': {
    color: '#333',
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
      fontWeight: 'bold',
    },
  },
});

export default function HomePage() {
  return (
    <>
      <Title>Home</Title>
      <List>
        <Item>
          <Link to="about">About</Link>
        </Item>
        <Item>
          <Link to="login">Login</Link>
        </Item>
        <Item>
          <Link to="restaurants">Restaurants</Link>
        </Item>
      </List>
    </>
  );
}
