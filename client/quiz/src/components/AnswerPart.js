const AnswerPart = (props) =>{

    return (
        <div className="answer-card">
          <p>{props.answer.answer}</p>
          <button className="custom-button" onClick = {()=>{
            console.log(props.answer.correct)
            props.onAnswer(props.answer.correct)
          }}>choose this</button>
        </div>
    )

}

export default AnswerPart;