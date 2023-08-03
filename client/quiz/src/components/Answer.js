import { useState,useEffect } from "react";
const Answer = (props) => {
    const randomQuestion = props.randomQuestion
    console.log(randomQuestion);
    const [answer,setAnswer]= useState(null)

    useEffect(()=>{
        const questionId = randomQuestion
        console.log(questionId)
        if(questionId !== ''){
            fetchAnswer(questionId._id)
        }
    },[randomQuestion])

    const fetchAnswer = (randomIndex)=>{
        fetch(`/api/answer/getOne/${randomIndex}`)
        .then((res)=>{
            if(!res.ok){
                throw new Error('Network response was not ok')
            }
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setAnswer(data)
        })
        .catch((error) => {
            console.error('Error fetching answer:', error);
          })
          
    }
    return ( 
        <div>
        {answer ? (
          <div>
            <h3>Answer</h3>
            <p>{answer.answers[0].answer}</p>
          </div>
        ) : (
          <p>No answer available.</p>
        )}
      </div>
     );
}
 
export default Answer;
