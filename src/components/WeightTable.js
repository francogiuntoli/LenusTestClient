import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import AssessmentIcon from '@material-ui/icons/Assessment';

const columns = [
  { id: 'date', label: 'Date', minWidth: 170 , align: 'center'},
  { id: 'weight', label: 'Weight', minWidth: 170 , align:'center'},

];

const useStyles = makeStyles({
  root: {
    margin:'35px',
    minWidth: '90vw',
  },
  tableRow:{
    color:'red',
    textDecoration: 'none',
  },
  container: {

    minWidth:'80vw',
    maxHeight: '90vh',
  },
});

export default function StickyHeadTable(props) {
  const {measurement} = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  
  function createData() {
    let content=[];
    measurement.map(item =>{
      content.push(item)
    });
    return content;
  }

  const rows = createData() 

  return (
    <div style={{margin:'20px',display:'flex', flexDirection:'column', alignItems:'center'}} >
      <Button style={{width:150}}variant='contained' color='secondary'component={Link} to='/create'>AddForm</Button>
      <div style={{display:'flex', justifyContent: 'center'}}>
    
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" className={classes.tableRow} component={Link} to={`/measurement/${row._id}`} tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
    
    </div>
    <Fab aria-label='graph' color="primary" size='medium' href='/graph'>
    <AssessmentIcon/>
    </Fab>
        </div>
  );
}
