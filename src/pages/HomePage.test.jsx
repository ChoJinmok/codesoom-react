import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import HomePage from './HomePage';

// Link의 경우 BrowseRouter 안에서만 작동해야하는데 바깥쪽에 있다고 애러가 난다.
// 하지만 BrowserRouter는 무겁기 때문에 MemoryRouter를 이용하면 가볍게 테스트가 가능하다.
test('HomePage', async () => {
  const { container, getAllByRole } = render((
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  ));

  const targetPaths = ['about', 'restaurants'];

  const linkList = getAllByRole('link');

  expect(container).toHaveTextContent('Home');

  linkList.forEach((link, index) => {
    expect(link.href).toContain(targetPaths[index]);
  });
});
