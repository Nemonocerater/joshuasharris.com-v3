import '../css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';

// https://blog.pshrmn.com/entry/simple-react-router-v4-tutorial/
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';

let element = document.createElement('div');
element.id = "myapp";
document.body.appendChild(element)

ReactDOM.render(
	<BrowserRouter>
	  <Layout />
	</BrowserRouter>
, element);
