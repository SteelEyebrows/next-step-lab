import React, { Component } from 'react';
import FormErrors from "./FormErrors";
import Validate from "./utility/FormValidation";
import { Auth } from "aws-amplify";
import Paper from '@material-ui/core/Paper';
import {API, graphqlOperation } from 'aws-amplify';
import * as graphql from './utility/graphql';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment'

export default class Sample extends Component {
  state = {
    username: "",
    company: "",
    key:"",
    errors: {
      cognito: null,
      blankfield: false
    }
  };


  
  generateRandom = (min, max) =>{
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
  }

  handleFileInput =(e)=>{ //multiple

    let input_query =[]
    let due = `${moment().format('YYYY-MM-DD')}/${moment().add(7, 'day').format('YYYY-MM-DD')}`

        let record = [];
        let nowMonth = Number(moment().format('MM'));
        let nowDay = Number(moment().format('DD'));
        for(let i=0;i<40;i++){
            const d = Number(moment().subtract(i, 'day').format('DD'))
            if(d>nowDay){
                nowMonth = nowMonth -1
            }

              record.push({
                id:Math.random().toString(36).substring(7),
                bookid:"04453285-6e33-495e-8a40-c5a15ea3cf1f",
                month:nowMonth,
                day: d,
                words:"https://wowproject-wow.s3.amazonaws.com/demo/2020 VOCA.json",
                etc:this.generateRandom(0, 99)
              },{
                id:Math.random().toString(36).substring(7),
                bookid:"2c148799-a0e2-4b92-a2d3-66e4a7b8866d",
                month:nowMonth,
                day: d,
                words:"https://wowproject-wow.s3.amazonaws.com/demo/2020 VOCA2.json",
                etc:this.generateRandom(0, 99)
              });
            
              nowDay = d
        }

        input_query.push({
            id: Math.random().toString(36).substring(7),
            type: "sample",
            name: this.state.username,
            address:this.state.company,
            words:[{
              id:"04453285-6e33-495e-8a40-c5a15ea3cf1f",
              name:"2020 VOCA.json",
              link:"https://wowproject-wow.s3.amazonaws.com/demo/2020 VOCA.json",
              haveto:100,
              due: due
          },{
            id:"2c148799-a0e2-4b92-a2d3-66e4a7b8866d",
            name:"2020 VOCA2.json",
            link:"https://wowproject-wow.s3.amazonaws.com/demo/2020 VOCA2.json",
            haveto:100,
            due: due
        }],
           record:record
          });
          
          input_query.forEach(async(query,i) =>{
            await API.graphql(graphqlOperation(graphql.createStudent3, {input: query})).then(result=>{
              let temp =result.data.createMyType.id;
              this.setState({key:temp.split("-")[0]})
            })
          })
}


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
  };

  render() {
    return (
      <div style={{backgroundColor:'#fff'}}>
          <NotificationContainer/>
      <div style={{height:150}}/>
      <section className="section auth">
        <div style={{display:'flex'}}  className="container">
          <div style={{width:'50%'}}>
            <img src="secure.jpg" width="80%" height="80%" alt="secure"/>
          
          </div>
       
          <Paper elevation={3} style={{padding:30,width:"50%"}}>
            <h1>Get Sample!</h1>
            <div style={{width:"70%"}}>
                <TextField
                fullWidth
                style={{ margin: 8 }}
                id="company"
                label="Company Name"
                type="text"
                value={this.state.password}
                onChange={this.onInputChange}
                InputLabelProps={{
                    shrink: true,
                }}/>
            </div>
            <div style={{width:"70%"}}>
                <TextField
                fullWidth
                style={{ margin: 8 }}
                id="username"
                label="User Name"
                type="text"
                value={this.state.username}
                onChange={this.onInputChange}
                InputLabelProps={{
                    shrink: true,
                }}
                />

                <Button onClick={() => { this.handleFileInput(); }} style={{backgroundColor:'#5a69bf',borderWidth:2,borderColor:'#ddd',color:'#ddd',width:400}} className="button is-success">
                    get Key
                </Button>
                <div>
                    <p>{`key: ${this.state.key}`}</p>
                </div>
            </div>
        </Paper>
        </div>
      </section>
      <div style={{height:150}}/>
      
      </div>
    );
  }
}
