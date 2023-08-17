const AnswerPart = ({ answer, onAnswer, isAnswered }) => {
  
  function divStyle() {
    const trueColor = {
      backgroundColor: "green"
    };

    const falseColor = {
      backgroundColor: "red"
    };

    if (!isAnswered.answered) {
      return {backgroundColor: "white"};
    } else {
      if (answer.correct) {
        return trueColor;
      } else if (!isAnswered.correct && !answer.correct)
      return falseColor;
    }
  }

  return (
    <div className="answer-card" style={divStyle()}
      onClick={() => {
        !isAnswered.answered && onAnswer(answer.correct);
      }}
    >
      {answer.answer}
    </div>
  )
}

export default AnswerPart;