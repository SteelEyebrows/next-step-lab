import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import {API, graphqlOperation } from 'aws-amplify';
import * as graphql from './graphql';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import moment from 'moment'
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '954aa91e',
  apiSecret: 'uVGSbCKUeetd59Lj',
});

const from = 'Nexmo';
const to = '821045261396';
const text = 'Hello from Nexmo';

export default function MultiAddStudent() {

      const generateRandom = (min, max) =>{
        var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
        return ranNum;
      }

      const csvTojson = (sender)=>{
            // check file extd
        var result = [];
        var reader = new FileReader();
        reader.readAsText(sender.target.files[0],'EUC-KR');
        reader.onload = (sender) => {
            //csv to json
            var data = sender.target.result;
                let lines = data.split(/\r\n|\n/);  // 줄바꿈으로 나눔
                    if(lines[0] ==="name,grade,class"){
                        var headers=lines[0].split(",");
                        for(var i=1;i<lines.length;i++){
                            var obj = {};
                            var currentline=lines[i].split(",");
                            for(var j=0;j<headers.length;j++){
                                obj[headers[j]] = currentline[j];
                            }
                            result.push(obj);
                        }
                        result.pop();
                        handleFileInput(JSON.stringify(result));
                    }else{
                        NotificationManager.error('Upload Success', `name,grade,class`,3000);   
                    }
      }
    }



      const handleFileInput =(e)=>{ //multiple

            let res = JSON.parse(e)
            let input_query =[]
            res.forEach((man,i)=>{
                
                let record = [];
                let nowMonth = Number(moment().format('MM'));
                let nowDay = Number(moment().format('DD'));
                for(let i=0;i<40;i++){
                    const d = Number(moment().subtract(i, 'day').format('DD'))
                    if(d>nowDay){
                        nowMonth = nowMonth -1
                    }
                    if(i>20){
                      record.push({
                        id:Math.random().toString(36).substring(7),
                        bookid:"4691a31b-b7e7-4bdf-b0f0-15c8731eef74",
                        month:nowMonth,
                        day: d,
                        words:"https://wowproject-wow.s3.amazonaws.com/demo/2020 VOCA2.json",
                        etc:generateRandom(0, 99)
                      }
                      );
                    }else{
                      record.push({
                        id:Math.random().toString(36).substring(7),
                        bookid:"aa3c5394-1161-4496-adb5-17cada2786d8",
                        month:nowMonth,
                        day: d,
                        words:"https://wowproject-wow.s3.amazonaws.com/demo/2020 VOCA.json",
                        etc:generateRandom(0, 99)
                      }
                      );
                    }
                      nowDay = d
                }

                input_query.push({
                    id: Math.random().toString(36).substring(7),
                    type: "student",
                    name: man.name,
                    grade:man.grade,
                    class:man.class,
                    words:[{
                      id:"4691a31b-b7e7-4bdf-b0f0-15c8731eef74",
                      name:"2020 VOCA2.json",
                      link:"https://wowproject-wow.s3.amazonaws.com/demo/2020 VOCA2.json",
                      haveto:100,
                      due: "2020-03-10/2020-03-17"
                  },{
                    id:"aa3c5394-1161-4496-adb5-17cada2786d8",
                    name:"2020 VOCA.json",
                    link:"https://wowproject-wow.s3.amazonaws.com/demo/2020 VOCA.json",
                    haveto:120,
                    due: "2020-03-07/2020-03-15"
                }],
                   record:record 
                  });
              
                  // API.graphql(graphqlOperation(graphql.createStudent, {input: input_query}))
          });

          input_query.forEach(async(query,i) =>{
            await API.graphql(graphqlOperation(graphql.createStudent, {input: query})).then(result=>{
              if(input_query.length-1===i){
                NotificationManager.success('Upload Success', `${input_query[0].name} 이외 ${input_query.length}명이 저장 되었습니다.`,3000);  
              }
            })
          })
          window.location.reload();
    }

    return (
        <div>
          <NotificationContainer/>
            <input id="contained-button-file" style={{display:'none'}} type="file" onChange={csvTojson}  name="file" accept=".csv"/>
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                      Multiple
                    </Button>
                  </label>
                  
        </div>
      );

}