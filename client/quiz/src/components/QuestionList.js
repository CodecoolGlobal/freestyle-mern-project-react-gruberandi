import { useState, useEffect } from 'react';

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
			<div>Success ratio:{stats.ratio}</div>
			{questions.map((question) => {
				return (
					<div key={question._id}>
						<h2>{(question.answeredCorrectly / question.timesAsked)}</h2>
						<h2>{question.question}</h2>
						<p>Theme: {question.theme}</p>
						{(question.isFavorite ? (
							<div>
								<p>{favoriteSymbol}</p>
								<button onClick={() => handleFavoriteClick(question)}>
									Remove from favorites
								</button>
							</div>
						) :
							<button onClick={() => handleFavoriteClick(question)}>Add to favorites</button>)}
						<button onClick={() => handleDelete(question._id)}>Delete</button>

					</div>
				)
			})
			}
		</>

	)

}
export default QuestionList;