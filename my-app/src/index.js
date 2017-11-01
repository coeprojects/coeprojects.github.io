import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dash1 from "./Dash1.js";
import App from './App';
import Tableau from "tableau-react";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Dash1 />, document.getElementById('root'));
registerServiceWorker();
