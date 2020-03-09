import React, { Component, Fragment } from 'react';
// import Product from './Product';
import axios from "axios";
import CheckboxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {API, graphqlOperation } from 'aws-amplify';
import * as graphql from './utility/graphql';
import DetailedExpansionPanel from './utility/expansion';
import AddStudent from './utility/addstudent'


import AboutFunction from './utility/AboutFunction';
import DoneIcon from '@material-ui/icons/Done';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import { Scrollbars } from 'react-custom-scrollbars';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';

import HandleTestRecord from './utility/addTestRecord'
import HandleHomework from './utility/addHomework';
import Slider from '@material-ui/core/Slider';
import PageviewIcon from '@material-ui/icons/Pageview';
import EnhancedTable from './utility/tableview';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import * as academy from './auth/academyInfo';
import IconButton from '@material-ui/core/IconButton';
const config = require('../config.json');

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


export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      login:this.props.auth.isAuthenticated,

      addchecked: [],
      addexpanded: [], // tree view

      deletechecked:[],
      deleteexpended:[], // table view

      value:0,
      newproduct: null,
      products: [],
      checked: [],
      expanded: [],
      loading:true,
      AllStu:null,
      treeSet:null, date: new Date(),
      All:null,

      selectgrade:[],
      selectclass:[],

      todayfilter:100,
      totalfilter:100,
     };
};
handleChange = (event, newValue) => {
  this.setState({ value: newValue,addchecked: [],addexpanded: [],deletechecked:[],deleteexpended:[]});
}

a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

