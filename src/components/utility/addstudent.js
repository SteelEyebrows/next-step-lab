import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import * as academy from '../auth/academyInfo';
import AboutMultiple from './AboutFunction'
import {API, graphqlOperation } from 'aws-amplify';
import * as graphql from './graphql';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Tooltip from '@material-ui/core/Tooltip';



export default function AddStudent() {

  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');  
  const [aclass, setClass] = React.useState('');
  const [name, setName] = React.useState('');
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const handleRegister = async() =>{
    if(age !== '' && aclass !== '' && name !==''){
      const input_query={
        id: Math.random().toString(36).substring(7),
        type: "student",
        name: name,
        grade:age,
        class:aclass
      };
      await API.graphql(graphqlOperation(graphql.createStudent, {input: input_query})).then(r =>{
          NotificationManager.success('Upload Success', `${name} 학생이 저장 되었습니다`,3000);
          handleClose()     
      });
    }else{
      NotificationManager.error('failed', `항목을 모두 채워주세요`,3000);
    }
  }

  const handleAgeChange = event => {
    setAge(event.target.value);
  };
  const handleclassChange = event => {
    setClass(event.target.value);
  };
  const handlenameChange = event => {
    setName(event.target.value);
  };


 const csvTojson = (sender)=>{
        // check file extd
    var result = [];
    var reader = new FileReader();
    reader.readAsText(sender.target.files[0],'EUC-KR');
    reader.onload = (sender) => {
        //csv to json
        var data = sender.target.result;
            let lines = data.split(/\r\n|\n/);  // 줄바꿈으로 나눔
            var headers=lines[0].split(",");
            for(var i=1;i<lines.length;i++){
                var obj = {};
                var currentline=lines[i].split(",");
                for(var j=0;j<headers.length;j++){
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
            handleFileInput(result);
  }
}

  const handleFileInput =(e)=>{ //multiple
    try {
        let res = JSON.parse(e)
        res.map(async(man,i)=>{
          const input_query={
            id: Math.random().toString(36).substring(7),
            type: "student",
            name: man.name,
            grade:man.grade,
            class:man.class
          };
          await API.graphql(graphqlOperation(graphql.createStudent, {input: input_query})).then(r =>{
            if(i === res.length-1){
              // alert(`${i}--${res.length}--${res[0].name} 외 ${res.length}명이 저장 되었습니다`)
              NotificationManager.success('Upload Success', `${res[0].name} 외 ${res.length}명이 저장 되었습니다`,3000);             
          }
         });
      });
  } catch (err) {
      console.error(err);
  }
      // const input_query={
      //   id: tempD.key,
      //   type: "word",
      //   name: tempD.key,
      //   grade:null,
      //   percentage:null ,
      //   words: tempD.location,
      // };
      
      // await API.graphql(graphqlOperation(graphql.createWord, {input: input_query})).then(this._getWordData());
}

  return (
    <div>
      <NotificationContainer/>
      <Tooltip title="Add Student" arrow>
      <IconButton  onClick={handleClickOpen}>
                        <PersonAddIcon size="large" style={{ color: '#5a69bf' }}/>
                    </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">학생추가</DialogTitle>
        <DialogContent>
          <DialogContentText>
            한명의 학생을 등록하는 페이지입니다. 여러명의 학생을 한번에 등록하려면 아래의 링크를 참조하세요.
              <AboutMultiple buttontitle={"Multiple 기능 사용법"} content={"f"}/>
          </DialogContentText>
          <div style={{float:'right'}}>
              <FormControl style={{width:200}}>
                <InputLabel id="demo-simple-select-label">학년</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleAgeChange}
                >
                {
                  academy.info.grade.map((g,i)=>{
                    return(
                    <MenuItem value={g}>{g}</MenuItem>
                    );
                  })
                }
                </Select>
            </FormControl>
            <FormControl style={{width:200}}>
                <InputLabel id="demo-simple-select-label">반</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={aclass}
                onChange={handleclassChange}
                >
                {
                  academy.info.class.map((c,i)=>{
                    return(
                    <MenuItem value={c}>{c}</MenuItem>
                    );
                  })
                }
                </Select>
            </FormControl>
            </div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="학생이름"
            type="text"
            fullWidth
            value={name}
          onChange={handlenameChange}
          />
        </DialogContent>
        <DialogActions>
         
              <input id="contained-button-file" style={{display:'none'}} type="file" onChange={csvTojson}  name="file" accept=".csv"/>
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Multiple
                </Button>
              </label>

        
          <Button onClick={handleRegister} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
