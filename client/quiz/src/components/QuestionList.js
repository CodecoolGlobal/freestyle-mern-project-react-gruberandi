import { useState, useEffect } from 'react';

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/question/all')
            .then((res) => { return res.json() })
            .then((fetchedQuestions) => {
                setQuestions(fetchedQuestions);
                setLoading(false);
            })
    }, []);

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
                        {(!question.isFavorite ? <div>love</div> : <></>)}
                        

                    </div>
                )
            })
            }
        </>
    
    )

}
export default QuestionList;