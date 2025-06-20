import ticketReducer, { clearTickets } from '../redux/slices/ticketSlice.ts';

const initialState = ticketReducer(undefined, { type: 'init' });

test('initial tickets empty', () => {
  expect(initialState.tickets).toEqual([]);
});

test('clearTickets resets state', () => {
  const start = { ...initialState, tickets: [{ id: 1 }], error: 'err' } as any;
  const state = ticketReducer(start, clearTickets());
  expect(state.tickets).toEqual([]);
  expect(state.error).toBeNull();
});

test('fetchAllTickets pending sets loading', () => {
  const action = { type: 'tickets/fetchAll/pending' };
  const state = ticketReducer(initialState, action);
  expect(state.loading).toBe(true);
});

test('disregardTicket fulfilled updates ticket status', () => {
  const start = {
    ...initialState,
    tickets: [{ id: 1, status: 'OPEN' }],
    restaurantTickets: { '1': [{ id: 1, status: 'OPEN' }] }
  } as any;
  const action = {
    type: 'tickets/disregardTicket/fulfilled',
    payload: { success: true, ticketId: 1 }
  };
  const state = ticketReducer(start, action);
  expect(state.tickets[0].status).toBe('REJECTED');
  expect(state.restaurantTickets['1'][0].status).toBe('REJECTED');
});
