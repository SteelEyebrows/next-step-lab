import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import NoteAddIcon from '@material-ui/icons/NoteAdd'; //test
import PostAddIcon from '@material-ui/icons/PostAdd'; //test
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import { Scrollbars } from 'react-custom-scrollbars';

import Box from '@material-ui/core/Box';
const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#5a69bf',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 50,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#5a69bf',
      opacity: 1,
    },
    '&$selected': {
      color: '#5a69bf',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#5a69bf',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
}));

export default function CustomizedTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const data = props.data===[]?[]:props.data;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const detaila = data.detaila===undefined?[]:data.detaila;
  const detailh = data.detailh===undefined?[]:data.detailh;
  const detailt = data.detailt===undefined?[]:data.detailt;

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab  icon={<PhoneAndroidIcon />} {...a11yProps(0)} />
          <AntTab  icon={<NoteAddIcon />}  {...a11yProps(1)} />
          <AntTab  icon={<PostAddIcon />}  {...a11yProps(2)}/>
        </AntTabs>
    </div>
    <div>
                  <TabPanel value={value} index={0}>
                   
                    <Scrollbars style={{ height: 500 }}>
                    {
                        detaila.map(x=>{
                            return(
                            <ListItem>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                            <ListItemText primary={x.words.replace("https://wowproject-wow.s3.amazonaws.com/demo/","").replace(".json","")} secondary={x.etc} />
                            </ListItem>
                            )
                        })
                    }
                    </Scrollbars>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                  <Scrollbars style={{ height: 500 }}>
                    {
                        detailh.map(x=>{
                            return(
                            <ListItem>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                            <ListItemText primary={x.name} secondary={x.done} />
                            </ListItem>
                            )
                        })
                    }
                    </Scrollbars>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                  <Scrollbars style={{ height: 500 }}>
                    {
                        detailt.map(x=>{
                            return(
                            <ListItem>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                            <ListItemText primary={x.name} secondary={x.score} />
                            </ListItem>
                            )
                        })
                    }
                   </Scrollbars>
                  </TabPanel>
                </div>
      </div>

  );
}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
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
        {value === index && <Box>{children}</Box>}
      </Typography>
    );
  }
  