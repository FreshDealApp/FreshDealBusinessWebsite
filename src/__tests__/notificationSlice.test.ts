import notificationReducer, { setSubscribed, setError, setPermission } from '../redux/slices/NotificationSlice.ts';

const initialState = notificationReducer(undefined, { type: 'init' });

test('initial state subscribed false', () => {
  expect(initialState.isSubscribed).toBe(false);
});

test('setSubscribed true', () => {
  const state = notificationReducer(initialState, setSubscribed(true));
  expect(state.isSubscribed).toBe(true);
});

test('setError works', () => {
  const state = notificationReducer(initialState, setError('oops'));
  expect(state.error).toBe('oops');
});

test('setPermission stores value', () => {
  const state = notificationReducer(initialState, setPermission('granted'));
  expect(state.permission).toBe('granted');
});
