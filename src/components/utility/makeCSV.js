import React from 'react';
import MaterialTable from 'material-table';

export default function MakeCsvPage() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'full ID', field: 'id' },
      { title: 'homework', field: 'homework' },
      { title: 'assignment', field: 'assignment', type: 'numeric' },
      { title: 'done', field: 'done', type: 'numeric' },
      { title: 'month', field: 'month', type: 'numeric' },
      { title: 'day', field: 'day', type: 'numeric' },
    ],
    data: [
      { name: 'Mehmet', id: 'Baran', homework: 1987, assignment: 63,done:73,month:7,day:28 },
      
    ],
  });

  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}

// import React from 'react';
// import {CSVLink} from "react-csv";

// const columns = [
//    {
//        Header: 'name',
//        accessor: 'name', // String-based value accessors!
//    },
//    {
//        Header: 'age',
//        accessor: 'age',

//   }]
// export default class MakeCsvPage extends React.Component {
//     constructor(props) {
//        super(props);
//        this.download = this.download.bind(this);
//        this.state = {
//           tableproperties: {
//              allData: [
//                 {"name": "ramesh","age": "12"},
//                 {"name": "bill","age": "13"},
//                 {"name": "arun","age": "9"},
//                 {"name": "kathy","age": "21"}
//              ]
//           },
//           dataToDownload: []
//        };
//     }

//    download(event) {
//       const currentRecords = this.reactTable.getResolvedState().sortedData;
//       var data_to_download = []
//       for (var index = 0; index < currentRecords.length; index++) {
//          let record_to_download = {}
//          for(var colIndex = 0; colIndex < columns.length ; colIndex ++) {
//             record_to_download[columns[colIndex].Header] = currentRecords[index][columns[colIndex].accessor]
//          }
//          data_to_download.push(record_to_download)
//       }
//       this.setState({ dataToDownload: data_to_download }, () => {
//          // click the CSVLink component to trigger the CSV download
//          this.csvLink.link.click()
//       })
//     } 

//     render() {
//        return <div>
//                  <div>
//                     <button onClick={this.download}>
//                         Download
//                     </button>
//                  </div>
//                  <div>
//                     <CSVLink
//                         data={this.state.dataToDownload}
//                         filename="data.csv"
//                         className="hidden"
//                         ref={(r) => this.csvLink = r}
//                         target="_blank"/>

//                  </div>
                
//               </div>
//     }
// }
