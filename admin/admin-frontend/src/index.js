import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Games from './components/games';
import GameDetail from './components/games/gameDetail';
import Login from './components/login';
import Users from './components/user';
import UserDetail from './components/user/userDetail';
import UserGames from './components/user/userGames';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={Login} ></Route>
      <Route path="/users" component={Users} exact></Route>
      <Route path="/users/:id" component={UserDetail} exact></Route>
      <Route path="/users/:id/games" component={UserGames} exact></Route>
      <Route path="/games" component={Games} exact></Route>
      <Route path="/games/:id" component={GameDetail} exact></Route>


    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
