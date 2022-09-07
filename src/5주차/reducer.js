const initialState = {
  regions: [],
  categories: [],
  restaurants: [],
  filter: {
    regionName: null,
    categoryId: null,
  },
};

const reducers = {
  setRestaurantInformations(state, { payload: { sort, data } }) {
    return {
      ...state,
      [sort]: data,
    };
  },

  applyFilter(state, { payload: { field, content } }) {
    const { filter } = state;

    return {
      ...state,
      filter: {
        ...filter,
        [field]: content,
      },
    };
  },

  setRestaurants(state, { payload: { restaurants } }) {
    return {
      ...state,
      restaurants,
    };
  },
};

export default function reducer(state = initialState, action) {
  return reducers[action.type]
    ? reducers[action.type](state, action)
    : state;
}
