import React from 'react';
import Button from '@material-ui/core/Button';

export default function Hero(props) {
  switch(props.type) {
    case 0:
      return  (
        <section>
          <div >
            <div style={{width:"100%",backgroundColor:"#fff",objectFit:'cover'}}>
              <img src="wordsetting.jpg" alt="conserve energy" />
            </div>
          </div>
        </section>
      );
      case 1:
        return  (
          <section>
            <div >
              <div style={{width:"100%",backgroundColor:"#fff",objectFit:'cover'}}>

                <img src="stu.jpg" alt="conserve energy" />
              </div>
            </div>
          </section>
        ) 
      case 2:
        return  (
          <section>
            <div >
              <div style={{width:"100%",backgroundColor:"#fff",objectFit:'cover'}}>

                <img src="login.jpg" alt="conserve energy" />
              </div>
            </div>
          </section>
        ) 
    default:
      return (
        <section>
          <div style={{width:"100%"}}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div style={{width:"100%",backgroundColor:"#fff",display:'flex'}}>
          <div >
          <Button href="/Sample" style={{backgroundColor:'#010101'}} variant="contained" color="primary" disableElevation>
                                 Sample Now!
                            </Button>
            </div>
            <div >
              <img style={{marginBottom:-6,marginLeft:"50%"}} width="40%" src="gg.gif" alt="conserve energy" />
            </div>
          </div>
          </div>
        </section>
      )
  }
}
