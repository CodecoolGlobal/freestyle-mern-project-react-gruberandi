import { useState, useEffect } from 'react';

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState([])
    const [favorit, setFavorit] = useState([])

    useEffect(() => {
        fetch('/api/question/all')
            .then((res) => { return res.json() })
            .then((fetchedQuestions) => {
                setQuestions(fetchedQuestions);
                setLoading(false);
            })
    }, [deleted, favorit]);

const handleDelete = (id) => {
    fetch(`/api/question/delete/${id}`, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json"
        }
    })
        .then ((res) => res.json())
        .then((data) => setDeleted(data))
}

const addToFavorites = (question) => {
    const newObject = {...question}
    newObject.isFavorite = true
    console.log(newObject);
    fetch(`/api/question/update/${question._id}`, {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...newObject})
    })
        .then ((res) => res.json())
        .then((data) => setFavorit(data))
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
                        <h2>{question.theme}</h2>
                        {(question.isFavorite ? <div>❤️</div> :                         
                        <button onClick={() => addToFavorites(question)}>Add to Fav</button>)}
                        

                        <button onClick={() => handleDelete(question._id)}>Delete</button>

                    </div>
                )
            })
            }
        </>
    
    )

}
export default QuestionList;