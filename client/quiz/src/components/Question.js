const Question = ({randomQuestion})=>{

  return(
    <div key={randomQuestion._id}>
    <h2>{randomQuestion.question}</h2>
    <p>{randomQuestion.description}</p>
  </div>
  )
  
}
import React, { useState, useEffect } from 'react';
import Answer from './Answer';
import './Question.css';

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [randomQuestion, setRandomQuestion] = useState(null);
  const [randomIndex, setRandomIndex] = useState('');



  const fetchQuestions = () => {
    fetch('/api/question/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => { 
       
        setQuestions(data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const randomIndexes = Math.floor(Math.random() * questions.length);
      setRandomIndex(randomIndexes);
      setRandomQuestion(questions[randomIndexes]);
    }
  }, [questions]);

  return (
      <div className='question-container'>
      {randomQuestion ? (
          <div key={randomQuestion._id}>
          <h2>{randomQuestion.question}</h2>
          <p>{randomQuestion.description}</p>
            <Answer randomQuestion = {randomQuestion} />
        </div>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default Question;
