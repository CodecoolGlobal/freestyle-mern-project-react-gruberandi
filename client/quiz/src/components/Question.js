import React, { useState, useEffect } from 'react';
import './Question.css';

const Question = ({randomQuestion}) => {
  const [questions, setQuestions] = useState([]);
  const fetchQuestions = () => {
    fetch('/api/question/')
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

  return (
      <div className='question-container'>
      {randomQuestion ? (
          <div key={randomQuestion._id}>
          <h2 class="question-text">{randomQuestion.question}</h2>
        </div>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
};

export default Question;
