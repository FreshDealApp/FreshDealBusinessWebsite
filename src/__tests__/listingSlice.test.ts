import listingReducer, { clearListingError, clearSearchResults } from '../../../../Downloads/FreshDealBusinessWebsite-main/FreshDealBusinessWebsite-main/src/redux/slices/listingSlice.ts';
import { addListing, searchListings } from '../../../../Downloads/FreshDealBusinessWebsite-main/FreshDealBusinessWebsite-main/src/redux/thunks/listingThunks.ts';

const initialState = listingReducer(undefined, { type: 'init' });

test('initial state empty', () => {
  expect(initialState.listings).toEqual([]);
});

test('addListing fulfilled pushes listing', () => {
  const action = { type: addListing.fulfilled.type, payload: { listing: { id: 1 } } };
  const state = listingReducer(initialState, action);
  expect(state.userListings.length).toBe(1);
});

test('clearListingError resets error', () => {
  const start = { ...initialState, error: 'err' };
  const state = listingReducer(start, clearListingError());
  expect(state.error).toBeNull();
});

test('searchListings fulfilled stores results', () => {
  const action = { type: searchListings.fulfilled.type, payload: { results: [{ id: 2 }] } };
  const state = listingReducer(initialState, action);
  expect(state.searchResults.length).toBe(1);
});

test('clearSearchResults empties results', () => {
  const start = { ...initialState, searchResults: [{ id: 2 }] };
  const state = listingReducer(start, clearSearchResults());
  expect(state.searchResults).toEqual([]);
});

test('deleteListing fulfilled removes listing', () => {
  const start = {
    ...initialState,
    listings: [{ id: 1 } as any],
    userListings: [{ id: 1 } as any]
  };
  const action = {
    type: 'listing/deleteListing/fulfilled',
    payload: { listingId: 1 }
  };
  const state = listingReducer(start, action);
  expect(state.listings).toEqual([]);
  expect(state.userListings).toEqual([]);
});
