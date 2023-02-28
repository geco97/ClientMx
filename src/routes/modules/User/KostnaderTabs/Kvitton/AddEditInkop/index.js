import React from 'react';
import {makeStyles,Dialog,Box,Grid,Button,DialogTitle,DialogContent} from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import FileDrop from '../../../FileDrop'
import { useDispatch, useSelector } from 'react-redux';
import { AddnewInkop,EditInkop } from 'redux/actions';
import {isEmpty, isUndefined} from 'lodash'

const useStyles = makeStyles(theme => ({
    dialogRoot: {
      position: 'relative',
    },
    dialogTitleRoot: {
      '& .MuiTypography-h6': {
        fontSize: 16,
        color: theme.palette.common.dark,
      },
    },
  }));

function AddEditInkop({ open, onCloseDialog,searchTerm,EditRow}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [file,setFile] = React.useState([])
    const [date,setDate] = React.useState(new Date())
    const [Value,setValue] = React.useState(0)
    const [link,setlink] = React.useState("")
    const [Type,setType] = React.useState("0")
    const [status,setStatus] = React.useState(1)
    const [Antal,setAntal] = React.useState(0)
    /*
    0 Rörliga kostnader
    1 Arbetsverktyg
    */
    const [notis,setNotis] = React.useState("")
    const [error,setError] = React.useState("")
    const currentUser = useSelector(({ usersReducer }) => usersReducer.currentUser);
    const onchangeHanel = (file)=>{
        console.log(file)
        if(isEmpty(file)){
            setError(true)
        }else{
            setFile(file)
            setError(false)
        }        
    }
    const onSubmitClick = ()=>{
        if(!isUndefined(EditRow)){
            dispatch(EditInkop(currentUser.id,EditRow,date,Value,link,notis,file,Type,Antal,status,searchTerm));
        }else{
            dispatch(AddnewInkop(currentUser.id,date,Value,link,notis,file,Type,Antal,searchTerm));
        }
            onCloseDialog()
    }
    React.useEffect(()=>{
        if(!isUndefined(EditRow)){
            setDate(EditRow.InkopDate)
            setValue(EditRow.Value)
            setlink(EditRow.link)
            setType(EditRow.Type)
            setNotis(EditRow.Inkopdesc)
            setAntal(EditRow.Antal)
            setStatus(EditRow.status)
            setFile(
                isEmpty(EditRow.InkopUrl)?[]:
                [{
                name:EditRow.InkopName,
                path:EditRow.InkopUrl
            }])
        }
    },[EditRow])
    return (
        <>
        <Dialog disableEscapeKeyDown={true} disableBackdropClick={true}  open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
            <DialogTitle className={classes.dialogTitleRoot}>{'Ny Inköp'}</DialogTitle>
            <DialogContent dividers>
                <GridContainer>
                <Grid item xs={12} sm={12}>
                        <FileDrop
                        Value={file}
                        error={error}
                        onchangeHanel={onchangeHanel}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <AppTextInput
                        fullWidth
                        variant="outlined"
                        label="Länk"
                        value={link}
                        type="text"
                        onChange={e => {
                            setlink(e.target.value);
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <AppTextInput
                        fullWidth
                        variant="outlined"
                        label="Antal"
                        value={Antal}
                        type="text"
                        onChange={e => {
                            setAntal(e.target.value);
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput
                        fullWidth
                        variant="outlined"
                        label="Anteckning"
                        value={notis}
                        type="text"
                        multiline
                        rows={4}
                        onChange={e => {
                            setNotis(e.target.value);
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput
                        fullWidth
                        variant="outlined"
                        label="Inköpsdatum"
                        value={date}
                        type="date"
                        onChange={e => {
                        setDate(e.target.value);
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput
                        fullWidth
                        variant="outlined"
                        label="Status"
                        value={status}
                        select
                        onChange={e => {
                            setStatus(e.target.value);
                        }}
                        >
                            <option key={1} value={1}>Inskickad</option>
                            <option key={2} value={2}>Pågående</option>
                            <option key={0} value={0}>Beställt</option>
                            </AppTextInput>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput
                        fullWidth
                        variant="outlined"
                        label="Typ"
                        value={Type}
                        select
                        onChange={e => {
                            setType(e.target.value);
                        }}
                        >
                            <option key={0} value={0}>Rörliga kostnader</option>
                            <option key={1} value={1}>Arbetsverktyg</option>
                        </AppTextInput>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput
                        fullWidth
                        variant="outlined"
                        label="Kostand"
                        value={Value}
                        type="text"
                        onChange={e => {
                            setValue(e.target.value);
                        }}
                        />
                    </Grid>  
                </GridContainer>
                <Box display="flex" justifyContent="flex-end" mb={4} mt={4}>
                        <Button onClick={onCloseDialog}>Cancel</Button>
                    <Box ml={2}>
                        <Button variant="contained" color="primary" 
                        onClick={onSubmitClick}
                        >
                          Spara
                        </Button>
                    </Box>
                    </Box>
            </DialogContent>
        </Dialog>
        </>
    );
}

export default AddEditInkop;