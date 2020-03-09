import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import AboutMultiple from './AboutFunction';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function InfoExpansionPanel(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel elevation={0}>
        <ExpansionPanelSummary
          expandIcon={<ContactSupportIcon style={{ color: '#5a69bf' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {props.content}
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
            <AboutMultiple buttontitle={props.buttontitle} content={props.buttoncontent}/>
        </ExpansionPanelActions>
      </ExpansionPanel>
 </div>
  );
}