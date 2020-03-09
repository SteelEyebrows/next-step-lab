import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {  buildStyles,CircularProgressbarWithChildren } from 'react-circular-progressbar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditStudent from './editstudent'
import TotalChart from './totalchart';



const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '50%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function DetailedExpansionPanel(props) {
  const classes = useStyles();
  const [selected, setselected] = React.useState('');
  let Tavg = 0;
  let Aavg = 0;
  const words = props.All.find(x => x.id === props.id).words;
  
  if(props.TodayAssemble.length >0){
    Tavg =props.TodayAssemble.reduce((accumulator, currentValue) => accumulator + currentValue)/props.TodayAssemble.length;
  }
  if(props.AllAssemble.length>0){
    Aavg =props.AllAssemble.reduce((accumulator, currentValue) => accumulator + currentValue)/props.AllAssemble.length;
  }

  // alert(props.record)
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div styles={{width:50}} className={classes.column}>
            <Typography className={classes.heading}>{props.name}</Typography>
          </div>
          <div style={{display:'flex'}} className={classes.column}>

              <div style={{width:100}}>
              <CircularProgressbarWithChildren value={Math.round(Tavg)}>
                <div style={{textAlign:'center' }}>
                  <p style={{ fontSize: 15,marginBottom:-10}}>Today</p>                   
                  <strong style={{ fontSize: 35}}>{Math.round(Tavg)}</strong> 
                  <strong style={{ fontSize: 20}}>%</strong> 
                </div>

              </CircularProgressbarWithChildren>
              </div>

              <div style={{width:100,marginLeft:30}}>
              <CircularProgressbarWithChildren 
              styles={buildStyles({
                textColor: '#DC2C1A',
                pathColor: '#5a69bf',
                backgroundColor: '#DC2C1A',
                })} value={Math.round(Aavg)}>
                <div style={{textAlign:'center' }}>
                  <p id="pfont" style={{ fontSize: 15,marginBottom:-10}}>Total</p>                   
                  <strong style={{ fontSize: 35,color:'#5a69bf'}}>{Math.round(Aavg)}</strong> 
                  <strong style={{ fontSize: 20,color:'#5a69bf'}}>%</strong> 
                </div>
              </CircularProgressbarWithChildren>
              </div>

          </div>
        </ExpansionPanelSummary>

        {words !== null?
        <ExpansionPanelDetails className={classes.details}>
          <div style={{width:'100%'}}>
            <TotalChart
              words={words}
              record={props.record}
              homework={props.homework}
              test={props.test}
            />
          </div>
        </ExpansionPanelDetails>
        :
        <div></div>
        }
        <Divider />
        <ExpansionPanelActions>
          
          <EditStudent id={props.id} All={props.All}/>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

