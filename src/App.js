import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import WordSetting from './components/WordSetting';
import Products from './components/Products';
import ProductAdmin from './components/ProductAdmin';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import CsvTable from './components/CSVtablepage'

import Sample from './components/Sample';
import MainConsole from './components/mainConsole'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Auth} from 'aws-amplify';
library.add(faEdit);

class App extends Component {

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
    note:[]
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  async componentDidMount() {
    try {      
      
      // const data = await API.graphql(graphqlOperation(query))
      // alert(JSON.stringify(data));

      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      // alert(`Hi ${user}!!`)
      this.setUser(user);

    } catch(error) {
      if (error !== 'No current user') {
        alert(error);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }
    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Router>
          <div>
            <Navbar logined={this.state.isAuthenticated} auth={authProps} />
            <Switch>
              <Route exact path="/" render={(props) => (this.state.isAuthenticated?(<Redirect to="/mainconsole" />):(<Home {...props} auth={authProps} />))}/>
              <Route exact path="/products" render={(props) => (this.state.isAuthenticated?(<Products {...props} auth={authProps} />):(<Redirect to="/login" />))} />
              <Route exact path="/wordsetting" render={(props) => (this.state.isAuthenticated?(<WordSetting {...props} auth={authProps} />):(<Redirect to="/login" />))} />
              <Route exact path="/csv" render={(props) => <CsvTable {...props} auth={authProps} />} />
              <Route exact path="/admin" render={(props) => <ProductAdmin {...props} auth={authProps} />} />
              <Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} />} />
              <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} />} />
              <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} />} />
              <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />} />
              <Route exact path="/changepassword" render={(props) => <ChangePassword {...props} auth={authProps} />} />
              <Route exact path="/changepasswordconfirmation" render={(props) => <ChangePasswordConfirm {...props} auth={authProps} />} />
              <Route exact path="/welcome" render={(props) => <Welcome {...props} auth={authProps} />} />
              <Route exact path="/mainconsole" render={(props) => <MainConsole {...props} auth={authProps} />} />
              <Route exact path="/Sample" render={(props) => <Sample {...props} auth={authProps} />} />
            </Switch>
            
          </div>
        </Router>
      </div>
    );
  }
}

export default App;


