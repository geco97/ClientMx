import React from 'react';
import {makeStyles,Dialog,Box,Grid,Button,DialogContent} from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import { useDispatch, useSelector } from 'react-redux';
import {onFyllaKalendar} from 'redux/actions'
import moment from 'moment';
import isUndefined from 'lodash'
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

function KlarPopUp(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const authUser = useSelector(({ auth }) => auth.authUser);
    const currentUser = useSelector(({ usersReducer }) => usersReducer.currentUser);
    const onSubmitClick=()=>{
        dispatch(onFyllaKalendar(isUndefined(currentUser)?authUser.id:currentUser.id,moment(props.CurrentDate).format("YYYY-MM-DD")))
      props.onCloseHandle()
    }
    return (
        <>
        <Dialog disableEscapeKeyDown={true} disableBackdropClick={true}  open={true}
           onClose={props.onCloseHandle} className={classes.dialogRoot} fullWidth 
            maxWidth="xs"
        >
             <DialogContent dividers>
                <GridContainer>
                    <Grid item xs={12} sm={12}>
                    Vill du verkligen fylla på Kalendar?
                    </Grid>
                </GridContainer>
                <Box display="flex" justifyContent="space-between" mb={1} mt={1}>
                    <Button onClick={props.onCloseHandle}>Avbryt</Button>
                    <Box ml={2}>
                        <Button variant="contained" color="primary" 
                        onClick={onSubmitClick}
                        >
                          Ja
                        </Button>
                    </Box>
                    </Box>
             </DialogContent>
        </Dialog>  
        </>
    );
}

export default KlarPopUp;