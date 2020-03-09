
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import FilterListIcon from '@material-ui/icons/FilterList';
import Confirm from './confirmreq';
import submitEmail from './sendMail'
import Button from '@material-ui/core/Button';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import DeleteIcon from '@material-ui/icons/Delete';

import {API, graphqlOperation } from 'aws-amplify';
import * as graphql from './graphql';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'name' },
  { id: 'id', numeric: true, disablePadding:  false, label: 'id' },
  { id: 'grade', numeric: true, disablePadding: false, label: 'grade' },
  { id: 'class', numeric: true, disablePadding: false, label: 'class' },
  { id: 'todayAvg', numeric: true, disablePadding: false, label: 'today' },
  { id: 'totalAvg', numeric: true, disablePadding: false, label: 'total' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));


const checkeddelete = async(selectedid) =>{
  selectedid.map(async(d,i)=>{
    await API.graphql(graphqlOperation(graphql.deleteWordOrigin,{input: {id:d}})).then(data =>{
      if(selectedid.length-1 ===i){
        window.location.reload();
        // NotificationManager.success('delete Success', `${selectedid[0]}이외 ${selectedid.length-1} 명이 삭제 되었습니다`,3000);
      }
      })
  })
}//보류 시바ㅅ거스ㅡ


const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const {Selected} = props;
  const {Selectedid} = props;
  const num = props.Selected.length

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: num > 0,
      })}
    >
      {num > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {num} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Students
        </Typography>
      )}

      {num > 0 ? (
        <Grid   container direction="row" justify="flex-end">
        
          <Grid item>
          <Tooltip title="Delete" placement="top-end">
              {/* <Button style={{backgroundColor:'#5a69bf',borderWidth:2,borderColor:'#ddd',color:'#ddd'}} onClick={()=>checkeddelete(Selectedid)}>
                Delete
              </Button> */}
              <IconButton onClick={()=>checkeddelete(Selectedid)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      ) : (
        <Tooltip title="Filter list" >
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [selectedid, setSelectedid] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const All = props.All;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = All.map(n => n.label);
      const newSelectedsid = All.map(n => n.value);
      setSelected(newSelecteds);
      setSelectedid(newSelectedsid);
      return;
    }
    setSelected([]);
    setSelectedid([]);
  };

  const handleClick = (event, name,id) => {
    const selectedIndex = selected.indexOf(name);


    let newSelected = [];
    let newSelectedid = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      newSelectedid = newSelectedid.concat(selectedid, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedid = newSelectedid.concat(selectedid.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedid = newSelectedid.concat(selectedid.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      newSelectedid = newSelectedid.concat(
        selectedid.slice(0, selectedIndex),
        selectedid.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    setSelectedid(newSelectedid);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, All.length - page * rowsPerPage);

  const total =props.total;
  const today =props.today;
  const grade = props.grade;
  const aclass = props.class;

  return (
    <div className={classes.root}>
      <NotificationContainer/>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar Selectedid={selectedid} Selected={selected} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={All.length}
            />
            <TableBody>
              {stableSort(All, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.label);
                  const labelId = `enhanced-table-checkbox-${index}`;

                    if(grade.includes(row.grade) && row.todayAvg <= today&& row.totalAvg <= total && aclass.includes(row.class) ){
                        return (
                            <TableRow
                              hover
                              onClick={event => handleClick(event, row.label, row.value)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.value}
                              selected={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </TableCell>
                              <TableCell component="th" id={labelId} scope="row" padding="none">
                                {row.label}
                              </TableCell>
                              <TableCell align="right">{row.value.split("-")[0]}</TableCell>
                              <TableCell align="right">{row.grade}</TableCell>
                              <TableCell align="right">{row.class}</TableCell>
                              <TableCell align="right">{row.todayAvg}</TableCell>
                              <TableCell align="right">{row.totalAvg}</TableCell>
                              </TableRow>
                          );
                    }
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={All.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}