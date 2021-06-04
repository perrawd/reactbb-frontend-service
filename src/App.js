/**
 * Main entry point of the application.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React from 'react'
import './App.css'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { AuthProvider } from './context/auth'
import AdminRoute from './utils/AdminRoute'
import AuthRoute from './utils/AuthRoute'
import ProtectedRoute from './utils/ProtectedRoute'
import MessageProvider from './context/flashmessage'

import Navbar from './components/NavBar/NavBar'
import { BoardList } from './components/BoardList/BoardList'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import AddThread from './components/AddThread/AddThread'
import Subcategory from './pages/Subcategory/SubCategory'
import Thread from './components/Thread/Thread'
import AdminPage from './pages/AdminPage/AdminPage'
import EditPost from './pages/EditPost/EditPost'
import Error404 from './pages/Error404/Error404'
import Error403 from './pages/Error403/Error403'
import TermsOfUse from './pages/TermsOfUse/TermsOfUse'
import MyProfile from './pages/MyProfile/MyProfile'


const App = () => {
  return (
    <AuthProvider>
      <MessageProvider>
        <Container>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={BoardList} />
              <AuthRoute exact path="/register" component={Register} />
              <AuthRoute exact path="/login" component={Login} />
              <Route exact path="/subcategories" component={Subcategory} />
              <Route exact path="/thread" component={Thread} />
              <ProtectedRoute exact path="/addthread" component={AddThread} />
              <ProtectedRoute exact path="/editpost" component={EditPost} />
              <AdminRoute exact path="/admin" component={AdminPage} />
              <Route exact path="/profile" component={MyProfile} />
              <Route exact path="/termsofuse" component={TermsOfUse} />
              <Route exact path="/403" component={Error403} />
              <Route exact path="*" component={Error404} />
            </Switch>
          </Router>
        </Container>
      </MessageProvider>
    </AuthProvider>
  )
}

export default App
