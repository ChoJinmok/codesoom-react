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
  changeLoginField,
  sendReview,
  setReviews,
  clearReviewFields,
  loadReviews,
} from './restaurantsActions';

import {
  fetchRestaurantDetail,
  postLogin,
} from '../../services/api';

import restaurantDetail from '../../../fixtures/restaurantDetail';
import loginFields from '../../../fixtures/loginFields';
import { loginFormControls } from '../../../fixtures/controls';
import reviewFields from '../../../fixtures/reviewFields';

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

      fetchRestaurantDetail.mockResolvedValue({});
    });

    it('runs setRestaurantDetail', async () => {
      await store.dispatch(loadRestaurantDetail({ restaurantId: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRestaurantDetail(null));
      expect(actions[1]).toEqual(setRestaurantDetail({}));
    });
  });

  describe('requestLogin', () => {
    context('when login is successful', () => {
      const email = loginFormControls[0].value;
      const password = loginFormControls[1].value;

      beforeEach(() => {
        store = mockStore({ restaurantsApp: { loginFields: { email, password } } });

        postLogin.mockResolvedValue('ACCESS_TOKEN');
      });

      it('dispatchs setAccessToken with \'ACCESS_TOKEN\'', async () => {
        await store.dispatch(requestLogin());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setAccessToken('ACCESS_TOKEN'));
      });
    });

    context('when login fails', () => {
      beforeEach(() => {
        store = mockStore({ restaurantsApp: { loginFields } });

        postLogin.mockRejectedValue(new Error('E-mail, Password를 확인해주세요.'));
      });

      it('dispatchs setAccessToken with \'undefined\'', async () => {
        await store.dispatch(requestLogin());

        const actions = store.getActions();

        expect(actions[0]).toEqual(changeLoginField({
          name: 'error',
          value: 'E-mail, Password를 확인해주세요.',
        }));
      });
    });
  });

  describe('loadReviews', () => {
    beforeEach(() => {
      store = mockStore({});

      fetchRestaurantDetail.mockResolvedValue({ reviews: restaurantDetail.reviews });
    });

    it('dispatchs setReviews', async () => {
      await store.dispatch(loadReviews({ restaurantId: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setReviews(restaurantDetail.reviews));
    });
  });

  describe('sendReview', () => {
    beforeEach(() => {
      store = mockStore({ reviewFields });

      fetchRestaurantDetail.mockResolvedValue({ reviews: restaurantDetail.reviews });
    });

    it('dispatchs setReviews & changeReviewField', async () => {
      await store.dispatch(sendReview({ restaurantId: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setReviews(restaurantDetail.reviews));
      expect(actions[1]).toEqual(clearReviewFields());
    });
  });
});
