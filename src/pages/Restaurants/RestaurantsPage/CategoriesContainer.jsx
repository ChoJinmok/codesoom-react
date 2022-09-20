import { useSelector } from 'react-redux';

import Categories from './Categories';

import { get } from '../utils';

export default function CategoriesContainer({ onClick }) {
  // getSelector('categories') -> 이런식으로 다 묶는 사람도 있음
  const categories = useSelector(get({
    page: 'restaurantsApp',
    key: 'categories',
  }));

  const { categoryId } = useSelector(get({
    page: 'restaurantsApp',
    key: 'filter',
  }));

  // const categories = useSelector((state) => state.categories);
  // const filter = useSelector((state) => state.filter);

  // const { categories, filter } = useSelector((state) => ({
  //   categories: state.categories,
  //   filter: state.filter,
  // }));

  return (
    <Categories
      categories={categories}
      onClick={onClick}
      categoryId={categoryId}
    />
  );
}
