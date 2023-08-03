import { useState, useEffect } from "react";
import AnswerPart from "./AnswerPart";
const Answer = (props) => {
  const randomQuestion = props.randomQuestion

  const [answer, setAnswer] = useState(null)
  const [answerOrder, setAnswerOrder] = useState(null);
  const [answeredCorrectly, setAnswereredCorrectly] = useState(null);

  const handleAnswer = (bool) => {
    setAnswereredCorrectly(bool);
  }

  const randomizeAnswers = () => {
    const refArr = [0, 1, 2];

    const randomArr = [];
    while (refArr.length > 0) {
      randomArr.push(refArr.splice(Math.floor(Math.random() * refArr.length), 1)[0]);

    }
    return randomArr
  }
  useEffect(() => {
    setAnswerOrder(randomizeAnswers());
  }, [randomQuestion]);


  useEffect(() => {
    const questionId = randomQuestion

    if (questionId !== '') {
      fetchAnswer(questionId._id)
    }
  }, [randomQuestion])

  const fetchAnswer = (id) => {
    fetch(`/api/answer/getOne/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        return res.json()
      })
      .then((data) => {
        console.log(data);
        setAnswer(data)
      })
      .catch((error) => {
        console.error('Error fetching answer:', error);
      })

  }
  if (!answer) {
    <>loading</>
  }

  else if (answeredCorrectly === null) {
    return (
      <>
        <AnswerPart
          answer={answer[0].answers[answerOrder[0]]}
          onAnswer={handleAnswer} />
        <AnswerPart
          answer={answer[0].answers[answerOrder[1]]}
          onAnswer={handleAnswer} />
        <AnswerPart
          answer={answer[0].answers[answerOrder[2]]}
          onAnswer={handleAnswer} />
      </>
    )
  }

  else if (answeredCorrectly) {
    return (
      <>
        <div>congrats!</div>
        <button
          onClick={() => { setAnswereredCorrectly(null); props.onNewQuestion(randomQuestion._id) }}>give me another question</button>
      </>)

  }

  else {

    return (
      <>
        <div>sorry, wrong answer</div>
        <button
          onClick={() => { setAnswereredCorrectly(null);props.onNewQuestion(randomQuestion._id) }}
        >give me another question</button>
      </>)
  }

}

export default Answer;
