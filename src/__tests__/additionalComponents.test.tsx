import { renderWithProviders } from '../test-utils.tsx';
import RestaurantSidebar from '../feature/Dashboard/components/RestaurantSidebar.tsx';
import NotificationModal from '../feature/Header/components/NotificationModal.tsx';
import HeroSection from '../feature/Landing/components/Hero/HeroSection.tsx';
import { AuthGuard } from '../components/RouteGuards.tsx';
import Landing from '../feature/Landing/screens/Landing.tsx';
import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import * as router from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual: any = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: vi.fn() };
});

const sampleRestaurant = { id: '1', restaurantName: 'R1', category: 'Test' } as any;

test('NotificationModal displays when open', () => {
  renderWithProviders(<NotificationModal isOpen={true} onClose={() => {}} />);
  expect(screen.getByText(/Notification Status/)).toBeInTheDocument();
});

test('RestaurantSidebar shows loading text', () => {
  renderWithProviders(<RestaurantSidebar restaurants={[]} isLoading={true} />);
  expect(screen.getByText(/Loading restaurants/)).toBeInTheDocument();
});

test('RestaurantSidebar collapses on button click', () => {
  renderWithProviders(
    <RestaurantSidebar restaurants={[sampleRestaurant]} isLoading={false} />
  );
  fireEvent.click(screen.getByRole('button', { name: /Collapse sidebar/i }));
  expect(screen.queryByText(/My Restaurants/)).not.toBeInTheDocument();
});

test('HeroSection navigate called on click', () => {
  const navigate = vi.fn();
  (router.useNavigate as unknown as vi.Mock).mockReturnValue(navigate);
  renderWithProviders(<HeroSection />);
  fireEvent.click(screen.getByText(/Partner With Us/));
  expect(navigate).toHaveBeenCalledWith('/register');
});

test('AuthGuard renders children for allowed role', () => {
  renderWithProviders(
    <AuthGuard requiredRole="owner"><div>ok</div></AuthGuard>,
    { preloadedState: { user: { token: 't', role: 'owner' } as any } }
  );
  expect(screen.getByText('ok')).toBeInTheDocument();
});

test('Landing with token redirects to dashboard', () => {
  const navigate = vi.fn();
  (router.useNavigate as unknown as vi.Mock).mockReturnValue(navigate);
  renderWithProviders(<Landing />, { preloadedState: { user: { token: 't', role: 'owner' } as any } });
  expect(navigate).toHaveBeenCalledWith('/dashboard', { replace: true });
});
