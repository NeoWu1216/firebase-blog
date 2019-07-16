import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import NavigationBar from './components/layout/NavigationBar'
import DashBoard from './components/layout/DashBoard'
import SignIn from './components/auth/SignIn'
import BlogContent from './components/blogs/BlogContent'
import SignUp from './components/auth/SignUp';
import ResetPassword from './components/auth/ResetPassword'
import BlogCreation from './components/blogs/BlogCreation';
import ScrollToTop from 'react-router-scroll-top'
import Parallax from './components/layout/Parallax'
import Music from './components/layout/Music'
import Profile from './components/user/Profile'
import Favorite from './components/layout/Favorite'
import Background from './components/layout/Background'

class App extends Component {

  render() {
    return (
      <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
          <ScrollToTop>
      <div className="App">
        <NavigationBar/>
        <Music/>
        
        <Background/>
        <Switch>
          <Route exact path='/' component={DashBoard}/>
          <Route path='/signin' component={SignIn}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/create' component={BlogCreation}/>
          <Route path='/blog/:id' component={BlogContent}/>
          <Route path='/reset' component={ResetPassword}/>
          <Route path='/user/:id' component={Profile} />
          <Route path='/favorite' component={Favorite}/>
        </Switch>

        {/* <Parallax/> */}
        
      </div>
          </ScrollToTop>
      </BrowserRouter>
    );
  }
}

export default App;
