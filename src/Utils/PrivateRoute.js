import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from './LocalStorage';

const PrivateRoutes = () => {
    let token = getToken();
    return (
        token !== null && token !== "" ? <Outlet /> : <Navigate to="/" />
    );
};

export default PrivateRoutes;
