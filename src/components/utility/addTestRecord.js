import React from 'react';
import {API, graphqlOperation } from 'aws-amplify';
import * as graphql from './graphql';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import IconButton from '@material-ui/core/IconButton';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

export default function HandleTestRecord() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

      const csvTojson = (sender)=>{
            // check file extd
        var result = [];
        var reader = new FileReader();
        reader.readAsText(sender.target.files[0],'EUC-KR');
        reader.onload = (sender) => {
            //csv to json
            var data = sender.target.result;
                let lines = data.split(/\r\n|\n/);  // 줄바꿈으로 나눔
  
                    if(lines[0] ==="name,id,test,score,month,day"){
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
                        NotificationManager.error('Upload Success', `name,assignment,done,date`,3000);   
                    }
      }
    }


    const save = async(query) =>{
        await API.graphql(graphqlOperation(graphql.updateTestRecord, {input: query})).then(r =>{
            console.log(r);
         });
    }

      const handleFileInput = async(e)=>{ //multiple

            let res = JSON.parse(e)

            let stackid =[];

            for(let i =0;i<res.length-1;i++){
                if(stackid.includes(res[i].id)){

                }else{
                    let input_query=undefined;
                         
                    await API.graphql(graphqlOperation( `
                         query list{
                             listMyTypes(filter:{id:{contains:"${res[i].id}"}}){
                               items{
                                 id test{id name score month day}
                               }
                             }
                           }`)).then(r =>{
                            
                             let Data = r.data.listMyTypes.items[0].test

                             const filtered = res.filter(x=>x.id === res[i].id)
                             const arrayObj = filtered.map(man => {
                                     return {
                                         id:Math.random().toString(36).substring(7),
                                         name:man.test,
                                         score:man.score,
                                         month:man.month,
                                         day:man.day
                                     };
                                   });
                                   
                            if(Data !== null){     
                                input_query={
                                    id:res[i].id,
                                    test:Data.concat(arrayObj)
                                }
                            }else{
                                input_query={
                                    id:res[i].id,
                                    test:arrayObj
                                }
                            }  
                           
                            save(input_query)
                            NotificationManager.success('Upload Success', `${res[i].name} 외 ${arrayObj.length}개의 숙제결과가 저장 되었습니다`,3000);
                        })     
                        stackid.push(res[i].id)
                }
            }
    }

    return (
        <div>
          <NotificationContainer/>
          <Tooltip title="Add Test" arrow>
                <IconButton onClick={handleClickOpen} color="primary" aria-label="upload homeworkDialog" component="span">
                <NoteAddIcon size="large" style={{ color: '#5a69bf' }}/>
                </IconButton>
                </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <img src="testmanual.png" alt="students setting"/>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <input onChange={csvTojson}  name="file" accept=".csv"  style={{display:'none'}} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <Button color="primary" aria-label="upload picture" component="span">
                            Upload
                        </Button>
                    </label>
                </DialogActions>
            </Dialog>
        </div>
      );

}