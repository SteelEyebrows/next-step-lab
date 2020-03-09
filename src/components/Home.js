import React, { Fragment } from 'react';
import Hero from './Hero';
import Button from '@material-ui/core/Button';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import ReactFullpage from '@fullpage/react-fullpage';
import ScrollAnimation from 'react-animate-on-scroll';


export default class Home extends React.Component {
  onLeave(origin, destination, direction) {
    console.log("Leaving section " + origin.index);
  }
  afterLoad(origin, destination, direction) {
    console.log("After load: " + destination.index);
  }
  render() {
    return (
      <ReactFullpage
        scrollOverflow={true}
        sectionsColor={["#fff", "#fff", "#fff"]}
        onLeave={this.onLeave.bind(this)}
        afterLoad={this.afterLoad.bind(this)}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage-wrapper">
              <div align="center" className="section section1">
                <div style={{padding:80}} >
                <ScrollAnimation animateIn='fadeIn'animateOnce={false}>

                <h1 style={{color:'#5a69bf'}}>새로운 영어학습의 시작</h1>
                </ScrollAnimation>
                  
                  <img style={{height:400}} src="mainimage2.png" alt="conserve energy" />
                </div>
              </div>
              <div className="section">
              <div style={{height:700}} align="center" >
                    <img style={{height:500}} src="선생님효과.png" alt="teacher"/>
              </div>
              </div>
              <div className="section">
                <IconTabs/>
              </div>
            </div>
          );
        }}
      />
    );
  }
}


// export default function Home() {
//   return (
//     // <Fragment>
//     //   <section>
//     //       <div style={{width:"100%"}}>
//     //         <br/>
//     //         <br/>
//     //         <br/>
//     //         <br/>
//     //         <br/>
//     //         <div style={{width:"100%",backgroundColor:"#fff",justifyContents:'center'}}>

//     //              <div align="center">
//     //                  <h1 style={{color:'#5a69bf'}}>새로운 영어학습의 시작</h1>
//     //                 <img style={{marginBottom:-6,width:800}} src="mainimage2.png" alt="conserve energy" />
//     //              </div>
//     //       </div>
//     //       </div>
//     //     </section>
//     //     <section>
//     //       <div style={{height:700}} align="center" >
//     //               <img width={1000} height={700} src="선생님효과.png" alt="teacher"/>
//     //       </div>
//     //     </section>
//     //   <section className="container">
//     //     <div className="columns features">
//     //         <div className="column is-4">
//     //             <div className="card is-shady">
//     //                 <div className="card-content">
//     //                     <div className="content">
//     //                         <h4>Energy conservation</h4>
//     //                         <p>Purus semper eget duis at tellus at urna condimentum mattis. Non blandit massa enim nec. Integer enim neque volutpat ac tincidunt vitae semper quis. Accumsan tortor posuere ac ut consequat semper viverra nam.</p>
//     //                         <p><a href="/">Learn more</a></p>
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </div>
           
//     //         <div className="column is-4">
//     //             <div className="card is-shady">
//     //                  <div className="card-content">
//     //                     <div className="content">
//     //                         <h4>처음오셨나요?</h4>
//     //                         <p>샘플버전을 무료로 제공해드립니다! 한번 경험해보세요! </p>
//     //                         <Button href="/Sample" style={{backgroundColor:'#5a69bf'}} variant="contained" color="primary" disableElevation>
//     //                              Sample Now!
//     //                         </Button>
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //     </div>
//     // </section>
//     // <IconTabs/>
//     // <Footer/>
//     // </Fragment>
  
//   )
// }


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
  
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  


const useStyles = makeStyles({
    root: {
      flexGrow: 1,

    },
  });
 
function IconTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const handleChangeIndex = index => {
        setValue(index);
      };
    return (
        <div >
      <Paper elevation={0} square className={classes.root}>
        <Tabs
        centered
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="icon tabs example"
        >
          <Tab icon={<img width={100} height={100} src="1.png" alt="11111" />}  {...a11yProps(0)} aria-label="phone" />
          <Tab icon={<img width={100} height={100} src="2.png" alt="22222" />}  {...a11yProps(1)} aria-label="favorite" />
          <Tab icon={<img width={100} height={100} src="3.png" alt="33333" />}  {...a11yProps(2)} aria-label="person" />
        </Tabs>
      </Paper>
      <SwipeableViews
        axis={'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
            <div align="center" style={{height:500}}>
                <img style={{height:500}} src="effect1.png" alt="effect1" />
            </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
            <div align="center" style={{height:500}}>
                <img style={{height:500}} src="effect2.png" alt="effect2" />
            </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div align="center" style={{height:500}}>
                <img style={{height:500}} src="effect3.png" alt="effect3" />
            </div>
      </TabPanel>
      </SwipeableViews>
      </div>
    );
  }