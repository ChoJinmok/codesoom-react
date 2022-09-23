import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import {
  loadRestaurantInformations,
  setRestaurantInformations,
  loadRestaurants,
  setRestaurants,
  loadRestaurantDetail,
  setRestaurantDetail,
  requestLogin,
  setAccessToken,
} from './restaurantsActions';

import loginFields from '../../../fixtures/loginFields';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../services/api');

describe('actions', () => {
  let store;

  describe('loadRestaurantInformations', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('runs setRegions and setCategories', async () => {
      await store.dispatch(loadRestaurantInformations('regions'));
      await store.dispatch(loadRestaurantInformations('categories'));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRestaurantInformations({
        sort: 'regions',
        data: [],
      }));
      expect(actions[1]).toEqual(setRestaurantInformations({
        sort: 'categories',
        data: [],
      }));
    });
  });

  describe('loadRestaurants', () => {
    context('with selectedRegion and selectedCategory', () => {
      beforeEach(() => {
        store = mockStore({
          restaurantsApp: {
            filter: {
              regionName: '서울',
              categoryId: 1,
            },
          },
        });
      });

      it('runs setRestaurants', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRestaurants([]));
      });
    });

    // context('without selectedRegion', () => {
    //   beforeEach(() => {
    //     store = mockStore({
    //       restaurantsApp: {
    //         filter: {
    //           categoryId: 1,
    //         },
    //       },
    //     });
    //   });

    //   it('does\'nt run any actions', async () => {
    //     await store.dispatch(loadRestaurants());

    //     const actions = store.getActions();

    //     expect(actions).toHaveLength(0);
    //   });
    // });

    // context('without selectedCategory', () => {
    //   beforeEach(() => {
    //     store = mockStore({
    //       restaurantsApp: {
    //         filter: {
    //           regionName: '서울',

    //         },
    //       },
    //     });
    //   });

    //   it('does\'nt run any actions', async () => {
    //     await store.dispatch(loadRestaurants());

    //     const actions = store.getActions();

    //     expect(actions).toHaveLength(0);
    //   });
    // });
  });

  describe('loadRestaurantDetail', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('runs setRestaurantDetail', async () => {
      await store.dispatch(loadRestaurantDetail({ restaurantId: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRestaurantDetail(null));
      expect(actions[1]).toEqual(setRestaurantDetail({ restaurantId: 1 }));
    });
  });

  describe('requestLogin', () => {
    beforeEach(() => {
      store = mockStore({ restaurantsApp: { loginFields } });
    });

    it('dispatchs postLogin', async () => {
      await store.dispatch(requestLogin());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setAccessToken('ACCESS_TOKEN'));
    });
  });
});
