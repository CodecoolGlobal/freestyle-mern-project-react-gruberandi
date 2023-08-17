
import { useState } from 'react'

const Creator = ({ switchPage }) => {

  const [question, setQuestion] = useState({
    theme: 'q',
    question: 'w',
    timesAsked: 0,
    answeredCorrectly: 0,
    comments: [],
    isFavorite: false,
  });
  const [answer, setAnswer] = useState({
    contentType: 'text',
    answers: [
      {
        answer: 'a',
        correct: true
      }, {
        answer: 'b',
        correct: false
      }, {
        answer: 'c',
        correct: false
      }
    ],
    answersWhichQuestion: '',
  });


  const saveNewQuestionAndAnswers = async (questionObj, answerObj) => {
    const res = await fetch('/api/question/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questionObj)
    });
    const question = await res.json();
    answerObj.answersWhichQuestion = question._id;
    await fetch('/api/answer/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(answerObj)
      });
    switchPage('list')
  }

  const handleInput = (e) => {

    const identifier = e.target.id.split('-');

    let newAnswer=structuredClone(answer);
    let newQuestion=structuredClone(question);
    if (identifier[0] === 'answer') {

  
      if (identifier.length > 2) {

        newAnswer[identifier[1]][Number(identifier[2])[identifier[3]]] = e.target.value;
      }
      else {

        newAnswer[identifier[1]] = e.target.value;
      }
      setAnswer(newAnswer);
    }
    else if (identifier[1] === 'question') {

      newQuestion[identifier[1]] = e.target.id;
   
      setQuestion(newQuestion);
    }

  }

  return (
    <>
      <div>Add New Question
        <label htmlFor='question-theme'> add theme (one only)</label>
        <input onChange={(e)=>{
          const newQuestion = structuredClone(question);
          newQuestion.theme=e.target.value;
          setQuestion(newQuestion);
        }} id='question-theme' value={question.theme}></input>
        <label htmlFor='question-question'>add the question</label>
        <input onChange={(e)=>{
          const newQuestion = structuredClone(question);
          newQuestion.question=e.target.value;
          setQuestion(newQuestion);
        }} id='question-question' value={question.question}></input>
      </div>

      <div> Add Answers
        <label htmlFor='answer-contentType'></label>
        <select onChange={(e)=>{
          const newAnswer = structuredClone(answer);
          newAnswer.contentType=e.target.value;
          setAnswer(newAnswer);
        }} id='answer-contentType' value={answer.contentType}>
          <option value='code'>code</option>
          <option  value='text'>text</option>
        </select>

        <label htmlFor='answer-answers-0-answer'> add the correct answer</label>
        <input onChange={(e)=>{
          const newAnswer = structuredClone(answer);
          newAnswer.answers[0].answer=e.target.value;
          setAnswer(newAnswer);
        }} value={answer.answers[0].answer} id='answer-answers-0-answer'></input>
        <label htmlFor='answer-answers-1-answer'> add a wrong answer</label>
        <input onChange={(e)=>{
          const newAnswer = structuredClone(answer);
          newAnswer.answers[1].answer=e.target.value
          setAnswer(newAnswer);
        }} value={answer.answers[1].answer} id='answer-answers-1-answer'></input>
        <label htmlFor='answer-answers-2-answer'>add a wrong answer</label>
        <input onChange={(e)=>{
          const newAnswer = structuredClone(answer);
          newAnswer.answers[2].answer=e.target.value
          setAnswer(newAnswer);
        }} value={answer.answers[2].answer} id='answer-answers-2-answer'></input>
        <button onClick={()=>{saveNewQuestionAndAnswers(question, answer)}}>Save</button>


      </div>

    </>

  )


}

export default Creator;