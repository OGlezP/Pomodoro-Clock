import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PomodoroClock from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PomodoroClock />, document.getElementById('root'));
registerServiceWorker();
