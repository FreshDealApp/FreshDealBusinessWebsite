import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { setupStore, RootState } from './redux/store';

interface Options {
  route?: string;
  preloadedState?: Partial<RootState>;
}

export function renderWithProviders(ui: ReactElement, options: Options = {}) {
  const { route = '/', preloadedState } = options;
  const testStore = setupStore(preloadedState);
  return render(
    <Provider store={testStore}>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </Provider>
  );
}
