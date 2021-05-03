import './App.css';
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { BoardList } from './components/BoardList/BoardList'
import Navbar from './components/NavBar/NavBar'
import ThreadsList from './components/ThreadList/ThreadList'
import Register from './components/Register/Register'
import Login from './components/Login/Login'

function App() {
  return (
    <Container>
      <Router>
      <Navbar/>
        <Route exact path='/' component={BoardList} />
        <Route exact path='/posts' component={ThreadsList} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Router>
    </Container>
  );
}

export default App;
