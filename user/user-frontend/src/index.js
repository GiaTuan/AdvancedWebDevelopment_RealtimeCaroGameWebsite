import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import ProtectedRoute from './components/protectedRoute';
import Hall from './components/hall';
import Game from './components/game';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={Login} ></Route>
      <Route exact path="/register" component={Register} ></Route>
      <ProtectedRoute path="/hall" component={Hall}></ProtectedRoute>
      <ProtectedRoute path="/game/:id" component={Game}></ProtectedRoute>


    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
