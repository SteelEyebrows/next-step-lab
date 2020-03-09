import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Sparklines, SparklinesBars } from 'react-sparklines';

const average = arr => {
    if(arr.length>0){
        return Math.round(arr.reduce( ( p, c ) => p + c, 0 ) / arr.length)
    }else if(arr.length ===1 ){
        return arr[0]
    }else{
        return 0
    }
};

export default class DetailMoreStudent extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          loading:true,  
          expanded:false,
          dialog:false,
          words:this.props.words,
          weekly:this.props.weekly,
          detaila:null
         };
    };

    handleChange = panel => (event, isExpanded) => {
      this.setState({expanded:isExpanded ? panel : false});
    };
    handleClickOpen = () => {
        this.setState({dialog:true})
      };
    
    handleClose = () => {
        this.setState({dialog:false})
      };

    componentDidMount =()=>{
        let app =[];
        let homework =[];
        let test =[];

        this.props.weekly.forEach(x=>{
            let aa = x.detaila.map(a=>a.etc);
            app.push(average(aa))
        })
        alert(JSON.stringify(app))
        this.setState({detaila:app,loading:false})
      }

    render(){
        return (
            <div>
                {
                    this.state.loading?
                    <div></div>:
                    <div>
                        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                            More
                        </Button>
                        <Dialog
                            open={this.state.dialog}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >

                            <DialogContent>
                                <div style={{width:100,height:20}}>

                                        <Sparklines width={100} height={20} data={this.state.detaila}>
                                            <SparklinesBars color="blue"/>
                                        </Sparklines>
                                </div>
                                <div style={{width:100,height:20}}>

                                        <Sparklines width={100} height={20} data={this.state.detaila}>
                                            <SparklinesBars color="blue"/>
                                        </Sparklines>
                                </div>                                
                                <div style={{width:100,height:20}}>
                                        <Sparklines width={100} height={20} data={this.state.detaila}>
                                            <SparklinesBars color="blue"/>
                                        </Sparklines>
                                </div>                              
                                {
                                    this.state.words.map((x,i)=>{
                                        return(
                                            <div>
                                                <ExpansionPanel expanded={this.state.expanded === x.id} onChange={this.handleChange(x.id)}>
                                                <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1bh-content"
                                                    id={x.id}
                                                >
                                                    <Typography>{x.name}</Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography>
                                                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                                    maximus est, id dignissim quam.
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                                </ExpansionPanel>
                                            </div>
                                        )
                                    })
                                }
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={this.handleClose} color="primary" autoFocus>
                                Agree
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                }
    </div>
        );
    }
    
  }