import '../App.css';

const Comment = ({ question, showComments, toggleComments }) => {
	if (showComments) {
		return (
			<div className="modal">
				<div onClick={toggleComments} className="overlay"></div>
				<div className="modal-content">
					<h2>Comments</h2>
					{question.comments.length > 0 ? (
						question.comments.map((comment) => (
							<div key={comment._id}>{comment.commentText}</div>
						))
					) : (
						<div>No comments yet.</div>
					)}
					<button className="close-modal" onClick={toggleComments}>
						CLOSE
					</button>
				</div>
			</div>
		)
	}

}
export default Comment