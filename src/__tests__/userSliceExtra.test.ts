import userReducer, { setPassword, setPasswordLogin, setSelectedCode, setVerificationCode, setStep, setLoginType, setToken, clearUserSession } from '../redux/slices/userSlice';
import { loginUser, updateEmail } from '../redux/thunks/userThunks';

const initialState = userReducer(undefined, { type: 'init' });

afterEach(() => {
  localStorage.clear();
});

test('setPassword updates password', () => {
  const state = userReducer(initialState, setPassword('secret'));
  expect(state.password).toBe('secret');
});

test('setPasswordLogin sets flag', () => {
  const state = userReducer(initialState, setPasswordLogin(true));
  expect(state.passwordLogin).toBe(true);
});

test('setSelectedCode updates code', () => {
  const state = userReducer(initialState, setSelectedCode('+1'));
  expect(state.selectedCode).toBe('+1');
});

test('setVerificationCode updates field', () => {
  const state = userReducer(initialState, setVerificationCode('1234'));
  expect(state.verificationCode).toBe('1234');
});

test('setStep updates step', () => {
  const state = userReducer(initialState, setStep('verify_code'));
  expect(state.step).toBe('verify_code');
});

test('setLoginType updates login_type', () => {
  const state = userReducer(initialState, setLoginType('phone_number'));
  expect(state.login_type).toBe('phone_number');
});

test('setToken stores token', () => {
  const state = userReducer(initialState, setToken('tok'));
  expect(state.token).toBe('tok');
});

test('clearUserSession resets token and role', () => {
  const start = { ...initialState, token: 't', role: 'owner', loading: true, error: 'e' } as any;
  const state = userReducer(start, clearUserSession());
  expect(state.token).toBeNull();
  expect(state.role).toBe('');
  expect(state.loading).toBe(false);
  expect(state.error).toBeNull();
});

test('loginUser.pending sets loading', () => {
  const action = { type: loginUser.pending.type };
  const state = userReducer(initialState, action);
  expect(state.loading).toBe(true);
});

test('loginUser.fulfilled saves token', () => {
  const action = { type: loginUser.fulfilled.type, payload: { token: 'abc' } };
  const state = userReducer(initialState, action);
  expect(state.token).toBe('abc');
  expect(state.loading).toBe(false);
});

test('loginUser.rejected stores error', () => {
  const action = { type: loginUser.rejected.type, payload: 'bad' };
  const state = userReducer(initialState, action);
  expect(state.error).toBe('bad');
  expect(state.loading).toBe(false);
});

test('updateEmail.pending sets loading', () => {
  const action = { type: updateEmail.pending.type };
  const state = userReducer(initialState, action);
  expect(state.loading).toBe(true);
});
