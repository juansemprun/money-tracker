import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Custom Components
import Navbar from './layout/navbar/Navbar'
import Footer from './layout/footer/Footer'
import SignUp from './pages/signup/SignUp'
import LogIn from './pages/login/LogIn'
import Dashboard from './pages/dashboard/Dashboard'
import Transactions from './pages/transactions/Transactions'
import Accounts from './pages/accounts/Accounts'
import Categories from './pages/categories/Categories'
import Profile from './pages/profile/Profile'

import SnackBar from './shared/snackBar/SnackBar'

import authServices from './../services/auth.service'

function App() {
  const [loggedInUser, setLoggedInUser] = useState(undefined)
  const [handleSnackBar, setHandleSnackBar] = useState(false)

  useEffect(() => {
    const authService = new authServices()
    const fetchUser = () => {
      authService
        .isLoggedIn()
        .then(response => setLoggedInUser(response.data))
        .catch(() => setLoggedInUser(null))
    }
    fetchUser()
  }, [])

  const saveUser = user => setLoggedInUser(user)

  return (
    <>
      {loggedInUser ? <Navbar saveUser={saveUser} loggedInUser={loggedInUser} /> : null}
      <Switch>
        <Route path="/" exact render={() => loggedInUser ? <LogIn /> : <Redirect to="/login" />} />

        <Route path="/login" render={props => <LogIn saveUser={saveUser} {...props} />} />
        <Route path="/signup" render={props => <SignUp saveUser={saveUser} {...props} />} />

        <Route path="/dashboard" render={props => loggedInUser ? <Dashboard loggedInUser={loggedInUser} {...props} /> : <Redirect to="/login" />} />
        <Route path="/transactions" render={props => loggedInUser ? <Transactions loggedInUser={loggedInUser} {...props} /> : <Redirect to="/login" />} />
        <Route path="/categories" render={props => loggedInUser ? <Categories loggedInUser={loggedInUser} {...props} /> : <Redirect to="/login" />} />
        <Route path="/accounts" render={props => loggedInUser ? <Accounts loggedInUser={loggedInUser} {...props} /> : <Redirect to="/login" />} />
        <Route path="/profile" render={props => loggedInUser ? <Profile loggedInUser={loggedInUser} {...props} /> : <Redirect to="/login" />} />
        {/* <Footer /> */}
      </Switch>
      {loggedInUser && <SnackBar severity="success" message={`Welcome! ${loggedInUser.name}`} handleSnackBar={() => setHandleSnackBar()} />}
    </>
  )
}

export default App
