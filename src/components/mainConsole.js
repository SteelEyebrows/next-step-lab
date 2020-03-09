import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    ArgumentAxis,
    ValueAxis,
  } from '@devexpress/dx-react-chart-material-ui';
  import { Animation } from '@devexpress/dx-react-chart';
  import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
  import List from '@material-ui/core/List';
  import ListItem from '@material-ui/core/ListItem';
  import ListItemText from '@material-ui/core/ListItemText';
  import Switch from '@material-ui/core/Switch';
  import Tabs from '@material-ui/core/Tabs';
  import Tab from '@material-ui/core/Tab';
  import Typography from '@material-ui/core/Typography';
  import Box from '@material-ui/core/Box';
  import ListItemAvatar from '@material-ui/core/ListItemAvatar';
  import Avatar from '@material-ui/core/Avatar';
  import AccountCircleIcon from '@material-ui/icons/AccountCircle';
  import {API, graphqlOperation } from 'aws-amplify';
  import * as graphql from './utility/graphql';
  import * as academyinfo from './auth/academyInfo'
  import moment from 'moment'
  import { withStyles,createStyles } from '@material-ui/core/styles';
  import FormGroup from '@material-ui/core/FormGroup';
  import FormControlLabel from '@material-ui/core/FormControlLabel';
  import Divider from '@material-ui/core/Divider';
  import Button from '@material-ui/core/Button';
  import MultiAddStudent from './utility/multiAddStudent';
  import DateRangePicker from "react-daterange-picker";
  import Dialog from '@material-ui/core/Dialog';
  import DialogActions from '@material-ui/core/DialogActions';
  import DialogContent from '@material-ui/core/DialogContent';
  import Footer from './Footer';
  import MakeCsvPage from './utility/makeCSV'
  const styles = createStyles({
    formControlLabel: { color:'#fff', 
    '& label': { color:'#fff' } }
 });//left side toggle label font color

  const CustomSwitch = withStyles({
    switchBase: {
      color: '$ddd',
      '&$checked': {
        color: '#FFF',
      },
      '&$checked + $track': {
        backgroundColor: '#FFF',
      },
    },
    checked: {},
    track: {},
  })(Switch);//left side toggle color


