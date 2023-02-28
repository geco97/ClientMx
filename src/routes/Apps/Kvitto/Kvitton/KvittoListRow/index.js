import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {IconButton} from '@mui/material/'
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import DownloadIcon from '@mui/icons-material/Download';

const useStyles = makeStyles(theme => ({
    titleRoot: {
      marginBottom: 0,
      fontSize: 14,
      letterSpacing: 0.25,
      color: theme.palette.common.dark,
    },
  }));

function KvittoListRow({row, onfileDelete, onDawnloadfile,isMobile }) {
    const classes = useStyles();
  const getMonthNameSE=(month)=>{
        const months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "October", "November", "December"];
        return months[parseInt(month)-1]
    }
    const getThisFile=(filename,Url)=>{
        onDawnloadfile(filename,Url)
    }
    
    return (
        <>
        {
            isMobile === true?
            <TableRow
            hover
            tabIndex={-1}
            key={row.id}
            >
                <TableCell  size="small">{row.invoiceName}</TableCell>
                <TableCell  size="small">
                <IconButton color="primary" component="span" size={"small"}
                onClick={()=>getThisFile(row.invoiceName,row.invoiceUrl)}
                >
                    <DownloadIcon />
                </IconButton>
                </TableCell>
                <TableCell  size="small">{row.Value} kr</TableCell>
               
            </TableRow>
            :
        <TableRow
        hover
        tabIndex={-1}
        key={row.id}
        >
            <TableCell size="small">{row.id}</TableCell>
            <TableCell  size="small">{row.invoiceName}</TableCell>
            <TableCell  size="small">
            <IconButton color="primary" component="span" size={"small"}
            onClick={()=>getThisFile(row.invoiceName,row.invoiceUrl)}
            >
                <DownloadIcon />
            </IconButton>
            </TableCell>
            <TableCell  size="small">{row.Value} kr</TableCell>
            <TableCell size="small">{`${getMonthNameSE(moment(row.invoicedate).format("MM"))}/${moment(row.invoicedate).format('YYYY')}`}</TableCell>
           
           
        </TableRow>
    }</>
    );
}

export default KvittoListRow;