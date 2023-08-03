
const Comment = (props) => {
    if (props.commentsShow) {
        if (props.randomQuestion.comments.length<1){

            return (
                <>
                <div>There are no comments added yet.</div>
                </>
            )
        } else {
            return (

                <div>
                    {props.randomQuestion.comments.map((comment) => {
                        return  <div>{comment.commentText}</div>
                       
                    })}

                </div>
            )
        }


    }

}
export default Comment