import './css/App.css';
import Header from './components/Header'
import Login from './pages/Login'
import QuizList from './pages/QuizList';
import CreateQuiz from './pages/CreateQuiz';
import CreateQuestion from './pages/CreateQuestion';
import CreateFinalCard from './pages/CreateFinalCard';
import AnswersConfiguration from './pages/AnswersConfiguration';
import Configurations from './pages/Configurations';
import UsersList from './pages/UsersList';
import CreateUser from './pages/CreateUser';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useUser } from './contexts/AuthContext';

function App() {
  const [user, ,] = useUser()

  if (user) {
    console.log('Logged in')
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={QuizList} />
          <Route path="/create-quiz" exact component={CreateQuiz} />
          <Route path="/create-question" exact component={CreateQuestion} />
          <Route path="/create-final-card" exact component={CreateFinalCard} />
          <Route path="/answers-configuration" exact component={AnswersConfiguration} />
          <Route path="/configurations" exact component={Configurations} />
          <Route path="/users" exact component={UsersList} />
          <Route path="/create-user" exact component={CreateUser} />
        </div>
      </Router>
    );
  } else {
    console.log('Not logged in')
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
