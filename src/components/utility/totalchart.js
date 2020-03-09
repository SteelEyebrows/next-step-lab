
  
  import * as React from 'react';
  import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    LineSeries,
    Legend,BarSeries,
  } from '@devexpress/dx-react-chart-material-ui';


  import { Animation,EventTracker,SelectionState,Stack } from '@devexpress/dx-react-chart';
  import {
    curveCatmullRom,
    line,
  } from 'd3-shape';
  import moment from 'moment'
  import DateRangePicker from "react-daterange-picker";
  import Dialog from '@material-ui/core/Dialog';
  import DialogActions from '@material-ui/core/DialogActions';
  import DialogContent from '@material-ui/core/DialogContent';
  import Button from '@material-ui/core/Button';
  import { withStyles } from '@material-ui/core/styles';
  import CustomizedTabs from './perWeekTabs'
  import DetailMoreStudent from './detailmorestudent'
  const Line = props => (
    <LineSeries.Path
      {...props}
      path={line()
        .x(({ arg }) => arg)
        .y(({ val }) => val)
        .curve(curveCatmullRom)}
    />
  );
  
  const legendStyles = () => ({
    root: {
      display: 'flex',
      margin: 'auto',
      flexDirection: 'row',
    },
  });
  const legendLabelStyles = theme => ({
    label: {
      marginBottom: theme.spacing(1),
      whiteSpace: 'nowrap',
    },
  });
  const legendItemStyles = () => ({
    item: {
      flexDirection: 'column-reverse',
    },
  });
  
  const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
  );
  const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
  );
  const legendItemBase = ({ classes, ...restProps }) => (
    <Legend.Item className={classes.item} {...restProps} />
  );
  const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
  const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
  const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);



  const compare = (
    { series, point }, { series: targetSeries, point: targetPoint },
  ) => series === targetSeries && point === targetPoint;


  export default class TotalChart extends React.PureComponent {
    constructor(props) {
      super(props);
  
      this.state = {
        loading:false,
        calendarValue: moment(),//calendar
        selection: [],
        calendarOpen:false,
        selected:0,
        daychart:undefined,
        weekly:[],
        };


        this.click = ({ targets }) => {
          const target = targets[0];
          if (target) {
          if(target.point!==undefined){
              this.setState(({ selection,daychart }) => ({
                selection: selection[0] && compare(selection[0], target) ? [] : [target],
                selected:target.point
              }));
            }
          }
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
        this.forWeekChart()
      };//calendar

    
      forWeekChart=()=>{
        const yyyy = Number(this.state.calendarValue.format("YYYY"));
        const mm = Number(this.state.calendarValue.format("MM"));
        const dd = Number(this.state.calendarValue.format("DD"));
  
        const record = this.props.record
        const homework = this.props.homework
        const test = this.props.test
        let count = 0;
        let weekly = [
          {month:0,week:0,arg:'', app:[],homework:[],test:[], detaila:[],detailh:[],detailt:[]},
          {month:0,week:0,arg:'', app:[],homework:[],test:[], detaila:[],detailh:[],detailt:[]},
          {month:0,week:0,arg:'', app:[],homework:[],test:[], detaila:[],detailh:[],detailt:[]},
          {month:0,week:0,arg:'', app:[],homework:[],test:[], detaila:[],detailh:[],detailt:[]},
          {month:0,week:0,arg:'', app:[],homework:[],test:[], detaila:[],detailh:[],detailt:[]},
          {month:0,week:0,arg:'', app:[],homework:[],test:[], detaila:[],detailh:[],detailt:[]},
          {month:0,week:0,arg:'', app:[],homework:[],test:[], detaila:[],detailh:[],detailt:[]},
          {month:0,week:0,arg:'', app:[],homework:[],test:[], detaila:[],detailh:[],detailt:[]},
          {month:0,week:0,arg:'', app:[],homework:[],test:[], detaila:[],detailh:[],detailt:[]},

      ];
        let td = moment([yyyy, mm, dd]);

        let m =0;
        let d =0;
        let w =0;
        let index=0;
        let perRecord1 = []
        let perRecord2 = []
        let perHomework1 = []
        let perHomework2 = [];
        let percentage =0
        let perTest1 = []
        let perTest2 = []

        for(let i=40;i>-1;i--){

          m = moment(td).subtract(i, 'day').subtract(1, 'month').format('MM')
          d = moment(td).subtract(i, 'day').format('DD')
          w = weekOfMonth(moment(`${d}/${m}/2020`, "DD/MM/YYYY"))
          
          if(isNaN(w)===false){
            // alert(`${m}월${d}일 // ${JSON.stringify(weekly[index])}`);
            m=Number(m)
            d=Number(d)
            index = weekly.findIndex(x=>x.month === m&&x.week ===w);
  
            if(index===-1){
              count++
              index = count
              weekly[index].month = m; 
              weekly[index].week = w;
              weekly[index].arg =`${m}월${w}주`
            }
  
            if(record !==null){
                perRecord1 = record.filter(x=>x.month===m && Number(x.day)===d);
                perRecord2 = perRecord1.map(x => x.etc)
                weekly[index].detaila=weekly[index].detaila.concat(perRecord1);
                weekly[index].app=weekly[index].app.concat(perRecord2);
            }
              
            if(homework!==null){
                perHomework1 = homework.filter(x=>Number(x.month)===m && Number(x.day)===d)
                perHomework2 = perHomework1.map(x => {
                percentage = Math.round((x.done/x.assignment)*100)
                  return percentage
                });
                weekly[index].detailh=weekly[index].detailh.concat(perHomework1);
                weekly[index].homework=weekly[index].homework.concat(perHomework2);
            }
              
             if(test!==null){
                perTest1 = test.filter(x=>x.month===m && Number(x.day)===d)
                perTest2 = perTest1.map(x => {
                  return x.score
                });
                weekly[index].detailt=weekly[index].detailt.concat(perTest1);
                weekly[index].test=weekly[index].test.concat(perTest2);
             }   

          }
      }
      
      weekly.forEach((x,i)=>{
        weekly[i].app = average(x.app)
        weekly[i].homework = average(x.homework)
        weekly[i].test = average(x.test)
      })

      this.setState({weekly:weekly,loading:true})
      }
    
      forDayChart=(y,m,d)=>{
      let tendays = [];
      let td = [y, m, d];
      for(let i=9;i>-1;i--){
          const d = moment(td).subtract(i, 'day').format('DD')
          tendays.push(d);
      }
      
      return tendays
    }//for day chart 1
    
    updateAll=(y,m,d)=>{
      const record = this.props.record
      const homework = this.props.homework
      const test = this.props.test

    
      const fordaychart = this.forDayChart(y,m,d);
      
      let DayChart = [
        {day:null,app:[],homework:[],test:[],info:{homework:[],record:[],test:[]}},
        {day:null,app:[],homework:[],test:[],info:{homework:[],record:[],test:[]}},
        {day:null,app:[],homework:[],test:[],info:{homework:[],record:[],test:[]}},
        {day:null,app:[],homework:[],test:[],info:{homework:[],record:[],test:[]}},
        {day:null,app:[],homework:[],test:[],info:{homework:[],record:[],test:[]}},
        {day:null,app:[],homework:[],test:[],info:{homework:[],record:[],test:[]}},
        {day:null,app:[],homework:[],test:[],info:{homework:[],record:[],test:[]}},
        {day:null,app:[],homework:[],test:[],info:{homework:[],record:[],test:[]}},
        {day:null,app:[],homework:[],test:[],info:{homework:[],record:[],test:[]}},
        {day:null,app:[],homework:[],test:[],info:{homework:[],record:[],test:[]}},
        ]

        fordaychart.forEach((day,i)=>{
          if(DayChart[i].day ===null){DayChart[i].day = day;}
          // record.forEach(x=> alert(`${x.day}   ${day}  ${Number(x.day)===Number(day)}`  ))
         
          let perRecord = record.filter(x=>x.month===m && Number(x.day)===Number(day)).map(x => x.etc);
          DayChart[i].app=DayChart[i].app.concat(perRecord);
          

          let perHomework = homework.filter(x=>x.month===m && Number(x.day)===Number(day)).map(x => {
            const percentage = Math.round((x.done/x.assignment)*100)
            DayChart[i].info.homework.push({name:percentage,percentage:percentage});
            return percentage
          });
          DayChart[i].homework=DayChart[i].homework.concat(perHomework);
          

          let perTest = test.filter(x=>x.month===m && Number(x.day)===Number(day)).map(x => {
            DayChart[i].info.test.push({name:x.score,score:x.score});
            return x.score
          });
          DayChart[i].test=DayChart[i].test.concat(perTest);
          
          
      })

      this.setState({daychart:DayChart,loading:true})
    }




    componentDidMount=()=>{
      this.forWeekChart()
    }

  

    render() {
      const {weekly: chartData,selection,selected} = this.state;

      return (
            <div>
            {
              this.state.loading?
              <div style={{display:'flex'}}>
                <div style={{width:400}}>
                  
                  <div style={{margin:20}}>
                                        {/* <DetailMoreStudent words={this.props.words} weekly={chartData}/> */}
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
              <Chart
                data={chartData}
              >
                <ArgumentAxis />
                <ValueAxis />
                <BarSeries
                name="homework"
                color='#F4F5F7'
                valueField="homework"
                argumentField="arg"
              />
                <BarSeries
                name="app"
                color='#5a69bf'
                valueField="app"
                argumentField="arg"
              />
                <LineSeries
                  name="test"
                  color='#ddd'
                  valueField="test"
                  argumentField="arg"
                  seriesComponent={Line}
                />
              
                <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
                <Animation />
                <Stack />
                <EventTracker onClick={this.click} />
                <SelectionState selection={selection} />

              </Chart>
                </div>
                <div style={{width:300}}>
                <CustomizedTabs data={chartData[selected]}/>
                </div>
               
              </div>
              :<div>
                <p>loading</p>
              </div>
            }
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

  function weekOfMonth (input) {
    const firstDayOfMonth = input.clone().startOf('month');
    const firstDayOfWeek = firstDayOfMonth.clone().startOf('week');
    const offset = firstDayOfMonth.diff(firstDayOfWeek, 'days');
  
    return Math.ceil((input.date() + offset) / 7);
  }