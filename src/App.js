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
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useUser } from './contexts/AuthContext';

function App() {
  const [user, ,] = useUser()

  if (user) {
    console.log('Logged in')
    return (
      <HelmetProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <div className="App">
            <Helmet>
              <meta charSet="utf-8" />
              <link rel="icon" type="image/png" href="https://lifeandmoney.com.br/wp-content/uploads/2021/04/Favicon-LM-300x300.png" />
              <title>Life + Money Quiz</title>
            </Helmet>
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
      </HelmetProvider>
    );
  } else {
    console.log('Not logged in')
    return (
      <HelmetProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <div className="App">
            <Helmet>
              <meta charSet="utf-8" />
              <link rel="icon" type="image/png" href="https://lifeandmoney.com.br/wp-content/uploads/2021/04/Favicon-LM-300x300.png" />
              <title>Life + Money Quiz</title>
            </Helmet>
            <Header />
            <Route path="/" exact component={Login} />
          </div>
        </Router>
      </HelmetProvider>
    );
  }
}

export default App;
