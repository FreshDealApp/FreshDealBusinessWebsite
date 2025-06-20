import purchaseReducer from '../redux/slices/purchaseSlice.ts';
import { createPurchaseOrder } from '../redux/thunks/purchaseThunks.ts';

const initialState = purchaseReducer(undefined, { type: 'init' });

test('initial state items empty', () => {
  expect(initialState.items).toEqual([]);
});

test('createPurchaseOrder fulfilled adds purchase', () => {
  const action = { type: createPurchaseOrder.fulfilled.type, payload: { purchases: [{ purchase_id: 1 }] } };
  const state = purchaseReducer(initialState, action);
  expect(state.items.length).toBe(1);
});

test('clearError sets error null', () => {
  const start = { ...initialState, error: 'boom' };
  const action = { type: 'purchases/clearError' };
  const state = purchaseReducer(start, action);
  expect(state.error).toBeNull();
});

test('addCompletionImage updates selected order', () => {
  const start = { ...initialState, selectedOrder: { purchase_id: 2 } } as any;
  const action = { type: 'purchases/addImage/fulfilled', payload: { purchase: { id: 2, completion_image_url: 'x', status: 'COMPLETED' } } };
  const state = purchaseReducer(start, action);
  expect(state.selectedOrder?.completion_image_url).toBe('x');
});

test('handlePurchaseResponse updates purchases', () => {
  const start = {
    ...initialState,
    items: [{ purchase_id: 1, status: 'PENDING' }],
    activeOrders: [{ purchase_id: 1, status: 'PENDING' }]
  } as any;
  const action = {
    type: 'purchases/respond/fulfilled',
    payload: { purchase: { id: 1, purchase_id: 1, status: 'ACCEPTED' } }
  };
  const state = purchaseReducer(start, action);
  expect(state.items[0].status).toBe('ACCEPTED');
  expect(state.activeOrders[0].status).toBe('ACCEPTED');
});

test('rejectPurchaseOrder removes from activeOrders', () => {
  const purchase = { purchase_id: 2, status: 'PENDING' };
  const start = { ...initialState, items: [purchase], activeOrders: [purchase], previousOrders: [] } as any;
  const action = {
    type: 'purchases/reject/fulfilled',
    payload: { purchase: { id: 2, purchase_id: 2, status: 'REJECTED' } }
  };
  const state = purchaseReducer(start, action);
  expect(state.items[0].status).toBe('REJECTED');
  expect(state.activeOrders).toEqual([]);
  expect(state.previousOrders[0].status).toBe('REJECTED');
});

test('clearSelectedOrder sets selectedOrder null', () => {
  const start = { ...initialState, selectedOrder: { purchase_id: 3 } } as any;
  const action = { type: 'purchases/clearSelectedOrder' };
  const state = purchaseReducer(start, action);
  expect(state.selectedOrder).toBeNull();
});
