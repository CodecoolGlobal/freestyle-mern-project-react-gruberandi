import { useState, useEffect } from "react";
import './Question.css';
import Comment from "./Comment";
import AnswerPart from "./AnswerPart";

const Answers = ({ randomQuestion, onNewQuestion }) => {

  const [comment, setComment] = useState('');
  const [answer, setAnswer] = useState(null)
  const [randomAnswers, setRandomAnswers] = useState(null);
  const [answeredCorrectly, setAnswereredCorrectly] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const sendComment = (id, comment) => {
    const newQuestion = { ...randomQuestion };
    newQuestion.comments.push({
      commentText: comment,
      dateAdded: new Date(Date.now())
    });

    fetch(`/api/question/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newQuestion) })
  }

  const handleAnswer = (bool) => {
    setAnswereredCorrectly(bool);
  }

  const randomizeAnswers = (answersArray) => {
    const refArr = [...answersArray];

    const randomArr = [];
    while (refArr.length > 0) {
      randomArr.push(refArr.splice(Math.floor(Math.random() * refArr.length), 1)[0]);

    }
    return randomArr
  }

  useEffect(() => {
    const task = async () => {
      if (randomQuestion !== '') {
        const randAnswer = await fetchAnswer(randomQuestion._id)
        setAnswer(randAnswer);
        setRandomAnswers(randomizeAnswers(randAnswer.answers));
      }
    }
    task();
  }, [randomQuestion]);


  useEffect(() => {

  }, [randomQuestion])

  const fetchAnswer = async (id) => {
    const response = await fetch(`/api/answer/${id}`);
    return response.json();
  }

  if (!answer) {
    <>loading</>
  }

  else if (answeredCorrectly === null) {
    return (
      <div className="answer-container">
        {randomAnswers.map((answer) => {
          return (
            <AnswerPart
              key={answer._id}
              answer={answer}
              onAnswer={handleAnswer} />
          )
        })}

      </div>
    )
  }

  else if (answeredCorrectly) {
    return (
      <>
        <div>congrats!</div>
        <button
          onClick={() => { setAnswereredCorrectly(null); onNewQuestion(randomQuestion._id); setShowComments(false); }}>give me another question</button>
        <button onClick={() => { setShowComments(!showComments) }}>Show Comments</button>
        <div>you can add a comment to this question:</div>
        <input
          onChange={(e) => { setComment(e.target.value) }} value={comment}></input>
        <button

          onClick={() => { console.log(randomQuestion._id); sendComment(randomQuestion._id, comment) }}
        >Submit comment</button>
        <Comment question={randomQuestion} showComments={showComments} />
      </>)

  }

  else {

    return (
      <>
        <div>sorry, wrong answer</div>
        <button
          onClick={() => { setAnswereredCorrectly(null); onNewQuestion(randomQuestion._id); setShowComments(false); }}
        >give me another question</button>
        <div>
          <div>you can add a comment to this question:</div>
          <input
            onChange={(e) => { setComment(e.target.value) }} value={comment}></input>
          <button

            onClick={() => { console.log(randomQuestion._id); sendComment(randomQuestion._id, comment) }}
          >Submit comment</button>
          <button onClick={() => { setShowComments(!showComments) }}>Show Comments</button>
          <Comment question={randomQuestion} showComments={showComments} />
        </div>

      </>)
  }

}

export default Answers;
