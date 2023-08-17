import { useState, useEffect } from 'react';
import './Question.css';

const QuestionList = () => {
	const [questions, setQuestions] = useState(null);
	const [loading, setLoading] = useState(true);
	const [stats, setStats] = useState(null);

	const favoriteSymbol = '❤️';

	const fetchStats = async () => {
		const res = await fetch("/api/stats");
		return res.json();
	}

	const fetchQuestions = async () => {
		const res = await fetch('/api/question/');
		return res.json();
	}

	useEffect(() => {
		const task = async () => {
			const [stat, questionList] = await Promise.all([fetchStats(), fetchQuestions()]);
			setQuestions(questionList);
			setStats(stat);
			setLoading(false);
		}
		task();
	}, []);

	const handleDelete = async (id) => {
		await fetch(`/api/question/${id}`, {
			method: "DELETE",
		});
		await fetch(`/api/answer/${id}`, {
			method: "DELETE",
		});
		const questions = await fetchQuestions();
		setQuestions(questions);
	}

	const handleFavoriteClick = async (question) => {
		const newObject = { ...question }
		newObject.isFavorite = !(newObject.isFavorite)
		await fetch(`/api/question/${question._id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ ...newObject })
		})
		const questions = await fetchQuestions();
		setQuestions(questions);
	}

	if (loading) {
		return (
			<div>Loading</div>
		)
	}
	return (

		<>
			{stats.ratio != 0 &&
				<div>Success ratio:{stats.ratio}</div>
			}
			{questions.map((question) => {
				return (

					<div key={question._id} className="question-details"
					<div key={question._id}>
						{question.timesAsked !== 0 &&
							<>Stats:
								<span>{(question.answeredCorrectly / question.timesAsked)}</span>
							</>
						}

						<h2>{question.question}</h2>
						<p>Theme: {question.theme}</p>
						{(question.isFavorite ? (
							<div>
								<p>{favoriteSymbol}</p>
								<button className="favorite-button" onClick={() => handleFavoriteClick(question)}>
									Remove from favorites
								</button>
							</div>
						) :
							<button className="favorite-button" onClick={() => handleFavoriteClick(question)}>Add to favorites</button>)}
						<button className="delete-button" onClick={() => handleDelete(question._id)}>Delete</button>
					</div>
				)
			})
			}
		</>

	)

}
export default QuestionList;