import React from 'react'
import './App.css'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/NavBar/NavBar'
import { AuthProvider } from './context/auth'

import { BoardList } from './components/BoardList/BoardList'
import ThreadsList from './components/ThreadList/ThreadList'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import AddThread from './components/AddThread/AddThread'
import Subcategory from './pages/Subcategory/SubCategory'
import Thread from './components/Thread/Thread'

import AuthRoute from './utils/AuthRoute'
import ProtectedRoute from './utils/ProtectedRoute'
import EditPost from './pages/EditPost/EditPost'

const App = () => {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <Navbar />
          <Route exact path="/" component={BoardList} />
          <Route exact path="/posts" component={ThreadsList} />
          <AuthRoute exact path="/register" component={Register} />
          <AuthRoute exact path="/login" component={Login} />
          <Route exact path="/subcategories" component={Subcategory} />
          <Route exact path="/thread" component={Thread} />
          <ProtectedRoute exact path="/addthread" component={AddThread} />
          <ProtectedRoute exact path="/editpost" component={EditPost} />
        </Router>
      </Container>
    </AuthProvider>
  )
}

export default App
