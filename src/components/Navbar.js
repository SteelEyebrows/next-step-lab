import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText('rgba(90, 105, 191,1.0)'),
    backgroundColor: 'rgba(90, 105, 191,1.0)',
    '&:hover': {
      backgroundColor: 'rgba(90, 105, 191,0.95)',
      color: '#fff',
    },
  },
}))(Button);


export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      window.location.href="/";
    }catch(error) {
      console.log(error.message);
    }
  }
  render() {
    return (
      <nav style={{backgroundColor:'#fff',position:'absolute',width:'100%'}} className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="NEWLOGO.png" width="28" height="28" alt="hexal logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          {
            this.props.logined?

            <div className="navbar-start">
          <a href="/" className="link-1">
            <img  className="hovicon effect-1" src="graph.png" width="20" height="20" alt="home"/>
          </a>
          <a href="/wordsetting" className="link-1">
            <img className="hovicon effect-1" src="manual.png" width="20" height="20" alt="word setting"/>
          </a>
          <a href="/products" className="link-1">
            <img className="hovicon effect-1" src="group.png" width="20" height="20" alt="students setting"/>
          </a>
          <a href="/csv" className="link-1">
            <img className="hovicon effect-1" src="fileadd.png" width="20" height="20" alt="students setting"/>
          </a>
        </div>
        
        
        :


            <div className="navbar-start">
            <a href="/" className="link-1">
              <img  className="hovicon effect-1" src="home-run.png" width="28" height="28" alt="home"/>
            </a>
           
          </div>
         
          }
          

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  Hello {this.props.auth.user.username}
                </p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <Button style={{borderColor:'#ddd',borderWidth:2,color:'#ddd'}} href="/register" variant="outlined">Register</Button>
                    <ColorButton style={{marginLeft:10}}  href="/login" variant="contained" disableElevation>
                      Log in
                    </ColorButton>

                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <ColorButton style={{marginLeft:10}}  href="/" variant="contained" onClick={this.handleLogOut} disableElevation>
                    Logout
                  </ColorButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>


    )
  }
}
