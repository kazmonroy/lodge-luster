import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from './ui/AppLayout';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import Users from './pages/Users';
import Settings from './pages/Settings';

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
      </QueryClientProvider>
    </>
  );
}

export default App;
