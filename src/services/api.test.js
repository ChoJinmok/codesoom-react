import {
  fetchRestaurantInformations,
  fetchRestaurants,
  fetchRestaurantDetail,
  postLogin,
} from './api';

import REGIONS from '../../fixtures/regions';
import CATEGORIES from '../../fixtures/categories';
import RESTAURANTS from '../../fixtures/restaurants';
import RESTAURANT_DETAIL from '../../fixtures/restaurantDetail';
import LOGIN_FIELDS from '../../fixtures/loginFields';

describe('api', () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

  describe('fetchRestaurantInformations', () => {
    describe('fetchRegions', () => {
      beforeEach(() => {
        mockFetch(REGIONS);
      });

      it('returns regions', async () => {
        const regions = await fetchRestaurantInformations('regions');

        expect(regions).toEqual(REGIONS);
      });
    });

    describe('fetchCategories', () => {
      beforeEach(() => {
        mockFetch(CATEGORIES);
      });

      it('returns categories', async () => {
        const categories = await fetchRestaurantInformations('categories');

        expect(categories).toEqual(CATEGORIES);
      });
    });
  });

  describe('fetchRestaurants', () => {
    beforeEach(() => {
      mockFetch(RESTAURANTS);
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
      mockFetch(RESTAURANT_DETAIL);
    });

    it('returns restaurants', async () => {
      const restaurantDetail = await fetchRestaurantDetail({
        restaurantId: 1,
      });

      expect(restaurantDetail).toEqual(RESTAURANT_DETAIL);
    });
  });

  describe('postLogin', () => {
    beforeEach(() => {
      mockFetch({ accessToken: 'ACCESS_TOKEN' });
    });

    it('returns access token', async () => {
      const accessToken = await postLogin(LOGIN_FIELDS);

      expect(accessToken).toEqual('ACCESS_TOKEN');
    });
  });
});
