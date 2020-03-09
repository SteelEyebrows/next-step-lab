import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import Paper from '@material-ui/core/Paper';

class LogIn extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    this.clearErrorState();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }

    // AWS Cognito integration here
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      console.log(user);
      this.props.auth.setAuthStatus(true);
      this.props.auth.setUser(user);
      this.props.history.push("/");
    }catch(error) {
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <div style={{backgroundColor:'#fff'}}>
      <div style={{height:150}}/>
      <section className="section auth">
        <div style={{display:'flex'}}  className="container">
          <div style={{width:'50%'}}>
            <img src="secure.jpg" width="80%" height="80%" alt="secure"/>
          
          </div>
       
          <Paper elevation={3} style={{padding:30,width:"50%"}}>
          <form onSubmit={this.handleSubmit}>
            <h1>Login</h1>
            <div className="field">
              <p style={{width:400}} className="control">
                <p>User ID</p>
                <input 
                  className="input" 
                  type="text"
                  id="username"
                  aria-describedby="usernameHelp"
                  placeholder="Enter username or email"
                  value={this.state.username}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p style={{width:400}} className="control">
                <p>Password</p>
                <input 
                  className="input" 
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <FormErrors formerrors={this.state.errors} />
                <button style={{backgroundColor:'#5a69bf',borderWidth:2,borderColor:'#ddd',color:'#ddd',width:400}} className="button is-success">
                  Login
                </button>
              </p>
            </div>
          </form>
        </Paper>
        </div>
      </section>
      <div style={{height:150}}/>
      
      </div>
    );
  }
}

export default LogIn;