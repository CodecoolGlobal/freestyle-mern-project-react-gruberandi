
const Comment = (props) => {
    if (props.commentsShow) {
        if (props.question.comments.length<1){

            return (
                <>
                <div>There are no comments added yet.</div>
                </>
            )
        } else {
            return (

                <div>
                    {props.question.comments.map((comment) => {
                        return  <div>{comment.commentText}</div>
                       
                    })}

                </div>
            )
        }


    }

}
export default Comment