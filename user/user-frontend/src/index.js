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

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/" component={Login} ></Route>
      <Route exact path="/register" component={Register} ></Route>
      <Route path="/hall" component={Hall}></Route>
      <Route path="/history/:id" component={GameDetail} exact></Route>
      <Route path="/history" component={History} exact></Route>
      <Route path="/user/:id" component={UserDetail}></Route>
      <Route path="/game/:id" component={Game}></Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


/*
// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span>{seconds}</span>;
  }
};

ReactDOM.render(
  <Countdown date={Date.now() + 30000} renderer={renderer} />,
  document.getElementById("root")
);




*/