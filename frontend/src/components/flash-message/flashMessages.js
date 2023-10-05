import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} varient="filled" {...props} />;
}
const FlashMessages = ({ message }) => {
	const [open, setOpen] = React.useState(true);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<div className="">
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success">
					This is a success message!
				</Alert>
			</Snackbar>
		</div>
	);
};

export default FlashMessages;
