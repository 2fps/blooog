import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link,hashHistory ,IndexRedirect,IndexRoute} from 'react-router'
import Home from './components/home.jsx'
import Discover from './components/discover.jsx'
const App = React.createClass({
render() {
        return (
        <div>
            <footer>
                <Link to="/home">外卖</Link> 
                <Link to="/discover?qhfrom=home">发现</Link>
            </footer>
            {this.props.children}
        </div>
    )
}
})
const route = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="home" component={Home} />
        <Route path="discover" component={Discover} />
        </Route>
    </Router>
)
render(route, document.getElementById("app"))