class MainConsole extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          checked:academyinfo.info.grade,
          listIndex:0,
          chartIndex:0,
          All:[],
          ratelength:0,
          loading:true,
          MonthChart:[],
          DayChart:[],
          noStudent:false,
          Taa:0,  //now selected TodayAssembleAvg
          Aaa:0, //now selected TodayAssembleAvg
          calendarValue: moment(),//calendar
          calendarOpen:false
        };
      }

      toggleCalendar=()=>{

        this.setState({ calendarOpen:true });
      }
      toggleCalendarfalse=()=>{
        this.setState({ calendarOpen:false });
      }
      oncalendarSelect = (calendarValue, states) => {
        this.toggleCalendarfalse()
        this.setState({ calendarValue });
        this.updateAll()
      };//calendar
    
      
      queryCstudent = async(formonthchart,fordaychart,thisMonth,thisDay) =>{

    await API.graphql(graphqlOperation(graphql.queryCstudent)).then(data =>{
        let nowselected = [] //left side age selector
        let MonthChart = [{month:null,assemble:[]},{month:null,assemble:[]},{month:null,assemble:[]},{month:null,assemble:[]},{month:null,assemble:[]}]
        let DayChart = [
            {day:null,assemble:[]},{day:null,assemble:[]},{day:null,assemble:[]},{day:null,assemble:[]},{day:null,assemble:[]},
            {day:null,assemble:[]},{day:null,assemble:[]},{day:null,assemble:[]},{day:null,assemble:[]},{day:null,assemble:[]}
            ]
        let Taa =0; //now selected TodayAssembleAvg
        let Aaa =0; //now selected TodayAssembleAvg
        let Data = data.data.listMyTypes.items;

        if(Data.length>0){
            Data.map((d,i)=>{
                let TodayAssemble = []
                let AllAssemble = []

                if(this.state.checked.includes(d.grade)){
                    if(d.record !==null && d.record.length>0){
    
                        formonthchart.map((month,i)=>{
                            let temp = d.record.filter(x=>x.month===Number(month)).map(x => x.etc);
                            if(MonthChart[i].month ===null){
                                MonthChart[i].month = month;
                            }
                            MonthChart[i].assemble=MonthChart[i].assemble.concat(temp);
                        })//for month chart 3

    
                        fordaychart.map((day,i)=>{
                            let temp = d.record.filter(x=>x.month===Number(day.m) && x.day===Number(day.d)).map(x => x.etc);
                    
                            if(DayChart[i].day ===null){
                                DayChart[i].day = day.d;
                            }
                            DayChart[i].assemble=DayChart[i].assemble.concat(temp);
                        })//for day chart 3


                        d.record.map((record,i)=>{ 
                                if(record.month === thisMonth && record.day === thisDay){ //나중에 수정
                                    TodayAssemble.push(record.etc)
                                    }
                                AllAssemble.push(record.etc)   
                        })//per student's record
                }    
                    const taa = average(TodayAssemble) ===undefined?0:average(TodayAssemble); 
                    const aaa = average(AllAssemble)
                    
                    nowselected.push({name:d.name,grade:d.grade,ta:TodayAssemble,aa:AllAssemble,taa:taa,aaa:aaa})
                }
            });
            
            Taa = average(nowselected.map(x=>x.taa))===undefined?0:average(nowselected.map(x=>x.taa)) //체크된 학생 전부가 오늘 얼마나 숙제를 했는지
            Aaa = average(nowselected.map(x=>x.aaa)) //체크된 학생 전부가 지금까지 숙제한 퍼센트   
            
            MonthChart.map(d=>{
                d.assemble = average(d.assemble)
            });//for month chart 4
            DayChart.map(d=>{
                d.assemble = average(d.assemble)
            });//for day chart 4
            

            let rating = nowselected.sort((a, b) => a.ta < b.ta ? -1 : a.ta < b.ta ? 1 : 0);

            this.setState({
                All:nowselected,
                rating:rating,
                loading:false,
                ratelength:rating.length,
                DayChart:DayChart,
                MonthChart:MonthChart,
                Taa:Taa,
                Aaa:Aaa
            });
        }else{
            this.setState({noStudent:true,loading:false})
        }

    })
  }


  formonthchart=(y,m,d)=>{
    let fivemonths = [];
    let td = [y, m, d];
    for(let i=4;i>-1;i--){
        const d = moment(td).subtract(i, 'month').format('MM')
        fivemonths.push(d);
    }
    return fivemonths
  }//for month chart 1
  

  forDayChart=(y,m,d)=>{
    let tendays = [];
    let td = [y, m, d];
    for(let i=9;i>-1;i--){
        const m = moment(td).subtract(i, 'day').subtract(1, 'month').format('MM')
        const d = moment(td).subtract(i, 'day').format('DD')
        let day =moment(`${d}/${m}/2020`, "DD/MM/YYYY")
        if(moment(day).isValid()===true){
            tendays.push({m:moment(day).format("MM"),d:moment(day).format("DD")});
        }
    }
    return tendays
  }//for day chart 1
  
  updateAll=()=>{
    const y = Number(this.state.calendarValue.format("YYYY"));
    const m = Number(this.state.calendarValue.format("MM"));
    const d = Number(this.state.calendarValue.format("DD"));
    
    const formonthchart = this.formonthchart(y,m,d);//for month chart 2
    const fordaychart = this.forDayChart(y,m,d);//for day chart 2
    this.queryCstudent(formonthchart,fordaychart,m,d);
  }

  componentDidMount =()=>{
    this.updateAll();
  }


    handleToggle = value => () => {
        const currentIndex = this.state.checked.indexOf(value);
        const newChecked = [...this.state.checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        this.updateAll();
        this.setState({checked:newChecked})
      }; //left side age toggle


    handleListChange = (event, newValue) => {
        this.setState({listIndex:newValue});
      };

    handleChartChange = (event, newValue) => {
        this.setState({chartIndex:newValue});
      };

  render() {
    let leng = this.state.ratelength;
    let one = [0,1,2] //상위 3명
    let two = [leng-1,leng-2,leng-3] //하위 3명

    return (
        <div>
            <div style={{height:70}}/>
            {
                this.state.loading?
                    <div></div>:
                        <div>
                            {
                                this.state.noStudent?
                                <div style={{width:'100%',height:500,display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#fff'}}>
                                    <div>
                                    <img src="NEWLOGO.png" width="28" height="28" alt="home"/>
                                        <MultiAddStudent/>
                                    </div>
                                </div>:
                                <div style={{width:'100%',display:'flex',backgroundColor:'#F4F5F7'}}>    
                                <div>
                                    <div style={{margin:20}}>
                                    <Button variant="outlined" color="primary" onClick={this.toggleCalendar}>
                                        {this.state.calendarValue.format("YY/MM/DD")}
                                    </Button>
                                    <Dialog
                                        open={this.state.calendarOpen}
                                        onClose={this.toggleCalendarfalse}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        
                                        <DialogContent>
                                            <DateRangePicker
                                                selectionType='single'
                                                value={this.state.calendarValue}
                                                onSelect={this.oncalendarSelect}
                                                singleDateRange={true}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={this.toggleCalendarfalse} color="primary">
                                            Disagree
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                                    </div>
                                    <div style={{width:150,backgroundColor:'#5a69bf',padding:20,borderTopRightRadius:30,borderBottomRightRadius:30,marginTop:30}} >
                                    <FormGroup>
                                    {academyinfo.info.grade.map((d,i)=>{
                                        return(
                                            <FormControlLabel
                                                control={
                                                <CustomSwitch
                                                    onChange={this.handleToggle(d)}
                                                    checked={this.state.checked.indexOf(d) !== -1}
                                                    value="checkedA"
                                                />
                                                }
                                                label={<Typography style={styles.formControlLabel}>{d}</Typography>}
                                            />
                                        )
                                    })}
                                     </FormGroup>
                                     </div>    
                                     <div>
    
                                     </div>    
                            </div>
                            
                            {
                            leng<3?
    
                            <div>너무적어</div>:
                            <div style={{display:'flex',width:'100%',padding:20,backgroundColor:'#F4F5F7'}}>
                            <div style={{width:"40%"}}>

                          
                                    <div style={{display:'flex',backgroundColor:'#fff',margin:10,padding:30,borderRadius:50}}>
                                        
                                            <div style={{width:"40%",margin:20}}>
                                                <CircularProgressbarWithChildren 
                                                    value={this.state.Taa}
                                                    styles={buildStyles({
                                                        trailColor: '#F4F5F7',
                                                        pathColor: '#5a69bf',
                                                      })}
                                                    >
                                                    <div style={{textAlign:'center' }}>
                                                    <p style={{ fontSize: 15,marginBottom:-10}}>Today</p>                   
                                                    <strong style={{ fontSize: 35}}>{this.state.Taa}</strong> 
                                                    <strong style={{ fontSize: 20}}>%</strong> 
                                                    </div>
                                                </CircularProgressbarWithChildren>
                                            </div>
                                            <Divider orientation="vertical"/>
                                            <div style={{width:"40%",margin:20}}>
                                                <CircularProgressbarWithChildren 
                                                    value={this.state.Aaa}
                                                    styles={buildStyles({
                                                        trailColor: '#F4F5F7',
                                                        pathColor: '#5a69bf',
                                                      })}
                                                    >
                                                    <div style={{textAlign:'center' }}>
                                                    <p style={{ fontSize: 15,marginBottom:-10}}>Total</p>                   
                                                    <strong style={{ fontSize: 35}}>{this.state.Aaa}</strong> 
                                                    <strong style={{ fontSize: 20}}>%</strong> 
                                                    </div>
                                                </CircularProgressbarWithChildren>
                                            </div>
                                        
                                    </div>
                                    <div style={{margin:10,backgroundColor:'#fff'}}>
                                    <Tabs
                                        variant="fullWidth"
                                        value={this.state.listIndex}
                                        onChange={this.handleListChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                    >
                                        <Tab icon={<img width={50} height={50} src="trophy.png" alt="trophy" />}/>
                                        <Tab icon={<img width={50} height={50} src="alert.png" alt="alert" />} />
                                    </Tabs>
                                    <TabPanel value={this.state.listIndex} index={1}>
                                    {
                                                      one.map((d,i)=>{
                                                        return(
                                                            <List>
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                <Avatar>
                                                                    <AccountCircleIcon />
                                                                </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText 
                                                                primary={`${this.state.rating[d].name}(${this.state.rating[d].grade})`} 
                                                                secondary={`Today : ${this.state.rating[d].taa}/ Total : ${this.state.rating[d].aaa}`} />
                                                            </ListItem>
                                                            </List>
                                                        )
                                                    })
                                       }
                                    </TabPanel>
                                    <TabPanel value={this.state.listIndex} index={0}>
                                       {
                                                      two.map((d,i)=>{
                                                        return(
                                                            <List>
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                <Avatar>
                                                                    <AccountCircleIcon />
                                                                </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText 
                                                                primary={`${this.state.rating[d].name}(${this.state.rating[d].grade})`} 
                                                                secondary={`Today : ${this.state.rating[d].taa}/ Total : ${this.state.rating[d].aaa}`} />
                                                            </ListItem>
                                                            </List>
                                                        )
                                                    })
                                       }
                                    </TabPanel>                        
                                    </div>
                                    </div>
                            
                                <div style={{width:"60%"}}>
                                <Paper>
                                    <Tabs
                                        value={this.state.chartIndex}
                                        onChange={this.handleChartChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                    >
                                        <Tab label="daily"/>
                                        <Tab label="monthly"/>
                                    </Tabs>
                                    <TabPanel value={this.state.chartIndex} index={0}>
                                        <Chart data={this.state.DayChart}>
                                            <ArgumentAxis />
                                            <ValueAxis/>
                                            <BarSeries
                                                rotated={true}
                                                color='#5a69bf'
                                                valueField="assemble"
                                                argumentField="day"
                                            />
                                            <Animation />
                                        </Chart>
                                    </TabPanel>
                                    <TabPanel value={this.state.chartIndex} index={1}>
                                        <Chart data={this.state.MonthChart}>
                                            <ArgumentAxis />
                                            <ValueAxis/>
                                            <BarSeries
                                                rotated={true}
                                                color='#5a69bf'
                                                valueField="assemble"
                                                argumentField="month"
                                            />
                                            <Animation />
                                        </Chart>
                                    </TabPanel>                        
                                </Paper>
                                    
                                </div>
                                </div>
                    
                        } 
                    </div>
                            }
              
            </div>
            }
            <Footer/>
      </div>
    );
  }
}

const average = arr => {

    if(arr.length>0){
        return Math.round(arr.reduce( ( p, c ) => p + c, 0 ) / arr.length)
    }else if(arr.length ===1 ){
        return arr[0]
    }else{
        return 0
    }
};


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

export default MainConsole;


