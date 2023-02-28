import React from 'react';
import { Paper, Table, TableCell, TableContainer,TableFooter, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import { getComparator, stableSort } from '@jumbo/utils/tableHelper';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './index.style';
import NoRecordFound from './NoRecordFound';
import { useDebounce } from '@jumbo/utils/commonHelper';
import IntakterTableToolbar from './IntakterTableToolbar';
import KvittoTableHead from './KvittoTableHead';
import AddEditInkop from './AddEditInkop';
import moment from 'moment';
import {isEmpty} from 'lodash'
import { getAdminsInkop,downloadFile,deleteInkop,getAktivaUsers } from 'redux/actions';
import InkopListRow from './InkopListRow';

function Kvitton(props) {
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
    const [openEditIntakterDialog, setopenEditIntakterDialog] =React.useState(false);
    const [EditRow, setEditRow] =React.useState({});
    const dispatch = useDispatch();
    const AdminInkop = useSelector(({ usersReducer }) => usersReducer.AdminInkop);
    const userKvitto = useSelector(({ usersReducer }) => usersReducer.userKvitto);
    //AdminInkop
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
      const handleCloseUserDialog2 = () => {
        setopenEditIntakterDialog(false);
     };
     React.useEffect(()=>{
        console.log(filterOptions,"ASD")
        dispatch(getAdminsInkop(searchTerm,isEmpty(filterOptions)?[{date:moment(new Date()).format("YYYY-MM-DD")}]:filterOptions),
        () => {
          setFilterApplied(!!filterOptions.length);
          setUsersFetched(true);
        }
        )
      },[dispatch, filterOptions, debouncedSearchTerm])
      React.useEffect(()=>{
        if(isEmpty(AdminInkop)){setTotal(0)}
        else{
          let Totalr= 0
          AdminInkop.map(item=>{
            Totalr+=parseFloat(item.Value.replace(/\s+/g, ''))
          })
          setTotal(Totalr)
        }
      },[AdminInkop])
      React.useEffect(()=>{
        dispatch(getAktivaUsers())
      },[])
      const handleDawnloadfile=(filename,Url)=>{
        dispatch(downloadFile(filename,Url))
      }
      const handlefileDelete=(fileId,Url)=>{      
          dispatch(deleteInkop(userKvitto.id,fileId,Url,searchTerm,isEmpty(filterOptions)?[{date:moment(new Date()).format("YYYY-MM-DD")}]:filterOptions))
      }
      const handleInkopEdit=(row)=>{
          setopenEditIntakterDialog(true)
          setEditRow(row)
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
                <Table stickyHeader className={classes.table} aria-labelledby="tableTitle" aria-label="sticky enhanced table">
                <KvittoTableHead
                isMobile={props.isMobile}
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={0}
                />
                <TableBody>
                {!!AdminInkop.length ? (
                   stableSort(AdminInkop, getComparator(order, orderBy))
                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <InkopListRow
                    isMobile={props.isMobile}
                      key={index}
                      row={row}
                      onfileDelete={handlefileDelete}
                      onDawnloadfile={handleDawnloadfile}
                      onInkopEdit={handleInkopEdit}
                    />
                  ))
                ):(
                  <TableRow style={{ height: 53 * 6 }}>
                  <TableCell colSpan={props.isMobile?5:9} rowSpan={10}>
                    {isFilterApplied ? (
                      <NoRecordFound>There are no records found with your filter.</NoRecordFound>
                    ) : (
                      <NoRecordFound>{AdminInkop ? 'There are no records found.' : 'Loading...'}</NoRecordFound>
                    )}
                  </TableCell>
                </TableRow>
                )}
                </TableBody>
                {
                    props.isMobile === true?                    
                <TableFooter>
                <TableCell/>
                <TableCell/>
                <TableCell><b>{
                 total
                  }Kr</b></TableCell>
                <TableCell/>
                <TableCell/>
                </TableFooter>
                    :
                <TableFooter>
                <TableCell/>
                <TableCell/>
                <TableCell/>
                <TableCell/>
                <TableCell/>
                <TableCell><b>{
                 total
                  }Kr</b></TableCell>
                <TableCell/>
                <TableCell/>
                <TableCell/>
                </TableFooter>
                }
                </Table>                
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={AdminInkop.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            />
            </div>
            {openIntakterDialog && <AddEditInkop open={openIntakterDialog} searchTerm={searchTerm} onCloseDialog={handleCloseUserDialog} />}
            {openEditIntakterDialog && <AddEditInkop open={openEditIntakterDialog} EditRow={EditRow} searchTerm={searchTerm} onCloseDialog={handleCloseUserDialog2} />}
        </div>
    );
}

export default Kvitton;