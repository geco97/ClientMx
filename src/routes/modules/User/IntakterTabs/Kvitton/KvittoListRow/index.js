import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {IconButton} from '@mui/material/'
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';

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
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [id ,setId] = React.useState("")
    const [Url ,setUrl] = React.useState("")
    const authUser = useSelector(({ auth }) => auth.authUser);
    const getMonthNameSE=(month)=>{
        const months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "October", "November", "December"];
        return months[parseInt(month)-1]
    }
    const getThisFile=(filename,Url)=>{
        onDawnloadfile(filename,Url)
    }
    const onDeleteCLick = (id,Url) => {
        setOpenConfirmDialog(true);
        setId(id)
        setUrl(Url)
    };
    const handleCancelDelete = () => {
        setOpenConfirmDialog(false);
        setId("")
        setUrl("")
    };
    const handleConfirmDelete = () => {
        onfileDelete(id,Url)
        setOpenConfirmDialog(false);
        setId("")
        setUrl("")
    };
    return (
      <>
            {
                isMobile === true?
                <>
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
                </>
                :
                <TableRow
                hover
                tabIndex={-1}
                key={row.id}
                >
           
            <TableCell size="small" >{row.id}</TableCell>
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
            <TableCell size="small">
            <IconButton color="secondary" component="span" size={"small"}
            disabled={parseInt(authUser.Role) !==0}
            onClick={()=>{
                if(parseInt(authUser.Role) !==0){
                    console.log("error")
                }else{
                    onDeleteCLick(row.id,row.invoiceUrl)
                }
            }}
            >
                <DeleteIcon />
            </IconButton>
            </TableCell>
            <ConfirmDialog
      open={openConfirmDialog}
      title={`Bekräfta`}
      content={'Är du verkligen vill ta bort denna kvitto?'}
      onClose={handleCancelDelete}
      onConfirm={handleConfirmDelete}
      />
        </TableRow>
    }
    </>
    );
}

export default KvittoListRow;