import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import Paper from '@material-ui/core/Paper';

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  }

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
    const { username, email, password } = this.state;
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email: email
        }
      });
      this.props.history.push("/welcome");
      console.log(signUpResponse);
    } catch (error) {
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
  }

  render() {
    return (

<div style={{backgroundColor:'#fff'}}>
<div style={{height:150}}/>
<section className="section auth">
  <div style={{display:'flex'}}  className="container">
    <Paper elevation={3} style={{padding:30,width:"50%"}}>
    <form onSubmit={this.handleSubmit}>
      <h1>Register</h1>
      <div className="field">
        <p style={{width:400}} className="control">
        <p>Name</p>
          <input 
            className="input" 
            type="text"
            id="username"
            aria-describedby="userNameHelp"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.onInputChange}
          />
        </p>
      </div>
      <div className="field">
        <p style={{width:400}} className="control">
          <p>Email</p>
          <input 
           className="input" 
           type="email"
           id="email"
           aria-describedby="emailHelp"
           placeholder="Enter email"
           value={this.state.email}
           onChange={this.onInputChange}
          />
        </p>
      </div>
      <div className="field">
        <p style={{width:400}} className="control has-icons-left">
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
        <p style={{width:400}} className="control has-icons-left">
          <p>Confirm Password</p>
          <input 
            className="input" 
            type="password"
            id="confirmpassword"
            placeholder="Confirm password"
            value={this.state.confirmpassword}
            onChange={this.onInputChange}
          />
        </p>
      </div>
      <div className="field">
        <p className="control">
          <FormErrors formerrors={this.state.errors} />
          <button style={{backgroundColor:'#5a69bf',borderWidth:2,borderColor:'#ddd',color:'#ddd',width:400}} className="button is-success">
            Register
          </button>
        </p>
      </div>
    </form>
  </Paper>
  <div style={{width:'50%',marginLeft:30}}>
      <img src="art.png" width="80%" height="80%" alt="secure"/>
    </div>
  </div>
</section>
<div style={{height:150}}/>

</div>
    );
  }
}

export default Register;


 