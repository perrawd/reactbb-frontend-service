import './App.css';
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import BoardList from './components/BoardList.js'

function App() {
  return (
    <Container>
      <Router>
        <Route exact path='/' component={BoardList} />
      </Router>
    </Container>
  );
}

export default App;