onChange = date => this.setState({ date })

  fetchProducts = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/products`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
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
        let temp =[];
        let temptreeSet = JSON.parse(JSON.stringify(treeSet));
       let nowGrade = student.grade;
       let nowClass= student.class;
       //react-checkbox-tree 양식에 맞도록 재가공
       let TodayAssemble =[];
       let AllAssemble = [];       

   
       if(student.record !== null){
         temp = student.record.filter(item => 
           item.month === Number(new Date().getMonth())  && item.day === Number(new Date().getDate())
         );
         TodayAssemble=temp.map(data => {return data.etc});
         
         AllAssemble = student.record.map(item => {
               return item.etc
         });
       }    
       let Today =0;
       let Total =0;
       if(TodayAssemble.length >0){
         Today =TodayAssemble.reduce((accumulator, currentValue) => accumulator + currentValue)/TodayAssemble.length;
       }
       if(AllAssemble.length>0){
         Total =AllAssemble.reduce((accumulator, currentValue) => accumulator + currentValue)/AllAssemble.length;
       }
       let studentInfo = { 
         value: student.id , 
         grade: student.grade,
         class:student.class,
         label: student.name, 
         words:student.words, 
         todo:student.todo, 
         record:student.record,  
         TodayAssemble:TodayAssemble,// 오늘 퍼센트 배열
         AllAssemble:AllAssemble,//전체 퍼센트 배열
         todayAvg:Math.round(Today),
         totalAvg:Math.round(Total),
         homework:student.homework,
         test:student.test}
      
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
      this.setState({treeSet:treeSet,AllStu:AllStu,All:data,selectgrade:academy.info.grade,selectclass:academy.info.class});
  }
 
  _getStudentData = async() =>{
    await API.graphql(graphqlOperation(graphql.queryCstudent)).then(data =>{
      this._makestudenttree(data.data.listMyTypes.items)
      
    })
  }

  componentDidMount = async() => {
    await Promise.all([this._getStudentData()]).then((d)=>{
      this.setState({loading:false})
    }
    )   
  }

  //selecter
  handleChangeMultiplegrade = event => {
    this.setState({selectgrade:event.target.value});
    // alert(event.target.value)
  };
  handleChangeMultipleclass = event => {
    this.setState({selectclass:event.target.value});
    // alert(event.target.value)
  };

  //slider
  valuetext=(value) =>{
    return `${value}% 이하`;
  }

  handleSliderChange = (event, newValue) => {
    // this.setState({Slider:Number(event.target.value)});
   return newValue
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
        <section style={{marginTop:-270,backgroundColor:'#fff'}} className="section">
        <div className="container">
        <h1 style={{color:'#5a69bf'}}>학생 데이터/관리</h1>
        <p className="subtitle is-5">학생들의 데이터를 확인하거나 등록/삭제를 할 수 있습니다.</p> 
        <br/><br/><br/><br/><br/><br/>
        <div style={{float:'right'}}><AddStudent/></div>   
        <div style={{float:'right'}}><HandleHomework/></div>   
        <div style={{float:'right'}}><HandleTestRecord/></div>   
        <Paper elevation={0} square>
        <Tabs indicatorColor="primary" textColor="primary" value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
          <Tab label="table" {...this.a11yProps(0)} />
          <Tab label="tree" {...this.a11yProps(1)} />
        </Tabs>
      </Paper>        
        <br />
        <TabPanel value={this.state.value} index={1}>
          <div>
          <AboutFunction style={{width:'100%',height:50}} iconstyle={{position:'absolute',right:30}} content={"f"}/>
        <div style={{display:'flex',marginTop:30}}>
          <div style={{width:"30%"}}>
            <div className="tile is-ancestor">
              <CheckboxTree
              nodes={this.state.treeSet}
              checked={this.state.checked}
              expanded={this.state.expanded}
              onCheck={checked => this.setState({ checked })}
              onExpand={expanded => this.setState({ expanded })}
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
          <div  style={{width:750}}>

            {
              this.state.AllStu.map((student, i)=>{
                if(this.state.checked.indexOf(student.value) !== -1){
                  return(
                    <DetailedExpansionPanel 
                      All={this.state.All} 
                      id={student.value} 
                      name={student.label} 
                      TodayAssemble={student.TodayAssemble}
                      AllAssemble={student.AllAssemble}
                      record={student.record}
                      homework={student.homework}
                      test={student.test}/>
                  );// to utility/expansion  ->  calendar and editstudent
                }
                return "";
              })
            }

          </div>   
        </div>      
        </div>          
        </TabPanel>
        <TabPanel value={this.state.value} index={0}> 
        <div>
        <AboutFunction style={{width:'100%',height:50}} iconstyle={{position:'absolute',right:30}} content={"f"}/>
        <div style={{display:'flex',marginTop:30}}>
          <div id="selecter" style={{width:"30%"}}>
            <FormControl style={{width:"100%"}}>
          <InputLabel id="demo-mutiple-chip-label">반을 선택하세요</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={this.state.selectgrade}
            onChange={event =>this.handleChangeMultiplegrade(event)}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div>
                {selected.map(value => (
                  <Chip key={value} label={value} deleteIcon={<DoneIcon />}/>
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {academy.info.grade.map(grade => (
              <MenuItem key={grade} value={grade}>
                {grade}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
            </div>
            <div id="selecter" style={{width:"30%"}}>
            <FormControl style={{width:"100%"}}>
          <InputLabel id="demo-mutiple-chip-label">학년을 선택하세요</InputLabel>
          <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={this.state.selectclass}
            onChange={event =>this.handleChangeMultipleclass(event)}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div>
                {selected.map(value => (
                  <Chip key={value} label={value} deleteIcon={<DoneIcon />}/>
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {academy.info.class.map(aclass => (
              <MenuItem key={aclass} value={aclass}>
                {aclass}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
            </div>
            
              <div style={{width:"15%",marginTop:20,marginLeft:30}}>
              <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Total</InputLabel>
              <OutlinedInput
              id="outlined-adornment-amount"
              value={this.state.todayfilter}
              onChange={event=>this.setState({todayfilter:event.target.value})}
              endAdornment={<InputAdornment position="end">이하</InputAdornment>}
              labelWidth={60}
            />
            </FormControl>
              </div>
              <div style={{width:"15%",marginTop:20,marginLeft:30}}>
              <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">Total</InputLabel>
              <OutlinedInput
              id="outlined-adornment-amount"
              value={this.state.totalfilter}
              onChange={event=>this.setState({totalfilter:event.target.value})}
              endAdornment={<InputAdornment position="end">이하</InputAdornment>}
              labelWidth={60}
            />
            </FormControl>
              </div>
            <div id="slider" style={{marginTop:10,marginLeft:30}}>
            <IconButton onClick={()=>this.setState({Slider:this.state.Slider2})}  aria-label="search">
              <PageviewIcon fontSize="large" style={{ color: '#5a69bf' }}/>
            </IconButton>
            </div>
          </div>
          <EnhancedTable 
            grade={this.state.selectgrade}
            class={this.state.selectclass}
            total={this.state.totalfilter}
            today={this.state.todayfilter}
            All={this.state.AllStu}/>
             {/*to utility/Tableview  */}
             </div>
        </TabPanel>        
      </div>  

      {/* :<p>xxxxxxxxxx</p>} */}
         
        </section>
      </Fragment>
        }
      </div>
      
    )
  }
}



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}