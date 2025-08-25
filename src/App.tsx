import './App.css';
import { PATH } from './common/constants';
import MainLayout from './components/Layouts/MainLayout';
import StaffList from './pages/NhanVien/List';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StaffUpsert from './pages/NhanVien/Upsert';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'sonner';
import StaffDetail from './pages/NhanVien/Detail';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: PATH.staff_list,
                element: <StaffList />,
            },
            {
                path: PATH.staff_create,
                element: <StaffUpsert />,
            },
            {
                path: PATH.staff_update + '/:id',
                element: <StaffUpsert />,
            },
            {
                path: PATH.staff_detail + '/:id',
                element: <StaffDetail />,
            },
        ],
    },
]);

function App() {
    return (
        <Provider store={store}>
            {/* Thông báo */}
            <Toaster position="top-right" richColors />
            <RouterProvider router={routes} />
        </Provider>
    );
}

export default App;
