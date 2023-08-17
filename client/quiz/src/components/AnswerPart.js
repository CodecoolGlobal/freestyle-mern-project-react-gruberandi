const AnswerPart = ({ answer, onAnswer, isAnswered }) => {

  return (
    <div className="answer-card"
      onClick={() => {
        !isAnswered.answered && onAnswer(answer.correct);
      }}
    >
      {answer.answer}
    </div>
  )

}

export default AnswerPart;