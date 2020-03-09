import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {API, graphqlOperation } from 'aws-amplify';
import * as graphql from './graphql';

export default function EditStudent(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] =  React.useState('');
  const [grade, setGrade] =  React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
//   alert(JSON.stringify(props.All));

  const handleFileInput = async()=>{
      if(name !==''&& grade!==''){
        await API.graphql(graphqlOperation(graphql.updateAll, {input: {
            id: props.id,
            name: name,
            grade:grade,
          }})).then(handleClose())
      }else{
          alert("모두 입력해주세요")
      }
}

const thisname = props.All.find(x => x.id === props.id).name;
const thisgrade = props.All.find(x => x.id === props.id).grade;
// const todo = props.All.find(x => x.id === props.id).todo;


  //   id type name grade link words
  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            margin="dense"
            label="name"
            placeholder={thisname}
            type="email"
            fullWidth
          />
          <TextField
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            autoFocus
            margin="dense"
            label="grade"
            placeholder={thisgrade}
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFileInput} color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}