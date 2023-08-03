const Question = ({randomQuestion})=>{

  return(
    <div key={randomQuestion._id}>
    <h2>{randomQuestion.question}</h2>
    <p>{randomQuestion.description}</p>
  </div>
  )
  
}

export default Question;