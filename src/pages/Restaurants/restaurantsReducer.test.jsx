import reducer from './restaurantsReducer';

import {
  setRestaurantInformations,
  applyFilter,
  setRestaurants,
  setRestaurantDetail,
} from './restaurantsActions';

import REGIONS from '../../../fixtures/regions';
import CATEGORIES from '../../../fixtures/categories';
import RESTAURANTS from '../../../fixtures/restaurants';
import RESTAURANT_DETAIL from '../../../fixtures/restaurantDetail';

describe('reducer', () => {
  it('returns initial state in the begining', () => {
    const {
      regions, categories, restaurants, filter: { regionName, categoryId },
    } = reducer(undefined, {});

    expect(regions).toHaveLength(0);
    expect(categories).toHaveLength(0);
    expect(restaurants).toHaveLength(0);
    expect(regionName).toBeNull();
    expect(categoryId).toBeNull();
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
    it('changes restaurant detail', () => {
      const initialState = {
        restaurantDetail: null,
      };

      const { restaurantDetail } = reducer(initialState, setRestaurantDetail(RESTAURANT_DETAIL));

      expect(restaurantDetail).toEqual(RESTAURANT_DETAIL);
    });
  });
});
