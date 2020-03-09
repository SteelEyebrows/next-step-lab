import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DescriptionIcon from '@material-ui/icons/Description';
import { Paper } from '@material-ui/core';
import {API, graphqlOperation } from 'aws-amplify';
import * as graphql from './graphql';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Confirm from './confirmreq'

export default function DeleteListComp(props) {
  const [dense, setDense] = React.useState(false);



const updateDeleted = async(query) =>{
    await API.graphql(graphqlOperation(graphql.updateWord, {input: query})).then(r =>{
        NotificationManager.success('delete Success', `${IDBIndex} 단어장이 삭제 되었습니다`,3000);
    });
    window.location.reload();
}

const handleAllDelete = async(id) =>{

        await API.graphql(graphqlOperation(graphql.deleteWord, {input: {
            id: id,
            deleted:true
          }}))
          
        await API.graphql(graphqlOperation(graphql.studentsWords)).then(data =>{
            data.data.listMyTypes.items.map((d,i)=>{
                if(d.words !==null){
                    let temp = d.words.find(x=>x.id !== id);
                    let input_query={
                        id: d.id,
                        words:temp 
                    }
                    updateDeleted(input_query);
                }
            })
        });
}

const handleDeletefor = async(word,man) =>{

  await API.graphql(graphqlOperation(graphql.studentsWords)).then(data =>{
    // alert(JSON.stringify(data))
      data.data.listMyTypes.items.map((d,i)=>{
        if(d.id ===man){
          if(d.words !==null){
            let temp = d.words.find(x=>x.id !== word);
            let input_query={
                id: d.id,
                words:temp 
            }
            // alert(JSON.stringify(input_query))
            updateDeleted(input_query);
        }
        }
      })
  });
}

const handleDelete = (id,data) =>{
    data.forEach(d =>{
      handleDeletefor(id,d.id)
    })
}

  return (
    <Paper elevation={3}>
        <NotificationContainer/>
            <List dense={dense}>
            {
              props.CommonWords.map((data,i)=>{
                  let secondary = [];
                   data.common.map(one=> secondary.push(` ${one.name} `))
                    return(
                        <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <DescriptionIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={data.name}
                          secondary={secondary}
                        />
                        <ListItemSecondaryAction>
                          <div style={{display:'flex'}}>
                            <Confirm button="delete" title="delete" content={`${secondary}학생의 ${data.name}을 삭제하겠습니까?`} send={()=>handleDelete(data.id,data.common)}/>
                            <Confirm button="delete All" title="delete" content={` ${data.name}을 가진 모든 학생에게서 ${data.name}을 삭제하겠습니까?`} send={()=>handleAllDelete(data.id)}/>
                          </div>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                })      
            }
            </List>
            </Paper>
  );
}

                      
                        // <div style={{display:'flex'}}>
                        //     <div style={{width:80,margin:10}}>
                        //         {data.name}
                        //     </div>
                        //     <div style={{display:'flex'}}>
                        //         {
                        //             data.common.map((one,i)=>{
                        //                 return(
                        //                 <div style={{margin:10}}>{one.name}</div>
                        //                 );
                        //             })
                        //         }
                        //     </div>
                        // </div>