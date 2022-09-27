import reducer from './restaurantsReducer';

import {
  setRestaurantInformations,
  applyFilter,
  setRestaurants,
  setRestaurantDetail,
  changeLoginField,
  setAccessToken,
  logout,
  changeReviewField,
  clearReviewFields,
  setReviews,
} from './restaurantsActions';

import { restaurantsInitialState as INITIALSTATE } from '../../../fixtures/initialState';
import REGIONS from '../../../fixtures/regions';
import CATEGORIES from '../../../fixtures/categories';
import RESTAURANTS from '../../../fixtures/restaurants';
import RESTAURANT_DETAIL from '../../../fixtures/restaurantDetail';
import LOGIN_FIELDS from '../../../fixtures/loginFields';
import REVIEW_FIELDS from '../../../fixtures/reviewFields';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    it('returns initial state in the begining', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(INITIALSTATE);
    });
  });

  it('returns receved state as is with unspecified action type', () => {
    const settingState = {
      regions: REGIONS,
      categories: CATEGORIES,
      restaurants: RESTAURANTS,
      filter: {
        regionName: REGIONS[0].name,
        categoryId: CATEGORIES[0].id,
      },
    };

    const {
      regions, categories, restaurants, filter: { regionName, categoryId },
    } = reducer(settingState, {});

    regions.forEach((region, index) => {
      expect(region.id).toBe(REGIONS[index].id);
      expect(region.name).toBe(REGIONS[index].name);
    });

    categories.forEach((category, index) => {
      expect(category.id).toBe(CATEGORIES[index].id);
      expect(category.name).toBe(CATEGORIES[index].name);
    });

    restaurants.forEach((restaurant, index) => {
      expect(restaurant.id).toBe(RESTAURANTS[index].id);
      expect(restaurant.name).toBe(RESTAURANTS[index].name);
    });

    expect(regionName).toBe(REGIONS[0].name);
    expect(categoryId).toBe(CATEGORIES[0].id);
  });

  describe('setRestaurantInformations', () => {
    it('changes regions', () => {
      const { regions } = reducer({
        regions: [],
      }, setRestaurantInformations({
        sort: 'regions',
        data: REGIONS,
      }));

      expect(regions).toHaveLength(REGIONS.length);
    });

    it('changes categories', () => {
      const { categories } = reducer({
        categories: [],
      }, setRestaurantInformations({
        sort: 'categories',
        data: CATEGORIES,
      }));

      expect(categories).toHaveLength(CATEGORIES.length);
    });
  });

  describe('applyFilter', () => {
    it('changes region name in filter', () => {
      const targetName = REGIONS[0].name;

      const { filter } = reducer({
        filter: { regionName: null },
      }, applyFilter({
        field: 'regionName',
        content: targetName,
      }));

      // expect(filter.regionName).toBe(targetName);
      expect(filter).toEqual({
        regionName: targetName,
      });
    });

    it('changes category id in filter', () => {
      const targetId = CATEGORIES[0].id;

      const { filter } = reducer({
        filter: { categoryId: null },
      }, applyFilter({
        field: 'categoryId',
        content: targetId,
      }));

      // expect(filter.categoryId).toBe(targetId);
      expect(filter).toEqual({
        categoryId: targetId,
      });
    });
  });

  describe('setRestaurants', () => {
    it('changes restaurants', () => {
      const { restaurants } = reducer({
        restaurants: [],
      }, setRestaurants(RESTAURANTS));

      expect(restaurants).toHaveLength(RESTAURANTS.length);
    });
  });

  describe('setRestaurantDetail', () => {
    context('when restaurant is null', () => {
      it('changes restaurant to be null', () => {
        const initialState = {
          restaurantDetail: RESTAURANT_DETAIL,
        };

        const { restaurantDetail } = reducer(initialState, setRestaurantDetail(null));

        expect(restaurantDetail).toBe(null);
      });
    });

    context('when restaurant exists', () => {
      it('changes restaurant detail', () => {
        const initialState = {
          restaurantDetail: null,
        };

        const { restaurantDetail } = reducer(initialState, setRestaurantDetail(RESTAURANT_DETAIL));

        expect(restaurantDetail.id).toBe(RESTAURANT_DETAIL.id);
        expect(restaurantDetail.name).toBe(RESTAURANT_DETAIL.name);
        expect(restaurantDetail.address).toBe(RESTAURANT_DETAIL.address);
        expect(restaurantDetail.menuItems).toEqual(RESTAURANT_DETAIL.menuItems);

        const reverseReviews = [...RESTAURANT_DETAIL.reviews].sort((a, b) => b.id - a.id);

        restaurantDetail.reviews.forEach((review, index) => {
          expect(review).toEqual(reverseReviews[index]);
        });
      });
    });
  });

  describe('changeLoginFields', () => {
    const initialState = {
      loginFields: {
        email: '',
        password: '',
        error: '',
      },
    };

    const { email: EMAIL, password: PASSWORD } = LOGIN_FIELDS;

    context('when email is chaged', () => {
      it('changes email', () => {
        const { loginFields: { email } } = reducer(
          initialState,
          changeLoginField({
            name: 'email',
            value: EMAIL,
          }),
        );

        expect(email).toBe(EMAIL);
      });
    });

    context('when password is chaged', () => {
      it('changes password', () => {
        const { loginFields: { password } } = reducer(
          initialState,
          changeLoginField({
            name: 'password',
            value: PASSWORD,
          }),
        );

        expect(password).toBe(PASSWORD);
      });
    });

    context('when login fails', () => {
      it('changes error', () => {
        const { loginFields: { error } } = reducer(
          initialState,
          changeLoginField({
            name: 'error',
            value: 'E-mail, Password를 확인해주세요.',
          }),
        );

        expect(error).toBe('E-mail, Password를 확인해주세요.');
      });
    });
  });

  describe('setAccessToken', () => {
    it('changes access token', () => {
      const initialState = {
        accessToken: '',
      };

      const { accessToken } = reducer(initialState, setAccessToken('TOKEN'));

      expect(accessToken).toBe('TOKEN');
    });
  });

  describe('logout', () => {
    it('removes access token', () => {
      const initialState = {
        accessToken: 'ACCESS_TOKEN',
      };

      const { accessToken } = reducer(initialState, logout());

      expect(accessToken).toBe('');
    });
  });

  describe('changeReviewField', () => {
    const initialState = {
      reviewFields: {
        score: '',
        description: '',
      },
    };

    const { score: SCORE, description: DECRIPTION } = REVIEW_FIELDS;

    context('when review score is chaged', () => {
      it('changes review score', () => {
        const { reviewFields: { score } } = reducer(
          initialState,
          changeReviewField({ name: 'score', value: SCORE }),
        );

        expect(score).toBe(SCORE);
      });
    });

    context('when review description is chaged', () => {
      it('changes review description', () => {
        const { reviewFields: { description } } = reducer(
          initialState,
          changeReviewField({ name: 'description', value: DECRIPTION }),
        );

        expect(description).toBe(DECRIPTION);
      });
    });
  });

  describe('clearReviewFields', () => {
    const initialState = {
      reviewFields: REVIEW_FIELDS,
    };

    it('clears fields of review', () => {
      const { reviewFields: { score, description } } = reducer(
        initialState,
        clearReviewFields(),
      );

      expect(score).toBe('');
      expect(description).toBe('');
    });
  });

  describe('setReviews', () => {
    it('changes reviews of the current restaurant', () => {
      const REVIEWS = RESTAURANT_DETAIL.reviews;

      const initialState = {
        restaurantDetail: {
          reviews: [],
        },
      };

      const { restaurantDetail: { reviews } } = reducer(initialState, setReviews(REVIEWS));

      expect(reviews).toHaveLength(REVIEWS.length);
    });
  });
});
