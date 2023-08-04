import Question from './components/Question';
import Answer from './components/Answer';
// import './App.css';
import QuestionList from './components/QuestionList';
import Quiz from './components/Quiz';
import NavBar from './components/NavBar';
import {useState} from 'react';

function App() {
const [page, setPage] = useState('quiz');

switch (page) {
  case 'quiz':
    return (
      <div>
    <NavBar/>
   <Quiz/>
  
      </div>
    );
    
    case 'list':
      return(
        <div>
    <NavBar/>
   <QuestionList/>
  
      </div>
      )


  default:
    break;
}
  
}

export default App;
