import React, { Component, Fragment } from 'react';
import axios from "axios";
import CheckboxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {API, graphqlOperation } from 'aws-amplify';
import S3 from 'react-s3';
import * as graphql from './utility/graphql';
import '../index.css';
import Button from '@material-ui/core/Button';
import AboutFunction from './utility/AboutFunction';
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { Scrollbars } from 'react-custom-scrollbars';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DeleteListComp from './utility/deleteListComp'
import * as academy from './auth/academyInfo'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const config = require('../config.json');
const moment = extendMoment(originalMoment);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default class WordSetting extends Component {
  constructor(props) {
    super(props);
    const today = moment();
    this.state = { 
      value:0,  
      newproduct: null,
      products: [],
      
      addchecked: [],
      addexpanded: [],

      deletechecked:[],
      deleteexpended:[],
      
      haveto:100,
      loading:true,
      AllStu:null,
      treeSet:null,
      wordSet:[],
      selectedWord:[],
      AddOrDelete:true,
      select:[],
      calendarValue: moment.range(today.clone().subtract(1, "days"), today.clone())//calendar
     };
};
 

  fetchProducts = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/products`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  handleChange = (event, newValue) => {
    this.setState({ value: newValue,addchecked: [],addexpanded: [],deletechecked:[],deleteexpended:[]});
  }


  csvTojson = (sender)=>{
        // check file extd
    var result = [];
    var reader = new FileReader();
    let name = sender.target.files[0].name

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
            let e = new File([JSON.stringify(result)], name.replace('.csv','.json'), {type: "application/json"})
            this.handleFileInput(e);
            // var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result));
            // var dlAnchorElem = document.createElement('a');
            // dlAnchorElem.setAttribute("href",dataStr);
            // dlAnchorElem.setAttribute("download", "newworkbook.json");
            // dlAnchorElem.click();
  }
}
  // ▽
  handleFileInput =async(e)=>{
      await S3.uploadFile(e, {
          bucketName: config.S3.bucketName,
          dirName:config.S3.dirName,
          region: config.S3.region,
          accessKeyId: config.S3.accessKeyId,
          secretAccessKey: config.S3.secretAccessKey,
      }).then( d =>{
          this.SaveWords(d);
        }).catch(err =>alert(err));
  }
  // ▽       

  SaveWords = async(tempD)=>{
    const input_query={
      id: Math.random().toString(36).substring(7),
      type: "word",
      name: tempD.key.replace(`${config.S3.dirName}/`,""),
      grade:null, // haveto
      link: tempD.location,
      address:null,
      deleted:false
    };
    // alert(JSON.stringify(input_query))
    NotificationManager.success('Upload Success', '단어장을 저장하였습니다',3000); 
    await API.graphql(graphqlOperation(graphql.createWord, {input: input_query})).then(()=>
      this._getWordData()
    );
  }
  // ▽
  _getWordData = async() =>{
    await API.graphql(graphqlOperation(graphql.queryCword)).then(data =>{
   
    let tt = data.data.listMyTypes.items.filter(x=> x.deleted === null || x.deleted ===false);
    // alert(JSON.stringify(tt))
      this.setState({wordSet:tt})
    })
  }
 
  _makestudenttree=(data)=>{
    let AllStu = [];

  
    let treeSet = academy.info.grade.map((g)=>{
      let classcomp = academy.info.class.map((c,i)=>{
        return {value:`${c}${g}`,label:c,children:[]}
      });
     return {value:g,label:g,children:classcomp}
   });

     data.forEach((student,i)=>{
      let temptreeSet = JSON.parse(JSON.stringify(treeSet));
       let nowGrade = student.grade;
       let nowClass= student.class;
       //react-checkbox-tree 양식에 맞도록 재가공
       let studentInfo = { value: student.id , label: student.name,grade:nowGrade,class:nowClass, percentage:student.percentage, assignment:student.assignment,words:student.words };
       
       let gradeindex =treeSet.findIndex(x=>x.value===nowGrade);
       let classindex =treeSet[gradeindex].children.findIndex(x=>x.value===`${nowClass}${nowGrade}`);

        temptreeSet[gradeindex].children[classindex].children.push(studentInfo)
        treeSet[gradeindex] = temptreeSet[gradeindex]
          //  console.log(`treeSet[${gradeindex}].children[${classindex}].children`)
           AllStu.push(studentInfo);   
           // alert(JSON.stringify(treeSet))
     })

     treeSet.forEach((i,index)=>{
       let temp = i.children.filter(j=>j.children.length!==0)    
        treeSet[index].children =temp
      })
      treeSet= treeSet.filter(x=>x.children.length!==0);
     this.setState({treeSet:treeSet,AllStu:AllStu});
  }

  _getStudentData = async() =>{
    await API.graphql(graphqlOperation(graphql.queryCstudent)).then(data =>{   
      this._makestudenttree(data.data.listMyTypes.items)
    })
  }

  selectWord=(w)=>{
        if(this.state.selectedWord.includes(w) === false){
            this.setState({
                selectedWord: [...this.state.selectedWord, w]
            });
        }else{
            this.setState({selectedWord: this.state.selectedWord.filter(function(word) { 
                return word !== w
            })});
        }  
  }

  addSendData = () =>{
    
    this.state.AllStu.map((student, i)=>{    
        if(this.state.addchecked.indexOf(student.value) !== -1){ 

              let wordset = this.state.wordSet

            this.state.select.map(async(sw,i)=>{//선택된 단어장

 
                let temp = student.words!==null?student.words.findIndex(x => x.label === sw):-2
                let temp2 = this.state.wordSet.findIndex(x => x.name === sw)

              if(temp!==-1&&temp!==-2){
                    NotificationManager.warning('Upload Failed', `${student.label}이 이미 ${sw}을 가지고 있습니다.`,3000);
                    return "";
                }
              else if(temp2 !== -1){

                  wordset[temp2].haveto = this.state.haveto;
                  wordset[temp2].due = `${this.state.calendarValue.start.format("YYYY-MM-DD")}/${this.state.calendarValue.end.format("YYYY-MM-DD")}`
                  const ass = temp===-2?[wordset[temp2]]:student.words.concat(wordset[temp2])

                  const input_query={
                    id: student.value,
                    words: ass,
                  };

                await API.graphql(graphqlOperation(graphql.updateWord, {input: input_query})).then(data =>{
                     NotificationManager.success('Upload Success', `${student.label}에게 ${sw}을 업로드 하였습니다.`,3000);
                })
                }else return 0
              })

        }else return 0;
    })
  }
  
  oncalendarSelect = (calendarValue, states) => {
    this.setState({ calendarValue, states });
  };//calendar



  renderSelectionValue = () => {
    return (
      <div style={{padding:25}}>
        <div id="calendar" style={{display:'flex'}}>
          <strong>Start    :   </strong>
          <p style={{fontSize:'1.8em'}}>{this.state.calendarValue.start.format("YYYY-MM-DD")}</p>
        </div>
        <div style={{display:'flex'}}>
          <strong>End    :   </strong>
          <p style={{fontSize:'1.8em'}}>{this.state.calendarValue.end.format("YYYY-MM-DD")}</p>
        </div>
      </div>
    );
  };//calendar

  

  componentDidMount = async() => {
    await Promise.all([this._getStudentData(), this._getWordData()]).then((d)=>{
      this.setState({loading:false})
    //   console.log(Math.random().toString(36).substring(2, 15))
    }
    )
  }

  handleChangeMultiple = event => {
    // alert(event.target.value)
    this.setState({select:event.target.value});
  };

  handleHavetoChange = event => {
    this.setState({haveto:event.target.value});
  };

  render() {
    return (
      <div>
        {
          this.state.loading?
          <p>loading</p>
          :
        <Fragment>
                  <div style={{height:70}}/>
                  <NotificationContainer/>
        <section style={{backgroundColor:'#fff'}} className="section">
        {/* {this.props.auth.isAuthenticated?  */}
        
        <div>
        <div>

       

      <Paper elevation={0} position="static">
        <Tabs indicatorColor="primary" textColor="primary" value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
          <Tab label="단어장 추가" {...this.a11yProps(0)} />
          <Tab label="단어장 삭제" {...this.a11yProps(1)} />
        </Tabs>
      </Paper>
      <TabPanel value={this.state.value} index={0}>
        <div>
        <AboutFunction style={{width:'100%',height:50}} iconstyle={{position:'absolute',right:100}} content={"f"}/>
        <div id="addWordToStudent" style={{display:'flex'}}>

        
            <div style={{width:"30%"}}>


            <div style={{marginBottom:50,display:'flex'}}>
            <div style={{marginTop:15}}>
              <input id="contained-button-file" style={{display:'none'}} type="file"  name="file" onChange={e => this.csvTojson(e)} accept=".csv"/>
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  +
                </Button>
              </label>
            </div>
            
            <div id="selecter" style={{width:"50%",marginLeft:10}}>
            <FormControl style={{width:"100%"}}>
          <InputLabel id="demo-mutiple-chip-label">select</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={this.state.select}
            onChange={event =>this.handleChangeMultiple(event)}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div>
                {
                selected.map((w,i) => (
                   <Chip
                   key={i}
                   label={w.replace('.json','')}
                 />
                ))
                }
              </div>
            )}
            MenuProps={MenuProps}
          >{this.state.wordSet.map(w => (
            <MenuItem key={w.id} value={w.name}>
              {w.name.replace('.json','')}
            </MenuItem>
          ))}
          </Select>
        </FormControl>
            </div>
            </div>

            <div className="tile is-ancestor">
                <CheckboxTree
                nodes={this.state.treeSet}
                checked={this.state.addchecked}
                expanded={this.state.addexpanded}
                onCheck={checked =>{ this.setState({ addchecked:checked })}}
                onExpand={expanded =>{ this.setState({ addexpanded:expanded })} }
                icons={{
                check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon="check-square" />,
                uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={['fas', 'square']} />,
                halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon="check-square" />,
                expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon="chevron-right" />,
                expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon="chevron-down" />,
                expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square" />,
                collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square" />,
                parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon="folder" />,
                parentOpen: <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon="folder-open" />,
                leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon="file" />
            }}
            />             
            </div>
            </div>

            <div id="seleted_Comp_Box" style={{width:"100%",display:'flex'}} >
              <div style={{marginRight:100}}>

                <div>
                  <strong>WordBook</strong>
                  <Scrollbars style={{ height: 110,width: 300,display:'flex',backgroundColor:"#F4F5F7",borderRadius:20 }}>
                     {//if selected, print that
                          this.state.select.map((word,i)=>{
                            return(
                              <Chip
                                style={{margin:5,backgroundColor:'#5a69bf',color:'#fff'}}
                                key={word}
                                label={word.replace('.json','')}
                              />
                            );
                        })
                    }
                  </Scrollbars>
                  
                </div>

                <div>
                  <strong>Students</strong>
                  <Scrollbars style={{ height: 110,width: 300,display:'flex',backgroundColor:"#F4F5F7",borderRadius:20 }}>
                  {
                      this.state.AllStu.map((student, i)=>{    
                          if(this.state.addchecked.indexOf(student.value) !== -1){
                              return(
                                <Chip
                                  style={{margin:5,backgroundColor:'#5a69bf',color:'#fff'}}
                                  key={student.label}
                                  label={student.label}
                                />
                          );
                          }
                          return "";
                      })
                      }
                  </Scrollbars>
                  
                </div> 

                <div style={{ height: 80,width: 300}}>
                  <strong>Have to</strong>
                  <div>
                      <TextField
                        value={this.state.haveto}
                        onChange={this.handleHavetoChange}
                        id="outlined-number"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                      />
                  </div>
                </div>

                </div>  
                <div>
                  <div>{this.renderSelectionValue()}</div>
                  <div>
                    <DateRangePicker
                      value={this.state.calendarValue}
                      onSelect={this.oncalendarSelect}
                      singleDateRange={true}
                    />
                  
                </div>
                <div>
                        <Button style={{backgroundColor:'#5a69bf',borderWidth:2,borderColor:'#ddd',color:'#ddd',width:300}} onClick={()=>{this.addSendData()}}>
                            send
                        </Button>
                </div>
                </div>
              
            </div>
            </div>
            </div>
      </TabPanel>
      <TabPanel value={this.state.value} index={1}>
      <div>
      <AboutFunction style={{width:'100%',height:50}} iconstyle={{position:'absolute',right:100}} content={"f"}/>
        <div id="addWordToStudent" style={{display:'flex',marginTop:30}}>

            <div style={{width:"30%"}}>

            <div className="tile is-ancestor">
                <CheckboxTree
                nodes={this.state.treeSet}
                checked={this.state.deletechecked}
                expanded={this.state.deleteexpanded}
                onCheck={checked => this.setState({ deletechecked:checked })}
                onExpand={expanded => this.setState({ deleteexpanded:expanded })}
                icons={{
                check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon="check-square" />,
                uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={['fas', 'square']} />,
                halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon="check-square" />,
                expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon="chevron-right" />,
                expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon="chevron-down" />,
                expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square" />,
                collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square" />,
                parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon="folder" />,
                parentOpen: <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon="folder-open" />,
                leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon="file" />
            }}
            />             
            </div>
            </div>

            <div id="seleted_Comp_Box" style={{width:"70%",borderRadius:50,alignItems:'center'}} >
                <div style={{width: '100%',display:'flex'}} id="selected_Student_Name">
                    <CommonWordsView wordSet={this.state.wordSet} allstu={this.state.AllStu} deletechecked={this.state.deletechecked}/>
                </div>
            </div>
            </div>
            </div>
      </TabPanel>

        </div>
       


        </div>  
        </section>
      </Fragment>
        }
      </div>
      
    )
  }
}



function CommonWordsView(props) {
    let CommonWords = [];
    let commonWords_id =[];

    props.allstu.map((student, i)=>{                            
        if(props.deletechecked.indexOf(student.value) !== -1){
            if(student.words !== null){
            student.words.map((perword,i)=>{
              if(props.wordSet.findIndex(x=>x.id===perword.id)!==-1){ //delete되지 않은 단어인가?  맞다       
                if(CommonWords.length >0){//맨 처음 push하는 것인가? 아니다
                    CommonWords.map((c,i)=>{
                        
                          if(c.id === perword.id){ // 해당 단어장이 이미 있는가? 없다
                            CommonWords[i].common.push({name:student.label, id:student.value})
                            }
                            else if(commonWords_id.includes(perword.id)===false){// 해당 단어장이 이미 있는가? 있다
                                CommonWords.push({id:perword.id,name:perword.name,common:[{name:student.label, id:student.value}]})
                                commonWords_id.push(perword.id);
                            } 
                        
                    })
                }else if(CommonWords.length === 0){//맨 처음 push하는 것인가? 맞다
                    CommonWords.push({id:perword.id,name:perword.name,common:[{name:student.label, id:student.value}]})
                    commonWords_id.push(perword.id);
                }
              }
            })
          }
        }
    })
    
    return (
      <Scrollbars style={{height:500}}>
          <div style={{width:"80%"}}><DeleteListComp commonWords_id={commonWords_id} CommonWords={CommonWords}/></div>
      </Scrollbars>
    );
  }



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

