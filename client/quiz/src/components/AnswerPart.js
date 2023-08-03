

const AnswerPart = (props) =>{

    return (
        <div>
          <h3>Answer</h3>
          <p>{props.answer.answer}</p>
          <button onClick = {()=>{
            console.log(props.answer.correct)
            props.onAnswer(props.answer.correct)
          }}>choose this</button>
        </div>
    )

}

export default AnswerPart;