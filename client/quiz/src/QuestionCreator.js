import {useState, useEffect} from 'react';

const QuestionCreator = () => {
    
    const handleSubmit= (event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(formData)
    }

return (
    <>
 <h2>Create a new question</h2>
<div>
    <form onSubmit ={(event)=>{
        handleSubmit(event);
    }}>
    <label>Question: </label>
    <input id= 'description'></input>
    <label>add topics seperated by comma</label>
    <input id='address'></input>
    <input type="submit" value="Submit!"></input>
    </form>
</div>
    </>
)


};

export default QuestionCreator;