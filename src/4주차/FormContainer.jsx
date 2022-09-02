import { useSelector, useDispatch } from 'react-redux';

import Form from './Form';

import {
  updateRestaurantField,
  addRestaurant,
} from './actions';

export default function FormContainer() {
  const { restaurant } = useSelector((state) => ({
    restaurant: state.restaurant,
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
