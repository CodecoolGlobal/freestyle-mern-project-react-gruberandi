
const Comment = ({ question, showComments }) => {
    if (showComments) {
        if (question.comments.length<1){

            return (
                <>
                <div>There are no comments added yet.</div>
                </>
            )
        } else {
            return (

                <div>
                    {question.comments.map((comment) => {
                        return  <div>{comment.commentText}</div>
                       
                    })}

                </div>
            )
        }


    }

}
export default Comment