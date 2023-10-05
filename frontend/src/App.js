import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/pages/Home';
import Login from './components/pages/Login';
import Main from './components/pages/Main';

import Signup from './components/pages/Signup';
import Navbar from './components/Navbar/Navbar';
import React from 'react';
import EditProfile from './components/pages/editProfile.js';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './components/utils/PrivateRoute';
import AllTweets from './components/pages/AllTweets.js';

function App() {
	const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('username'));

	const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("spinner");
  if (spinner) {
    setTimeout(() => {
      spinner.style.display = "none";
      setLoading(false);
    }, 2000);
  }

	return (
		!loading && (
		<div className="App">
			<BrowserRouter>
				{isLoggedIn && <Navbar isLoggedIn={isLoggedIn} />}
				<div className="pages">
					<Routes>
						<Route path="/allTweets" element={<AllTweets />} />

						<Route
							path="/signup"
							element={
								<Signup isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
							}
						/>
						<Route
							path="/login"
							element={
								<Login setLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />
							}
						/>
						<Route path="/" element={<Main />} />

						<Route element={<PrivateRoutes />}>
							<Route path="/home/:username" element={<Homepage />} />
						</Route>

						<Route path="/" element={<Main />} />

						<Route path="/editProfile" element={<EditProfile />} />
					</Routes>
				</div>
			</BrowserRouter>
			<ToastContainer />
		</div>
	)
	)
}

export default App;
