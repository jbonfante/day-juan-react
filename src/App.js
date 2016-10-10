import React, { Component } from 'react';
import { BrowserRouter, Match } from 'react-router';
import LayoutNav from './layout/Nav';
import LayoutFooter from './layout/Footer';
import Home from './Home'
import Documentation from './Documentation'
import './App.scss';

const title = 'Day Juan React';
const gh = 'jbonfante/day-juan-react';

// if using a root url, remove the basename value here and in BrowserRouter
const basename = process.env.REACT_APP_GH_PAGES_PATH ?
    `/${process.env.REACT_APP_GH_PAGES_PATH}` : '';

// {/*<BrowserRouter basename={basename}>*/};

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App">
              <LayoutNav title={title} gh={gh}/>
                {/* Begin Routes */}
                <Match exactly pattern="/" render={() => <Home title={title} gh={gh} />} />
                <Match pattern="/documentation" component={Documentation} />
                {/* End Routes */}
                <LayoutFooter gh={gh} />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
