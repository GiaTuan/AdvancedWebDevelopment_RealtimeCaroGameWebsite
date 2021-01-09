import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Hall from './components/hall';
import Game from './components/game';
import History from './components/history';
import GameDetail from './components/gameDetail';
import UserDetail from './components/userDetail';
import ForgetPassword from './components/forgetPassword';
import ChangePassword from './components/changePassword';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={Login}></Route>
      <Route exact path="/forgetPassword" component={ForgetPassword}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route path="/hall" component={Hall} exact></Route>
      <Route path="/history/:id" component={GameDetail} exact></Route>
      <Route path="/history" component={History} exact></Route>
      <Route path="/user/:id" component={UserDetail} exact></Route>
      <Route path="/user/:id/changePassword" component={ChangePassword} exact></Route>
      <Route path="/game/:id" component={Game} exact></Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
