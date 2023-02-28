import React from 'react';
import {makeStyles,Dialog,Box,Grid,Button,DialogTitle,DialogContent} from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import FileDrop from '../../../FileDrop'
import { useDispatch, useSelector } from 'react-redux';
import { AddnewKvitto } from 'redux/actions';
import {isEmpty} from 'lodash'

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
function AddEditInvoice({ open, onCloseDialog,searchTerm }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [file,setFile] = React.useState([])
    const [date,setDate] = React.useState(new Date())
    const [Value,setValue] = React.useState(0)
    const [error,setError] = React.useState("")
    const currentUser = useSelector(({ usersReducer }) => usersReducer.currentUser);
    const onchangeHanel = (file)=>{
        if(isEmpty(file)){
            setError(true)
        }else{
            setFile(file)
            setError(false)
        }        
    }
    const onSubmitClick = ()=>{
        if(!isEmpty(file)){
            dispatch(AddnewKvitto(currentUser.id,date,Value,file,searchTerm));
            onCloseDialog()
        }
    }
    return (
        <>
            <Dialog disableEscapeKeyDown={true} disableBackdropClick={true}  open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
                <DialogTitle className={classes.dialogTitleRoot}>{'Ny Kvitto'}</DialogTitle>
                <DialogContent dividers>
                    <GridContainer>
                    <Grid item xs={12} sm={12}>
                        <FileDrop
                        Value={file}
                        error={error}
                        onchangeHanel={onchangeHanel}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput
                        fullWidth
                        variant="outlined"
                        label="Kivttosdatum"
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
                        label="Värde"
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

export default AddEditInvoice;