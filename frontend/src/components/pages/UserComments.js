import React, { useState } from 'react';
import baseApi from '../../api/baseApi';
import { toast } from 'react-toastify';
const UserComments = ({ tweet, refetch, setRefetch }) => {
	const [commentable, setCommentable] = useState(false);

	const Comment = (text, tweetID) => {
		baseApi
			.post('/tweets/comment', {
				content: text,
				tweetID: tweetID,
			})
			.then(() => {
				toast.success('comment created successfully');
				setRefetch(!refetch);
			})
			.catch((error) => {
				console.log(error);
			});
		setCommentable(false);
	};
	const deleteComment = (tweetID, commentID) => {
		baseApi.delete(`/tweets/comment/${tweetID}/${commentID}`).then(() => {
			toast.success('Comment deleted successfully');
			setRefetch(!refetch);
			setCommentable(false);
		});
	};

	return (
		<div>
			{commentable ? (
				<div>
					<h6>
						{tweet.comment.map((comment) => (
							<div key={comment._id}>
								<h6 className="fw-bold text-primary mb-1">
									{tweet.author.username}
								</h6>
								<p className="text-muted small mb-0">{comment.createdAt}</p>
								<p className="mt-3 mb-4 pb-2">{comment.content}</p>

								<i
									style={{
										outline: 'none',
										padding: '0',
										border: '0px',
										background: 'none',
										cursor: 'pointer',
									}}
									className="material-icons"
									 onClick={() => deleteComment(tweet._id, comment._id)}
								>
									delete
								</i>
							</div>
						))}
					</h6>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							Comment(e.target[0].value, tweet._id);
						}}
					>
						<input type="text" placeholder="write a comment" />
					</form>
				</div>
			) : (
				<i
					className="material-icons"
					onClick={() => setCommentable(true)}
					style={{
						cursor: 'pointer',
						float: 'left',
					}}
				>
					comment
				</i>
			)}
		</div>
	);
};

export default UserComments;
