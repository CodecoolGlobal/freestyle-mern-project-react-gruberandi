import { useState, useEffect } from "react";
import './Question.css';
import Comment from "./Comment";
import AnswerPart from "./AnswerPart";

const Answers = ({ randomQuestion, onNewQuestion }) => {

  const [randomAnswers, setRandomAnswers] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [answeredCorrectly, setAnswereredCorrectly] = useState(null);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

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

  const fetchAnswer = async (id) => {
    const response = await fetch(`/api/answer/${id}`);
    return response.json();
  }

  const randomizeAnswers = (answersArray) => {
    const refArr = [...answersArray];

    const randomArr = [];
    while (refArr.length > 0) {
      randomArr.push(refArr.splice(Math.floor(Math.random() * refArr.length), 1)[0]);

    }
    return randomArr
  }

  const handleAnswer = (bool) => {
    setAnswereredCorrectly(bool);
  }

  const sendComment = (id, comment) => {
    const newQuestion = { ...randomQuestion };
    newQuestion.comments.push({
      commentText: comment,
      dateAdded: new Date(Date.now())
    });

    fetch(`/api/question/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newQuestion) })
  }

  const toggleComments = () => {
    setShowComments(!showComments);
  }

  if (!answer) {
    <>loading...</>
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
          onClick={() => { setAnswereredCorrectly(null); onNewQuestion(randomQuestion._id) }}>give me another question</button>
        <button onClick={toggleComments}>Show Comments</button>
        <div>You can add a comment to this question:</div>
        <textarea
          onChange={(e) => { setComment(e.target.value) }}
          value={comment}
          >
          </textarea>
        <button
          onClick={() => { console.log(randomQuestion._id); sendComment(randomQuestion._id, comment) }}
        >Submit comment</button>
        <Comment question={randomQuestion} showComments={showComments} toggleComments={toggleComments} />
      </>)

  }

  else {

    return (
      <>
        <div>sorry, wrong answer</div>
        <button
          onClick={() => { setAnswereredCorrectly(null); onNewQuestion(randomQuestion._id); }}
        >give me another question</button>
        <div>
          <div>you can add a comment to this question:</div>
          <textarea
            onChange={(e) => { setComment(e.target.value) }}
            value={comment}
          >
          </textarea>
          <button

            onClick={() => { console.log(randomQuestion._id); sendComment(randomQuestion._id, comment) }}
          >Submit comment</button>
          <button onClick={toggleComments}>Show Comments</button>
          <Comment question={randomQuestion} showComments={showComments} toggleComments={toggleComments} />
        </div>
      </>)
  }

}

export default Answers;
