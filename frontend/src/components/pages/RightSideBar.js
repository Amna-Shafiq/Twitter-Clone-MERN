import React from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const RightSideBar = () => {
	return (
		<div>
			<h2>Trends for you</h2>
			<button style={{ width: '100%', marginBottom: 15 }}>
				<p>
					<h6 style={{ color: 'DimGray', float: 'left' }}>
						Trending in Pakistan
					</h6>
				</p>
				<p>
					<h5 style={{ float: 'left', fontSize: 16 }}>#FreePalestine</h5>
					<MoreHorizIcon style={{ float: 'right' }} />
					<br />
				</p>

				<h6 style={{ color: 'DimGray', float: 'left' }}>24.1k Tweets</h6>
			</button>

			<button style={{ width: '100%', marginBottom: 15 }}>
				<p>
					<h6 style={{ color: 'DimGray', float: 'left' }}>
						Trending in Pakistan
					</h6>
				</p>
				<p>
					<h5 style={{ float: 'left', margin: 0, fontSize: 16 }}>
						#NaseemShah
					</h5>
					<MoreHorizIcon style={{ float: 'right' }} />
					<br />
				</p>

				<h6 style={{ color: 'DimGray', float: 'left' }}>24.1k Tweets</h6>
			</button>

			<button style={{ width: '100%', marginBottom: 15 }}>
				<p>
					<h6 style={{ color: 'DimGray', float: 'left' }}>
						Trending in Pakistan
					</h6>
				</p>
				<p>
					<h5 style={{ float: 'left', margin: 0, fontSize: 16 }}>#Misbah</h5>
					<MoreHorizIcon style={{ float: 'right' }} />
					<br />
				</p>

				<h6 style={{ color: 'DimGray', float: 'left' }}>24.1k Tweets</h6>
			</button>
		</div>
	);
};

export default RightSideBar;
