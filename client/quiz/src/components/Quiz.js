import React, { useState, useEffect } from 'react';
import Answer from './Answer';
import Question from './Question';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [randomQuestion, setRandomQuestion] = useState(null);
    const [randomIndex, setRandomIndex] = useState('');
    const [previousQuestions, setPreviousQuestions] = useState([]);

    const handleNewQuestion=(id)=>{
        const newList = [...previousQuestions];
        newList.push(id);
        setPreviousQuestions(newList);
    }



    const fetchQuestions = () => {
        fetch('/api/question/all')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
console.log(data);
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
    }, [questions, previousQuestions]);


    if(randomQuestion){
        console.log(randomQuestion)
    return (
        <div>
            <Question randomQuestion={randomQuestion}/>

            <Answer randomQuestion={randomQuestion} onNewQuestion={handleNewQuestion}/>
        </div>


    );
    }


        return (
            <div>loading</div>
        )

};

export default Quiz;
