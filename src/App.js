import './css/App.css';
import Header from './components/Header'
import QuizList from './pages/QuizList';
import CreateQuiz from './pages/CreateQuiz';

import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" exact component={QuizList} />
        <Route path="/create-quiz" exact component={CreateQuiz} />
      </div>
    </Router>
  );
}

export default App;
