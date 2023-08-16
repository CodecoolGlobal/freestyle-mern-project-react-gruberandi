
const Comment = ({ question, showComments }) => {
	if (showComments) {
		return (
			<div className="modal">
				<div onClick={showComments} className="overlay"></div>
				<div className="modal-content">
					<h2>Hello Modal</h2>
					<p>
						{question.question}
					</p>
					<button className="close-modal" onClick={showComments}>
						CLOSE
					</button>
				</div>
			</div>
		)
		// 			return (
		// 				<>
		// 					<div>There are no comments added yet.</div>
		// 				</>
		// 			)
		// 		} else {
		// 			return (

		// 				<div>
		// 					{question.comments.map((comment) => {
		// 						return <div>{comment.commentText}</div>

		// 					})}

		// 				</div>
		// 			)



	}

}
export default Comment