import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import AppLayout from './ui/AppLayout';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import Users from './pages/Users';
import Settings from './pages/Settings';
import SingleBooking from './pages/SingleBooking';
import CheckIn from './pages/CheckIn';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Dashboard /> },
          {
            path: 'bookings',
            element: <Bookings />,
          },
          {
            path: 'bookings/:bookingId',
            element: <SingleBooking />,
          },
          {
            path: 'checkin/:bookingId',
            element: <CheckIn />,
          },
          {
            path: 'cabins',
            element: <Cabins />,
          },
          {
            path: 'users',
            element: <Users />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
        <Toaster
          position='top-center'
          reverseOrder={false}
          gutter={12}
          containerClassName=''
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              fontSize: '0.9rem',
              maxWidth: '500px',
              padding: '.5rem 1rem',
            },

            // Default options for specific types
            success: {
              duration: 3000,
              style: {
                background: 'var(--color-grey-0)',
                color: 'var(--color-green-700)',
              },
            },
            error: {
              duration: 5000,
              style: {
                background: 'var(--color-grey-0)',
                color: 'var(--color-red-700)',
              },
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
