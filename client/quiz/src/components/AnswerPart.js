const AnswerPart = (props) =>{

    return (
        <div className="answer-card">
          <p>{props.answer.answer}</p>
          <button onClick = {()=>{
            console.log(props.answer.correct)
            props.onAnswer(props.answer.correct)
          }}>choose this</button>
        </div>
    )

}

export default AnswerPart;