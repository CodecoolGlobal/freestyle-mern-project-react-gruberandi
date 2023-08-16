// import './App.css';
import QuestionList from './components/QuestionList';
import Quiz from './components/Quiz';
import NavBar from './components/NavBar';
import {useState} from 'react';

function App() {
const [page, setPage] = useState('quiz');

function switchPage(page){
  setPage(page)
}

switch (page) {
  case 'quiz':
    return (
      <div>
    <NavBar switchPage={switchPage} />
   <Quiz/>
  
      </div>
    );
    
    case 'list':
      return(
        <div>
    <NavBar switchPage={switchPage}/>
   <QuestionList/>
  
      </div>
      )


  default:
    break;
}
  
}

export default App;
