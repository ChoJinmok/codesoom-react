import {
  fetchRestaurantInformations,
  fetchRestaurants,
  fetchRestaurantDetail,
  postLogin,
  postReview,
} from './api';

import REGIONS from '../../fixtures/regions';
import CATEGORIES from '../../fixtures/categories';
import RESTAURANTS from '../../fixtures/restaurants';
import RESTAURANT_DETAIL from '../../fixtures/restaurantDetail';
import LOGIN_FIELDS from '../../fixtures/loginFields';
import REVIEW_FIELDS from '../../fixtures/reviewFields';

describe('api', () => {
  const mockFetch = ({ data = {}, ok = true } = {}) => {
    global.fetch = jest.fn().mockResolvedValue({
      ok,
      async json() { return data; },
    });
  };

  describe('fetchRestaurantInformations', () => {
    describe('fetchRegions', () => {
      beforeEach(() => {
        mockFetch({ data: REGIONS });
      });

      it('returns regions', async () => {
        const regions = await fetchRestaurantInformations('regions');

        expect(regions).toEqual(REGIONS);
      });
    });

    describe('fetchCategories', () => {
      beforeEach(() => {
        mockFetch({ data: CATEGORIES });
      });

      it('returns categories', async () => {
        const categories = await fetchRestaurantInformations('categories');

        expect(categories).toEqual(CATEGORIES);
      });
    });
  });

  describe('fetchRestaurants', () => {
    beforeEach(() => {
      mockFetch({ data: RESTAURANTS });
    });

    it('returns restaurants', async () => {
      const restaurants = await fetchRestaurants({
        regionName: '서울',
        categoryId: 1,
      });

      expect(restaurants).toEqual(RESTAURANTS);
    });
  });

  describe('fetchRestaurantDetail', () => {
    beforeEach(() => {
      mockFetch({ data: RESTAURANT_DETAIL });
    });

    it('returns restaurants', async () => {
      const restaurantDetail = await fetchRestaurantDetail({
        restaurantId: 1,
      });

      expect(restaurantDetail).toEqual(RESTAURANT_DETAIL);
    });
  });

  describe('postLogin', () => {
    context('when login is successful', () => {
      beforeEach(() => {
        mockFetch({ data: { accessToken: 'ACCESS_TOKEN' } });
      });

      it('returns access token', async () => {
        const accessToken = await postLogin(LOGIN_FIELDS);

        expect(accessToken).toEqual('ACCESS_TOKEN');
      });
    });

    context('when login fails', () => {
      beforeEach(() => {
        mockFetch({ ok: false });
      });

      it('throws error', async () => {
        await expect(async () => {
          await postLogin(LOGIN_FIELDS);
        }).rejects.toThrowError(new Error('E-mail, Password를 확인해주세요.'));
      });
    });
  });

  describe('postReview', () => {
    beforeEach(() => {
      mockFetch();
    });

    it('returns restaurants', async () => {
      const response = await postReview({
        accessToken: 'ACCESS_TOKEN',
        restaurantId: 1,
        score: REVIEW_FIELDS.score,
        description: REVIEW_FIELDS.description,
      });

      expect(response.ok).toEqual(true);
    });
  });
});
