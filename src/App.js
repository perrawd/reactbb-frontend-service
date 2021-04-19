import './App.css';
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BoardList from './components/BoardList.js'
import Navbar from './components/Navbar.js';
import ThreadsList from './components/ThreadsList';

function App() {
  return (
    <Container>
      <Router>
      <Navbar/>
        <Route exact path='/' component={BoardList} />
        <Route exact path='/posts' component={ThreadsList} />
      </Router>
    </Container>
  );
}

export default App;
