import { useSelector } from 'react-redux';

import Categories from './Categories';

export default function CategoriesContainer() {
  const { categories } = useSelector(({ registerRestaurant }) => ({
    categories: registerRestaurant.categories,
  }));

  return (
    <Categories categories={categories} />
  );
}
