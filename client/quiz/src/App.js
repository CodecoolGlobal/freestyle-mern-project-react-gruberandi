// import './App.css';
import QuestionList from './components/QuestionList';
import Quiz from './components/Quiz';
import NavBar from './components/NavBar';
import { useState } from 'react';
import Creator from './components/Creator';

function App() {
  const [page, setPage] = useState('quiz');

  function switchPage(page) {
    setPage(page)
  }

  switch (page) {
    case 'quiz':
      return (
        <>
          <NavBar switchPage={switchPage} />
          <Quiz />

        </>
      );

    case 'list':
      return (
        <>
          <NavBar switchPage={switchPage} />
          <QuestionList />

        </>
      );

    case 'creator':
      return (<>

        <NavBar switchPage={switchPage} />
        <Creator switchPage={switchPage}/>
      </>
      )


    default:
      break;
  }

}

export default App;
