import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ResumeCoder from './ResumeCoder/index';

/*
<Switch>
	<Route exact path="/" component={TableLayout} />
	<Route exact path="/lorem" component={Lorem} />
	<Route exact path="/record" component={RecordLayout} />
	<Route exact path="/record/:id" component={RecordLayout} />
	<Route exact path="/posts" component={PostsLayout} />
	<Route exact path="/posts/:id" component={PostsLayout} />
</Switch>
*/

const Layout = () =>
	<ResumeCoder />;

export default Layout;
