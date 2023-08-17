import React, { useState, useEffect } from 'react';
import Answers from './Answers';
import Question from './Question';

const Quiz = () => {
	const [questions, setQuestions] = useState([]);
	const [randomQuestion, setRandomQuestion] = useState(null);
	const [previousQuestions, setPreviousQuestions] = useState([]);

	const handleNewQuestion = (id) => {
		const newList = [...previousQuestions];
		newList.push(id);
		setPreviousQuestions(newList);
	}

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

	useEffect(() => {
		if (questions.length > 0) {
			const randomIndexes = Math.floor(Math.random() * questions.length);
			setRandomQuestion({ ...questions[randomIndexes] });
		}
	}, [questions, previousQuestions]);

	if (randomQuestion) {
		console.log(randomQuestion._id);
		return (
			<div>
				<Question randomQuestion={randomQuestion} />

				<Answers randomQuestion={randomQuestion} onNewQuestion={handleNewQuestion} />
			</div>


		);
	}


	return (
		<div>loading</div>
	)

};

export default Quiz;
