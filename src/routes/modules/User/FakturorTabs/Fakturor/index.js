import React from 'react';
import { Paper, Table, TableCell, TableContainer, TableFooter, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';
import { useDebounce } from '@jumbo/utils/commonHelper';
import IntakterTableToolbar from './IntakterTableToolbar';
import KvittoTableHead from './KvittoTableHead';
import AddEditInvoice from './AddEditInvoice';
import KvittoListRow from './KvittoListRow';
import { getUsersFaktura,downloadFile,deleteFaktura } from 'redux/actions';
import moment from 'moment';
import {isEmpty} from 'lodash'



function Kvitton(props) {
  //userFakturor
    const classes = useStyles();
    const [orderBy, setOrderBy] = React.useState('id');
    const [order, setOrder] = React.useState('asc');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchTerm, setSearchTerm] = React.useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [isFilterApplied, setFilterApplied] = React.useState(false);
    const [filterOptions, setFilterOptions] = React.useState([]);
    const [usersFetched, setUsersFetched] = React.useState(false);
    const [total, setTotal] = React.useState(0);
    const [openIntakterDialog, setOpenIntakterDialog] =React.useState(false);
    const dispatch = useDispatch();
    const userFakturor = useSelector(({ usersReducer }) => usersReducer.userFakturor);
    const currentUser = useSelector(({ usersReducer }) => usersReducer.currentUser);
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    const handleRowsPerPageChange = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrderBy(property);
        setOrder(isAsc ? 'desc' : 'asc');
      };
    const handleCloseUserDialog = () => {
        setOpenIntakterDialog(false);
     };
    React.useEffect(()=>{
      console.log(filterOptions,"ASD")
      dispatch(getUsersFaktura(currentUser.id,searchTerm,isEmpty(filterOptions)?[{date:moment(new Date()).format("YYYY-MM-DD")}]:filterOptions),
      () => {
        setFilterApplied(!!filterOptions.length);
        setUsersFetched(true);
      }
      )
    },[dispatch, filterOptions, debouncedSearchTerm])
    React.useEffect(()=>{
      if(isEmpty(userFakturor)){setTotal(0)}
      else{
        let Totalr= 0
        userFakturor.map(item=>{
          Totalr+=parseFloat(item.Value.replace(/\s+/g, ''))
        })
        setTotal(Totalr)
      }
    },[userFakturor])
    const handleDawnloadfile=(filename,Url)=>{
      dispatch(downloadFile(filename,Url))
    }
    const handlefileDelete=(fileId,Url)=>{      
      dispatch(deleteFaktura(currentUser.id,fileId,Url,searchTerm,isEmpty(filterOptions)?[{date:moment(new Date()).format("YYYY-MM-DD")}]:filterOptions))
    }
    return (
        <div className={classes.root}>
            <div className={classes.paper}>
            <IntakterTableToolbar
                onIntakterAdd={setOpenIntakterDialog}
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                />
            <TableContainer className={classes.container}>
                <Table stickyHeader className={classes.table} 
                aria-labelledby="tableTitle" 
                aria-label="sticky enhanced table">
                <KvittoTableHead
                 isMobile={props.isMobile}
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={userFakturor.length}
                />
                <TableBody>
                {!!userFakturor.length ? (
                   stableSort(userFakturor, getComparator(order, orderBy))
                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <KvittoListRow
                    isMobile={props.isMobile}
                      key={index}
                      row={row}
                      onfileDelete={handlefileDelete}
                      onDawnloadfile={handleDawnloadfile}
                    />
                  ))
                ):(
                  <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={props.isMobile?3:6} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>There are no records found with your filter.</NoRecordFound>
                    ) : (
                      <NoRecordFound>{userFakturor ? 'There are no records found.' : 'Loading...'}</NoRecordFound>
                    )}
                  </TableCell>
                </TableRow>
                )}
                
                </TableBody>
                {
                    props.isMobile?
                    
                <TableFooter>
                <TableCell/>
                <TableCell/>
                <TableCell><b>{
                 total
                  }Kr</b></TableCell>
                </TableFooter>
                    :
                    
                <TableFooter>
                <TableCell/>
                <TableCell/>
                <TableCell/>
                <TableCell><b>{
                 total
                  }Kr</b></TableCell>
                <TableCell/>
                <TableCell/>
                </TableFooter>
                }
                </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={userFakturor.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            />
            </div>
            {openIntakterDialog && <AddEditInvoice open={openIntakterDialog} searchTerm={searchTerm} onCloseDialog={handleCloseUserDialog} />}
           
        </div>
    );
}

export default Kvitton;