import { useSelector, useDispatch } from 'react-redux';

import Form from './Form';

import {
  updateRestaurantField,
  addRestaurant,
} from './registerRestaurantActions';

export default function FormContainer() {
  const { restaurant } = useSelector(({ registerRestaurant }) => ({
    restaurant: registerRestaurant.restaurant,
  }));

  const dispatch = useDispatch();

  function handleChange(event) {
    // const { name, value } = event.target;
    const { target: { name, value } } = event;

    dispatch(updateRestaurantField({
      sort: name,
      content: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(addRestaurant());
  }

  return (
    <Form
      restaurant={restaurant}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
