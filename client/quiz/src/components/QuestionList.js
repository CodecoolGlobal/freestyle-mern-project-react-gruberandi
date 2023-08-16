import { useState, useEffect } from 'react';

const QuestionList = () => {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [deleted, setDeleted] = useState([]);
	const [favorite, setFavorite] = useState([]);

	const favoriteSymbol = '❤️';

	useEffect(() => {
		fetch('/api/question/')
			.then((res) => { return res.json() })
			.then((fetchedQuestions) => {
				setQuestions(fetchedQuestions);
				setLoading(false);
			})
	}, [deleted, favorite]);

	const handleDelete = (id) => { //TODO delete answer as well
		fetch(`/api/question/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((res) => res.json())
			.then((data) => setDeleted(data))
	}

	const handleFavoriteClick = (question) => {
		const newObject = { ...question }
		newObject.isFavorite = !(newObject.isFavorite)
		fetch(`/api/question/${question._id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ ...newObject })
		})
			.then((res) => res.json())
			.then((data) => setFavorite(data))
	}

	if (loading) {
		return (
			<div>Loading</div>
		)
	}
	return (

		<>
			{questions.map((question) => {
				return (
					<div>
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