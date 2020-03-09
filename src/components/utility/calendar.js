import React from "react";
import * as dateFns from "date-fns";
import './calendar.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import moment from 'moment'

class Calendar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            record:this.props.record,
            selectedWord:'',
            wordbooks:[],
            loading:true
          };
    }

    handleWordBook=()=>{
      let wordbooks = [];
      this.state.record.map((d,i)=>{
          if(wordbooks.indexOf(d.words)===-1 || wordbooks.length === 0){
            wordbooks.push(d.words)
          }
      });
      this.setState({wordbooks:wordbooks,loading:false})
    }


    renderHeader() {
        return (
          <div className="header row flex-middle">
            <div className="col col-start">
              <div className="icon" onClick={this.prevMonth}>
                chevron_left
              </div>
            </div>
            <div className="col col-center">
            <span>{dateFns.format(this.state.currentMonth, "MM")}</span>
            </div>
            <div className="col col-end" onClick={this.nextMonth}>
              <div className="icon">chevron_right</div>
            </div>
          </div>
        );
      }
  
      renderDays() {
        const days = [];
        const a = ["일","월","화","수","목","금","토"]
        for (let i = 0; i < 7; i++) {
          days.push(
            <div className="col col-center" key={i}>
              {a[i]}
            </div>
          );
        }
        return <div className="days row">{days}</div>;
      }
  
      renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
    
        const dateFormat = "d";
        const rows = [];
    
        let days = [];
        let day = startDate;
        let formattedDate = "";

        let thisMonthRecord = [];

        if(this.state.record.length !== 0 || this.state.record !== null){
          this.state.record.map((d,i)=>{
            if(d.month === Number(dateFns.format(this.state.currentMonth, "MM"))){
              if( d.words=== this.state.selectedWord){
                thisMonthRecord.push(d)
              }
            }
        })
        }

        while (day <= endDate) {           
          for (let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, dateFormat);//now
            
            //같은 달 중에 날짜가 같은것
            let index =thisMonthRecord.findIndex(x => x.day === Number(formattedDate));

            if(index!==-1 && thisMonthRecord[index].month === Number(dateFns.format(this.state.currentMonth, "MM"))){
                days.push(
                    <div
                      className={`col cell ${
                        !dateFns.isSameMonth(day, monthStart)
                          ? "disabled"
                          : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                      }`}
                      key={day}
                    >
                      <div style={{width:"70%"}}>

                          <CircularProgressbar
                          value={thisMonthRecord[index].etc}
                          text={`${thisMonthRecord[index].etc}`}
                          background
                          backgroundPadding={6}
                          styles={buildStyles({
                            textSize: '30px',
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent",
                          })}
                        />
                    </div>
                    </div>
                  );
                  day = dateFns.addDays(day, 1);
                  
            }else{//original
                days.push(
                    <div
                      className={`col cell ${
                        !dateFns.isSameMonth(day, monthStart)
                          ? "disabled"
                          : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                      }`}
                      key={day}
                    >
                      <span className="number">{formattedDate}</span>
                      <span className="bg">{formattedDate}</span>
                    </div>
                  );
                  day = dateFns.addDays(day, 1);
            }
                 
          }
          rows.push(
            <div className="row" key={day}>
              {days}
            </div>
          );
          days = [];
        }
        return <div className="body">{rows}</div>;
      }
  
      onDateClick = day => {
        this.setState({
          selectedDate: day
        });
      };
    
  
    nextMonth = () => {
        this.setState({
          currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
        });
      };
      prevMonth = () => {
        this.setState({
          currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
        });
      };
     
      handleChange = event => {
       this.setState({selectedWord:event.target.value});
      };
      
      componentDidMount=()=>{
        this.handleWordBook()
      }


    render() {
      const words = this.props.words.map(x=>{return x.name})
      return (
        <div className="calendar">
           {
             this.state.loading?
             <div>
               loading
             </div>
             :
             <div>
       <FormControl style={{width:"100%"}}>
        <Select value={this.state.selectedWord} onChange={this.handleChange} displayEmpty>
          <MenuItem value="" disabled>
            Select
          </MenuItem>
          {
            words.map((d,i)=>{
              return(
              <MenuItem value={d}>{d.replace(".json","")}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
             </div>
           }
        </div>
      );
    }
  }
  
  
  export default Calendar;