import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {IconButton,Tooltip } from '@mui/material/'
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import {Download,Link,MoreHoriz,Delete,Edit} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import ConfirmDialog from '@jumbo/components/Common/ConfirmDialog';
import {isEmpty} from 'lodash'
import CmtDropdownMenu from '@coremat/CmtDropdownMenu';

const useStyles = makeStyles(theme => ({
    titleRoot: {
      marginBottom: 0,
      fontSize: 14,
      letterSpacing: 0.25,
      color: theme.palette.common.dark,
    },
  }));
const getInkopActions = (user) => {
    const actions = [
        { action: 'edit', label: 'Modifera', icon: <Edit /> },
    ];
    if(parseInt(user.status)===1){
    actions.push({ action: 'delete', label: 'Ta bort', icon: <Delete /> });
    }
    return actions;
};
function InkopListRow({row, onfileDelete, onDawnloadfile,onInkopEdit,isMobile}) {
    const classes = useStyles();
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [id ,setId] = React.useState("")
    const [Url, setUrl] = React.useState("")
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
    const getUrl=(url)=>{
        let urlArr = url.split("://")
        if(urlArr.length > 1){return url}
        else{return `https://${url}`}
    }
    const onUserMenuClick = menu => {
        if (menu.action === 'edit') {
            onInkopEdit(row);
        } else if (menu.action === 'delete') {
            onDeleteCLick(row.id,row.InkopUrl);
        }
      };
    //InkopActions
    const InkopActions = getInkopActions(row);
    return (
        <>
            {
                isMobile === true?
                <TableRow
                hover
                tabIndex={-1}
                key={row.id}
                >
                    <TableCell size="small"
                    style={{wordBreak: "break-all",width: "48%",padding: "5px 5px 5px 5px"}}
                    >{isEmpty(row.InkopName)?"-":row.InkopName}</TableCell>
                    <TableCell  size="small">
                        {
                            isEmpty(row.link)?"-":              
                        <Tooltip title={`${row.link}`} placement="top">
                        <a  href={`${getUrl(row.link)}`} target="_blank">
                            <Link/>
                        </a>
                        </Tooltip>
                         }
                    </TableCell>
                    <TableCell  size="small">
                        {
                            isEmpty(row.InkopUrl)?"-":
                            <IconButton color="primary" component="span" size={"small"}
                            onClick={()=>getThisFile(isEmpty(row.InkopName)?"Inkop":row.InkopName,row.InkopUrl)}
                            >
                                <Download />
                            </IconButton>
                        }           
                    </TableCell>
                    <TableCell  size="small">{row.Value} kr</TableCell>
                    <TableCell  size="small">
                        {
                            parseInt(row.status) === 0?"Beställt":
                            parseInt(row.status) === 1?"Inskickad":
                            "Pågående"
                        }
                    </TableCell>
                    <TableCell size="small"  onClick={event => event.stopPropagation()}>
                        <CmtDropdownMenu items={InkopActions} onItemClick={onUserMenuClick} TriggerComponent={<MoreHoriz />} />
                    </TableCell>
                    <ConfirmDialog
              open={openConfirmDialog}
              title={`Bekräfta`}
              content={'Är du verkligen vill ta bort denna Inköp?'}
              onClose={handleCancelDelete}
              onConfirm={handleConfirmDelete}
              />
                </TableRow>
                :
         <TableRow
        hover
        tabIndex={-1}
        key={row.id}
        >
            <TableCell size="small">{row.id}</TableCell>
            <TableCell size="small">{isEmpty(row.InkopName)?"-":row.InkopName}</TableCell>
            <TableCell  size="small">
                {
                    isEmpty(row.link)?"-":              
                <Tooltip title={`${row.link}`} placement="top">
                <a  href={`${getUrl(row.link)}`} target="_blank">
                    <Link/>
                </a>
                </Tooltip>
                 }
            </TableCell>
            <TableCell  size="small">
                {
                    isEmpty(row.InkopUrl)?"-":
                    <IconButton color="primary" component="span" size={"small"}
                    onClick={()=>getThisFile(isEmpty(row.InkopName)?"Inkop":row.InkopName,row.InkopUrl)}
                    >
                        <Download />
                    </IconButton>
                }           
            </TableCell>
            <TableCell  size="small">{row.Value} kr</TableCell>
            <TableCell  size="small">
                {
                    parseInt(row.status) === 0?"Beställt":
                    parseInt(row.status) === 1?"Inskickad":
                    "Pågående"
                }
            </TableCell>
            <TableCell size="small">{`${getMonthNameSE(moment(row.InkopDate).format("MM"))}/${moment(row.InkopDate).format('YYYY')}`}</TableCell>
            <TableCell size="small"  onClick={event => event.stopPropagation()}>
                <CmtDropdownMenu items={InkopActions} onItemClick={onUserMenuClick} TriggerComponent={<MoreHoriz />} />
            </TableCell>
            <ConfirmDialog
      open={openConfirmDialog}
      title={`Bekräfta`}
      content={'Är du verkligen vill ta bort denna Inköp?'}
      onClose={handleCancelDelete}
      onConfirm={handleConfirmDelete}
      />
        </TableRow>}</>
    );
}

export default InkopListRow;