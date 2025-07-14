import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Loading from '../components/Loading';

const PrivateRoute = ({children}) => {

    const location = useLocation();
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading></Loading>;
    };

    if (user) {
        return children;
    }
    
    return (<Navigate state={location.pathname} to={'/auth/login'}></Navigate>);
};

export default PrivateRoute;