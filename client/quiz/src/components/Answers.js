import { useState, useEffect } from "react";
import './Question.css';
import Comment from "./Comment";
import AnswerPart from "./AnswerPart";

const Answers = ({ randomQuestion, onNewQuestion }) => {

  const [comment, setComment] = useState('');
  const [answer, setAnswer] = useState(null)
  const [answerOrder, setAnswerOrder] = useState(null);
  const [answeredCorrectly, setAnswereredCorrectly] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const sendComment=(id, comment) => {
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
    if (randomQuestion !== '') {
      fetchAnswer(randomQuestion._id)
    }
  }, [randomQuestion])

  const fetchAnswer = (id) => {
    fetch(`/api/answer/${id}`)
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
      <div className="answer-container">
        <AnswerPart
          answer={answer[0].answers[answerOrder[0]]}
          onAnswer={handleAnswer} />
        <AnswerPart
          answer={answer[0].answers[answerOrder[1]]}
          onAnswer={handleAnswer} />
        <AnswerPart
          answer={answer[0].answers[answerOrder[2]]}
          onAnswer={handleAnswer} />
      </div>
    )
  }

  else if (answeredCorrectly) {
    return (
      <>
        <div>congrats!</div>
        <button
          onClick={() => { setAnswereredCorrectly(null); onNewQuestion(randomQuestion._id);setShowComments(false); }}>give me another question</button>
          <button onClick={() => {setShowComments(!showComments)}}>Show Comments</button>
          <div>you can add a comment to this question:</div>
          <input
            onChange={(e) => { setComment(e.target.value) }} value={comment}></input>
          <button

          onClick={()=>{console.log(randomQuestion._id); sendComment(randomQuestion._id, comment )}}
          >Submit comment</button>
          <Comment question={randomQuestion} showComments={showComments}/>
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

          onClick={()=>{console.log(randomQuestion._id); sendComment(randomQuestion._id, comment )}}
          >Submit comment</button>
          <button onClick={() => {setShowComments(!showComments)}}>Show Comments</button>
          <Comment question={randomQuestion} showComments={showComments}/>
        </div>

      </>)
  }

}

export default Answers;
