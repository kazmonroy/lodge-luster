import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
