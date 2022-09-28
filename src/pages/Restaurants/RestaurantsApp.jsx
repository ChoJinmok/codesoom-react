import { useEffect } from 'react';

import {
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import HomePage from './HomePage';
import AboutPage from './AboutPage';
import LoginPage from './LoginPage/LoginPage';
import RestaurantsPage from './RestaurantsPage/RestaurantsPage';
import RestaurantDetailPage from './RestaurantDetailPage/RestaurantDetailPage';

import { setAccessToken } from './slice';

import { loadItem } from '../../services/storage';

// 기본적인 css 세팅 방법
// 1. App에서 import '../assets/default.css' 이런식으로 webpack에서 css loader 세팅해서 사용
// 2. index.html 에서 style 불러오는 방법 -> link, style 태그 둘다 가능

const Container = styled.div({
  margin: '0 auto',
  width: '90%',
});

const Header = styled.header({
  backgroundColor: '#EEE',
  '& h1': {
    fontSize: '1.5em',
    margin: 0,
    padding: '1em .5em',
  },
  '& a': {
    color: '#555',
    textDecoration: 'none',
    '&:hover': {
      color: '#000',
    },
  },
});

export default function RestaurantsApp() {
  // const { location: { pathname } } = window;

  // const MyComponent = {
  //   '/': HomePage,
  //   '/about': AboutPage,
  //   '/restaurants': RestaurantsPage,
  // }[pathname] || NotFoundPage;

  // TODO: localStorage에서 accessToken 가져오기
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = loadItem('accessToken');

    if (accessToken) {
      dispatch(setAccessToken(accessToken));
    }
  });

  return (
    <Container>
      <Header>
        <h1>
          <Link to="/restaurants-app">EatGo</Link>
        </h1>
      </Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:restaurantId" element={<RestaurantDetailPage />} />
      </Routes>
    </Container>
  );

  // if (pathname === '/') {
  //   return (
  //     <h1>Home</h1>
  //   );
  // }

  // return (
  //   <RestaurantsPage />
  // );
}
