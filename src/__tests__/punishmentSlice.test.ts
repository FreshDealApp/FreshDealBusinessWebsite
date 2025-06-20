import punishmentReducer, { clearPunishmentData } from '../redux/slices/punishmentSlice.ts';

const initialState = punishmentReducer(undefined, { type: 'init' });

test('initial history empty', () => {
  expect(initialState.history).toEqual({});
});

test('clearPunishmentData resets fields', () => {
  const start = { ...initialState, history: { 1: [] }, error: 'err' } as any;
  const state = punishmentReducer(start, clearPunishmentData());
  expect(state.history).toEqual({});
  expect(state.error).toBeNull();
});

test('fetchPunishmentHistory pending sets loading', () => {
  const action = { type: 'punishment/fetchHistory/pending' };
  const state = punishmentReducer(initialState, action);
  expect(state.loading).toBe(true);
});

test('fetchPunishmentHistory rejected stores error', () => {
  const action = { type: 'punishment/fetchHistory/rejected', payload: 'err' };
  const state = punishmentReducer(initialState, action);
  expect(state.error).toBe('err');
  expect(state.loading).toBe(false);
});

test('punishRestaurant pending sets loading', () => {
  const action = { type: 'punishment/punishRestaurant/pending' };
  const state = punishmentReducer(initialState, action);
  expect(state.loading).toBe(true);
});
