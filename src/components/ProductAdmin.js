import React from 'react'
import {API, graphqlOperation,Storage } from 'aws-amplify';
import Products from './Products'

const query=`
query list{
  listMyTypes(filter:{type:{contains:"word"}}){
    items{
      id type name grade percentage words
    }
  }
}
`


const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
  <input style={{display:'none'}} type={type} name={name} checked={checked} onChange={onChange} />
);

export default class ProductAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: new Map(),
      checkboxes:[]
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked; 

    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }


  callChecked=()=>{
    let checkedlist =[];
    this.state.checkedItems.forEach((value,key)=>{
      if(value === true){
        checkedlist.push(key);
      }
     });
     alert(checkedlist);
  }


  componentDidMount = async() => {
    await API.graphql(graphqlOperation(query)).then(data =>{
      let tempBox = [];
      data.data.listMyTypes.items.map((comp,i)=>{
        // alert(JSON.stringify(comp))
        let groupComp ={
          name: comp.name,
          key: comp.name,
          label: comp.name
        }
        tempBox.push(groupComp);
    })
    this.setState({checkboxes:tempBox})
    Storage.put('test.txt', 'Hello')
    .then (result => console.log(result)) // {key: "test.txt"}
    .catch(err => console.log(err));
    return "";  
  })
  }


  render() {
    return (
      <React.Fragment>
        <div style={{display:'flex'}}>

        {
         this.state.checkboxes.map(item => (
            <label key={item.key}>
              <div style={{backgroundColor:this.state.checkedItems.get(item.name)?"red":"blue", margin:10}} >{item.name}</div>
              <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleChange} />
            </label>
          ))
        }
        </div>
        <Products/>
      </React.Fragment>
    );
  }
}