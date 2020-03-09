import React, { Component, Fragment } from 'react';
import axios from "axios";
import CheckboxTree from 'react-checkbox-tree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {API, graphqlOperation } from 'aws-amplify';
import S3 from 'react-s3';
import * as graphql from './utility/graphql';
import '../index.css';
import AboutFunction from './utility/AboutFunction';
import MaterialTable from 'material-table';
import "react-daterange-picker/dist/css/react-calendar.css";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {CSVLink, CSVDownload} from "react-csv";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as academy from './auth/academyInfo'

const config = require('../config.json');

const steptitle =[
    '어떠한 작업을 하시겠습니까?', 
    '대상 학생을 선택해주세요', 
    '엑셀파일을 다운로드 받으세요.',
    '다운받은 파일을 다음과 같은 형식으로 작성하신 후, 아래의 버튼을 눌러 업로드 해주세요'
]

export default class CsvTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      value:1,  
      newproduct: null,
      tablevalue: [],

      deletechecked:[],
      deleteexpended:[],
      
      haveto:100,
      loading:true,
      AllStu:null,
      treeSet:null,
      wordSet:[],activeStep:0,
      type:"숙제",
      filename:'filename'
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

  selectATtree=(w)=>{
      let tablevalue=[]
    this.state.AllStu.forEach(i=>{
        w.forEach(j=>{
            if(i.value === j){
                tablevalue.push(i)
            }
        })
    })

    tablevalue=tablevalue.map(x=>{
        return {name:x.label,id:x.value}
    })

    let csv=null
    if(this.state.type ==="숙제"){
        csv =[
            ['name', 'id','homework','asignment','done','month','day']
          ];
    }else{
        csv =[
            ['name', 'id','test','score','month','day']
        ];
    }

    tablevalue.forEach(x=>{
        let temp = [];
        temp.push(x.name)
        temp.push(x.id)
        csv.push(temp);
    })  
    this.setState({csv:csv,tablevalue:tablevalue,deletechecked:w})
  }

  handleRadioChange = event => {
    this.setState({type:event.target.value})
  };
  handleFileNameChange = event => {
    this.setState({filename:event.target.value});
  };

  handleNext = () => {
    this.setState({activeStep:this.state.activeStep+1})
  };

  handleBack = () => {
    this.setState({activeStep:this.state.activeStep-1})
  };

  componentDidMount = async() => {
    await Promise.all([this._getStudentData()]).then((d)=>{
      this.setState({loading:false})
    //   console.log(Math.random().toString(36).substring(2, 15))
    }
    )
  }


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
      <div>
      <AboutFunction style={{width:'100%',height:50}} iconstyle={{position:'absolute',right:100}} content={"f"}/>
      <Stepper activeStep={this.state.activeStep} orientation="vertical">
        {steptitle.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
                <div>
                    {index===0&&
                        <div style={{width:400}}>
                            <FormControlLabel
                                value="숙제"
                                control={<Radio
                                color="default"
                                    checked={this.state.type === '숙제'}
                                    onChange={this.handleRadioChange}
                                />}
                                label="숙제결과 입력"
                                labelPlacement="End"
                                />
                             <FormControlLabel
                                value="시험"
                                control={<Radio
                                color="default"
                                    checked={this.state.type === '시험'}
                                    onChange={this.handleRadioChange}
                                />}
                                label="시험결과 입력"
                                labelPlacement="End"
                                />     
                                
                          
                        </div>
                    }
                    {index===1&&
                    <div id="addWordToStudent" style={{display:'flex',marginTop:30}}>
                        <div style={{width:"30%"}}>
                            <div className="tile is-ancestor">
                                <CheckboxTree
                                nodes={this.state.treeSet}
                                checked={this.state.deletechecked}
                                expanded={this.state.deleteexpanded}
                                onCheck={checked => this.selectATtree(checked)}
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
                            <MakeCsvPage tablevalue={this.state.tablevalue}/>
                            </div>
                        </div>
                    </div>}
                    {index===2&&
                        <div style={{height:150}}>
                           <TextField
                                value={this.state.filename}
                                onChange={this.handleFileNameChange}
                                type="text"
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                           <CSVLink filename={`${this.state.filename}.csv`} data={this.state.csv}>
                           <Button variant="contained" color="primary" startIcon={<img src="spreadsheet.png" width="20" height="20" alt="spreadsheet"/>}>download</Button>
                            </CSVLink>
                        </div>
                    }
                           
                </div>
              <div>
                <div>
                  <Button
                    disabled={this.state.activeStep === 0}
                    onClick={this.handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                  >
                    {this.state.activeStep === steptitle.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>

            </div>


        </div>
       
        </div>  
        </section>
      </Fragment>
        }
      </div>
      
    )
  }
}

function MakeCsvPage(props) {
    const [state, setState] = React.useState({
      columns: [
        { title: 'name', field: 'name' },
        { title: 'full ID', field: 'id' },
      ],
    });

    // 'homework','assignment','done','month','day'

    return (
        <div>
      <MaterialTable
        title="Select"
        columns={state.columns}
        data={props.tablevalue }
      />
      </div>
    );
  }

