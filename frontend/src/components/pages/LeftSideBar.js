import React from 'react';
import { Link } from 'react-router-dom';

const LeftSideBar = () => {
	return (
		<div>
			<div className="btn-group" position="fixed">
				<button>
					<div className="material-icons">home</div>
					Home
				</button>
				<br />

				<Link
					type="button"
					to='/allTweets'
					style={{
						textDecoration: 'none',
						color: 'inherit',
						fontSize: 'larger',
					}}
				>
					<div className="material-icons">tag</div>
					Explore
					</Link>
				<br />
				<button>
					<div className="material-icons">notifications</div>
					Notifications
				</button>

				<br />
				<button>
					<div className="material-icons">message</div>
					Messages
				</button>

				<br />
				<button>
					<div className="material-icons">bookmarks</div>
					Bookmarks
				</button>

				<br />
				<button>
					<div className="material-icons">list</div>
					Lists
				</button>

				<br />
				<button>
					<div className="material-icons">person</div>
					Profile
				</button>

				<br />
				<button>
					<div className="material-icons">more</div>
					More
				</button>
			</div>

			<br />
		</div>
	);
};

export default LeftSideBar;
