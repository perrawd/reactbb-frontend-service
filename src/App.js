import './App.css';
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { BoardList } from './components/BoardList/BoardList'
import Navbar from './components/NavBar/NavBar'
import ThreadsList from './components/ThreadList/ThreadList'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute'

function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <Navbar/>
          <Route exact path='/' component={BoardList} />
          <Route exact path='/posts' component={ThreadsList} />
          <AuthRoute exact path='/register' component={Register} />
          <AuthRoute exact path='/login' component={Login} />
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;
