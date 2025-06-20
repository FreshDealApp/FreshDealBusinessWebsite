import userReducer, { setEmail, setName, setRole, logout, setPhoneNumber } from '../../../../Downloads/FreshDealBusinessWebsite-main/FreshDealBusinessWebsite-main/src/redux/slices/userSlice.ts';

const initialState = userReducer(undefined, { type: 'init' });

test('should return initial state', () => {
  expect(initialState.email).toBe('');
  expect(initialState.role).toBe('');
});

test('setEmail updates email', () => {
  const state = userReducer(initialState, setEmail('test@example.com'));
  expect(state.email).toBe('test@example.com');
});

test('setName updates name', () => {
  const state = userReducer(initialState, setName('John Doe'));
  expect(state.name_surname).toBe('John Doe');
});

test('setRole updates role', () => {
  const state = userReducer(initialState, setRole('owner'));
  expect(state.role).toBe('owner');
});

test('logout clears token', () => {
  const loggedIn = { ...initialState, token: 'abc' };
  const state = userReducer(loggedIn, logout());
  expect(state.token).toBeNull();
});

test('setPhoneNumber stores digits only', () => {
  const state = userReducer(initialState, setPhoneNumber('123-456'));
  expect(state.phoneNumber).toBe('123456');
});

test('restoreUserDataFromStorage loads from localStorage', () => {
  localStorage.setItem('userData', JSON.stringify({ email: 'a@b.com', role: 'owner' }));
  const state = userReducer(initialState, { type: 'user/restoreUserDataFromStorage' });
  expect(state.email).toBe('a@b.com');
  expect(state.role).toBe('owner');
});
