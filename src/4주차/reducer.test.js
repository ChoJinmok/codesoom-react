import reducer from './reducer';

import {
  setRestaurants,
  updateRestaurant,
  addRestaurant,
} from './actions';

import fixturesRestaurants from '../fixtures/restaurants';

describe('reducer', () => {
  it('returns initial state at initial situation', () => {
    const state = reducer(undefined, {});

    expect(state.restaurants).toHaveLength(0);
  });

  context('when recieving unspecified action type', () => {
    it('returns recevied state as is', () => {
      const settingState = {
        information: {
          name: 'New Name',
          category: 'New Category',
          address: 'New Address',
        },
        restaurants: [
          {
            id: 1,
            name: 'Name-1',
            category: 'Category-1',
            address: 'Address-1',
          },
        ],
      };

      const { information, restaurants } = reducer(settingState, {});

      // eslint-disable-next-line guard-for-in, no-restricted-syntax
      for (const category in information) {
        expect(information[category]).toBe(settingState.information[category]);
      }

      restaurants.forEach((restaurant, index) => {
        expect(restaurant.id).toBe(settingState.restaurants[index].id);
        expect(restaurant.name).toBe(settingState.restaurants[index].name);
        expect(restaurant.category).toBe(settingState.restaurants[index].category);
        expect(restaurant.address).toBe(settingState.restaurants[index].address);
      });
    });
  });

  describe('setRestaurents', () => {
    it('changes restaurant array', () => {
      const { restaurants } = reducer({
        restaurants: [],
      }, setRestaurants(fixturesRestaurants));

      expect(restaurants).not.toHaveLength(0);
    });
  });

  describe('updateInformation', () => {
    it('changes name', () => {
      const { restaurant } = reducer({
        restaurant: {
          name: '',
        },
      }, updateRestaurant('name', 'New Name'));

      expect(restaurant.name).toBe('New Name');
    });

    it('changes classifiaction', () => {
      const { restaurant } = reducer({
        restaurant: {
          category: '',
        },
      }, updateRestaurant('category', 'New Category'));

      expect(restaurant.category).toBe('New Category');
    });

    it('changes address', () => {
      const { restaurant } = reducer({
        restaurant: {
          address: '',
        },
      }, updateRestaurant('address', 'New Address'));

      expect(restaurant.address).toBe('New Address');
    });
  });

  describe('addRestaurant', () => {
    function reduceAddRestaurant({
      name = '',
      category = '',
      address = '',
    } = {}) {
      return (reducer({
        restaurant: {
          name,
          category,
          address,
        },
        restaurants: [],
      }, addRestaurant()));
    }

    context('with full information', () => {
      it('appends a new restaurant into restaurants', () => {
        const { restaurants } = reduceAddRestaurant({
          name: 'New Name',
          category: 'New Category',
          address: 'New Address',
        });

        expect(restaurants).toHaveLength(1);
        expect(restaurants[0].name).toBe('New Name');
        expect(restaurants[0].category).toBe('New Category');
        expect(restaurants[0].address).toBe('New Address');
      });

      it('clears information', () => {
        const { restaurant } = reduceAddRestaurant({
          name: 'New Name',
          category: 'New Category',
          address: 'New Address',
        });

        expect(restaurant.name).toBe('');
        expect(restaurant.category).toBe('');
        expect(restaurant.address).toBe('');
      });
    });

    context('with empty information at least one', () => {
      it("doesn't work", () => {
        const { restaurants } = reduceAddRestaurant({
          name: 'New Name',
          category: '',
          address: 'New Address',
        });

        expect(restaurants).toHaveLength(0);
      });
    });
  });
});
