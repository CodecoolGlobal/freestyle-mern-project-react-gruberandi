import { useState, useEffect } from "react";
const Answer = (props) => {
  const randomQuestion = props.randomQuestion

  const [answer, setAnswer] = useState(null)
  const [answerOrder, setAnswerOrder] = useState(null);

  const randomizeAnswers = () => {
    const refArr = [0, 1, 2];

    const randomArr = [];
    while (refArr.length > 0) {
      randomArr.push(refArr.splice(Math.floor(Math.random() * refArr.length), 1)[0]);

    }
    return randomArr
  }
useEffect(()=>{
  setAnswerOrder(randomizeAnswers());
},[randomQuestion]);


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
  return (
    <>
    <div>
      {answer ? (
        <div>
          <h3>Answer</h3>
          <p>{answer[0].answers[0].answer}</p>
        </div>
      ) : (
        <p>No answer available.</p>
      )}
    </div>
    <div>
    {answer ? (
      <div>
        <h3>Answer</h3>
        <p>{answer[0].answers[1].answer}</p>
      </div>
    ) : (
      <p>No answer available.</p>
    )}
  </div>
  <div>
  {answer ? (
    <div>
      <h3>Answer</h3>
      <p>{answer[0].answers[2].answer}</p>
    </div>
  ) : (
    <p>No answer available.</p>
  )}
</div>
</>
  );
}

export default Answer;
