import './css/App.css';
import Header from './components/Header'
import QuizList from './pages/QuizList';
import CreateQuiz from './pages/CreateQuiz';
import CreateQuestion from './pages/CreateQuestion';
import CreateFinalCard from './pages/CreateFinalCard';
import AnswersConfiguration from './pages/AnswersConfiguration';

import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" exact component={QuizList} />
        <Route path="/create-quiz" exact component={CreateQuiz} />
        <Route path="/create-question" exact component={CreateQuestion} />
        <Route path="/create-final-card" exact component={CreateFinalCard} />
        <Route path="/answers-configuration" exact component={AnswersConfiguration} />
      </div>
    </Router>
  );
}

export default App;
