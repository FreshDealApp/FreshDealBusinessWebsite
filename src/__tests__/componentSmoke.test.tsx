import { renderWithProviders } from '../test-utils.tsx';
import AppRoutes from '../components/AppRoutes.tsx';
import AuthMiddleware from '../components/AuthMiddleware.tsx';
import Header from '../feature/Header/Header.tsx';
import NotificationModal from '../feature/Header/components/NotificationModal.tsx';
import AccountSettingsModal from '../feature/AccountSettings/AccountSettingsModal.tsx';
import Landing from '../feature/Landing/screens/Landing.tsx';
import Login from '../feature/Login/Login.tsx';
import Register from '../feature/Register/Register.tsx';
import Dashboard from '../feature/Dashboard/Dashboard.tsx';
import PartnershipPage from '../feature/Partnership/screens/partnershipPage.tsx';
import RestaurantDetails from '../feature/RestaurantDetails/screens/RestaurantDetails.tsx';
import SupportDashboard from '../feature/Tickets/screens/SupportDashboard.tsx';
import RestaurantSupportPage from '../feature/Tickets/screens/RestaurantSupport.tsx';
import PunishRestaurantPage from '../feature/Tickets/screens/PunishRestaurant.tsx';
import * as test from "node:test";

test('AppRoutes renders', () => {
  renderWithProviders(<AppRoutes />);
});

test('AuthMiddleware renders children', () => {
  renderWithProviders(<AuthMiddleware><div>child</div></AuthMiddleware>);
});

test('Header renders', () => {
  renderWithProviders(<Header />);
});

test('NotificationModal renders closed', () => {
  renderWithProviders(<NotificationModal isOpen={false} onClose={() => {}} />);
});

test('AccountSettingsModal renders closed', () => {
  renderWithProviders(<AccountSettingsModal isOpen={false} onClose={() => {}} />);
});

test('Landing renders', () => {
  renderWithProviders(<Landing />);
});

test('Login renders', () => {
  renderWithProviders(<Login />);
});

test('Register renders', () => {
  renderWithProviders(<Register />);
});

test('Dashboard renders', () => {
  renderWithProviders(<Dashboard />);
});

test('PartnershipPage renders', () => {
  renderWithProviders(<PartnershipPage />);
});

test('RestaurantDetails renders with route', () => {
  renderWithProviders(<RestaurantDetails />, '/dashboard/1/orders');
});

test('SupportDashboard renders', () => {
  renderWithProviders(<SupportDashboard />);
});

test('RestaurantSupportPage renders with route', () => {
  renderWithProviders(<RestaurantSupportPage />, '/restaurant-support/1');
});

test('PunishRestaurantPage renders with route', () => {
  renderWithProviders(<PunishRestaurantPage />, '/punish-restaurant/1');
});
