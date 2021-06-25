import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import Register from './pages/public/Login/Register'
import Login from './pages/public/Login/Login'
import ForgottenPassword from './pages/public/Login/ForgottenPassword'
import ForgottenPasswordReset from './pages/public/Login/ForgottenPasswordReset'
import VerifyUser from './pages/public/Login/VerifyUser'
import { PassportCallback } from './pages/public/Login/PassportCallback'

import Home from './pages/public/Home/Home'
import Header from './components/Header/Header'
import UserDashboard from './pages/user/UserDashboard/UserDashboard'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import UsersList from './pages/admin/Users/UsersList'
import UserRolesList from './pages/admin/UserRoles/UserRolesList'
import UserRoleEdit from './pages/admin/UserRoles/UserRolesEdit'
import Posts from './pages/user/Posts/Posts'

export default function App() {
  return (
    <>
      <Header />
      {/*
              A <Switch> looks through all its children <Route>
              elements and renders the first one whose path
              matches the current URL. Use a <Switch> any time
              you have multiple routes, but you want only one
              of them to render at a time
            */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/posts">
          <Posts />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/login/facebook">
          <PassportCallback type={'facebook'} />
        </Route>
        <Route path="/login/github">
          <PassportCallback type={'github'} />
        </Route>
        <Route path="/login/google">
          <PassportCallback type={'google'} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/forgotten-password/:token" component={ForgottenPasswordReset} />
        <Route exact path="/forgotten-password">
          <ForgottenPassword />
        </Route>

        <Route path="/verify-user/:verifyToken" component={VerifyUser} />

        <ProtectedRoute path="/user/dashboard">
          <UserDashboard />
        </ProtectedRoute>
        <Route path="/user/info">{/* <UserInfo /> */}</Route>

        <ProtectedRoute path="/admin/users" role={'admin'}>
          <UsersList adminMode={true} />
        </ProtectedRoute>
        <ProtectedRoute path="/admin/roles" role={'admin'}>
          <UserRolesList adminMode={true} />
        </ProtectedRoute>
        <ProtectedRoute path="/user/roles/:id" role={'admin'} children={<UserRoleEdit />} />
      </Switch>
    </>
  )
}
