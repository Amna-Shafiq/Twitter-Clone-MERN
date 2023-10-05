import React from 'react';

import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
	let auth;
	if (localStorage.getItem('accessToken') === null) {
		auth = false;
	} else {
		auth = true;
	}

	return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
