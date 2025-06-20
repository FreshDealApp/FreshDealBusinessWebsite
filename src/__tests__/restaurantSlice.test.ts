import restaurantReducer from '../redux/slices/restaurantSlice.ts';
import { addRestaurant, removeRestaurant, updateRestaurant } from '../redux/thunks/restaurantThunk.ts';

const initialState = restaurantReducer(undefined, { type: 'init' });

test('initial state has empty restaurants', () => {
  expect(initialState.ownedRestaurants).toEqual([]);
});

test('addRestaurant fulfilled adds restaurant', () => {
  const action = { type: addRestaurant.fulfilled.type, payload: { restaurant: { id: '1' } } };
  const state = restaurantReducer(initialState, action);
  expect(state.ownedRestaurants.length).toBe(1);
});

test('removeRestaurant fulfilled removes restaurant', () => {
  const start = { ...initialState, ownedRestaurants: [{ id: '1' }] };
  const action = { type: removeRestaurant.fulfilled.type, payload: { restaurantId: '1', data: {} } };
  const state = restaurantReducer(start, action);
  expect(state.ownedRestaurants).toEqual([]);
});

test('updateRestaurant updates restaurant', () => {
  const start = { ...initialState, ownedRestaurants: [{ id: '1', restaurantName: 'A' }] };
  const action = { type: updateRestaurant.fulfilled.type, payload: { restaurant: { id: '1', restaurantName: 'B' } } };
  const state = restaurantReducer(start, action);
  expect(state.ownedRestaurants[0].restaurantName).toBe('B');
});

test('addRestaurant pending sets status', () => {
  const action = { type: addRestaurant.pending.type };
  const state = restaurantReducer(initialState, action);
  expect(state.status).toBe('loading');
});
