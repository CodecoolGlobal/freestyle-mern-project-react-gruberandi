import { useState, useEffect } from "react";
import './Question.css';
import Comment from "./Comment";
import AnswerPart from "./AnswerPart";

const Answers = ({ randomQuestion, onNewQuestion }) => {

  const [randomAnswers, setRandomAnswers] = useState(null);
  const [isAnswered, setIsAnswered] = useState({ answered: false, correct: null });
  const [answer, setAnswer] = useState(null);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const task = async () => {
      if (randomQuestion !== '') {
        const randAnswer = await fetchAnswer(randomQuestion._id);
        await fetch(`/api/question/${randomQuestion._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              ...randomQuestion,
              timesAsked: randomQuestion.timesAsked ++,
            }),
        });

        setAnswer(randAnswer);
        setRandomAnswers(randomizeAnswers(randAnswer.answers));
      }
    }
    task();
  }, [randomQuestion]);


  const handleAnswer = (bool) => {
    const newAnwser = { ...isAnswered };
    newAnwser.answered = true;
    newAnwser.correct = bool;
    setIsAnswered(newAnwser);
  }

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

  const handleNewQuestion = () => {
    const newObject = { ...isAnswered };

    newObject.answered = false;

    setIsAnswered(newObject);
  }

  if (!answer) {
    <>loading...</>
  }

  else if (!isAnswered.answered) {
    return (
      <div className="answer-container">
        {randomAnswers.map((answer) => {
          return (
            <AnswerPart
              key={answer._id}
              answer={answer}
              onAnswer={handleAnswer}
              isAnswered={isAnswered}
            />
          )
        })}
      </div>
    )
  }

  else if (isAnswered.answered) {
    return (
      <>
        <div className="answer-container">
          {randomAnswers.map((answer) => {
            return (
              <AnswerPart
                key={answer._id}
                answer={answer}
                onAnswer={handleAnswer}
                isAnswered={isAnswered}
              />
            )
          })}
        </div>
        <button

          onClick={() => { handleNewQuestion(); onNewQuestion(randomQuestion._id); setShowComments(false); }}>give me another question</button>
        <button onClick={() => { setShowComments(!showComments) }}>Show Comments</button>
        <div>you can add a comment to this question:</div>
        <input
          onChange={(e) => { setComment(e.target.value) }} value={comment}></input>

        <button
          onClick={() => {
            sendComment(randomQuestion._id, comment);
            setComment('');
          }}
        >Submit comment</button>
        <Comment question={randomQuestion} showComments={showComments} toggleComments={toggleComments} />
      </>)
  }
}

export default Answers;
