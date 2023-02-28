import React from 'react';
import {makeStyles,Dialog,Box,Grid,Button,DialogTitle,DialogContent} from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import { useDispatch, useSelector } from 'react-redux';
import {isEmpty} from 'lodash'
import {onSendKlarMarkera} from 'redux/actions'
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
    const SMilersattning = useSelector(({ usersReducer }) => usersReducer.SMilersattning);
    const userEvent = useSelector(({ usersReducer }) => usersReducer.userEvent);
    const getTotalTimes=()=>{
        let totla = 0
        for(let item of userEvent){
            if(item.status === 'Arbete'){
            totla+=parseFloat(item.WorkingTime)
            }
        }
        return totla
    }
    const getTotalSemesters=()=>{
        let totla = isEmpty(userEvent.filter(item=>{return item.status ==='Semester'}))?0:userEvent.filter(item=>{return item.status ==='Semester'}).length
        return totla
    }
    const getTotalLedigts=()=>{
        let totla = isEmpty(userEvent.filter(item=>{return item.status ==='Ledigt'}))?0:userEvent.filter(item=>{return item.status ==='Ledigt'}).length       
        return totla
    }
    const getTotalVABs=()=>{
        let totla = isEmpty(userEvent.filter(item=>{return item.status ==='VAB'}))?0:userEvent.filter(item=>{return item.status ==='VAB'}).length       
        return totla
    }
    const getTotalSjuks=()=>{
        let totla = 0
        for(let item of userEvent){
            if(item.status === 'Sjuk'){
            totla+=parseFloat(item.WorkingTime === 0 ? 8: item.WorkingTime)
            }
        }
        return totla
       //let totla = isEmpty(userEvent.filter(item=>{return item.status ==='Sjuk'}))?0:userEvent.filter(item=>{return item.status ==='Sjuk'}).length       
        //return totla
    }
    const onSubmitClick=()=>{
        dispatch(onSendKlarMarkera())
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
                    <Box display="flex" justifyContent="space-between" mb={1} mt={1}>Arbete denna månad
                    <Box ml={2}>{getTotalTimes()}</Box>
                    </Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <Box display="flex" justifyContent="space-between" mb={1} mt={1}>Semester denna månad
                    <Box ml={2}>{getTotalSemesters()}</Box></Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <Box display="flex" justifyContent="space-between" mb={1} mt={1}>Ledigt denna månad
                    <Box ml={2}>{getTotalLedigts()}</Box></Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <Box display="flex" justifyContent="space-between" mb={1} mt={1}>VAB denna månad
                    <Box ml={2}>{getTotalVABs()}</Box></Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <Box display="flex" justifyContent="space-between" mb={1} mt={1}>Sjuk denna månad
                    <Box ml={2}>{getTotalSjuks()}</Box></Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <Box display="flex" justifyContent="space-between" mb={1} mt={1}>Milersättning denna månad
                    <Box ml={2}>{SMilersattning}</Box></Box>
                    </Grid>
                </GridContainer>
                <Box display="flex" justifyContent="space-between" mb={1} mt={1}>
                    <Button onClick={props.onCloseHandle}>Avbryt</Button>
                    <Box ml={2}>
                        <Button variant="contained" color="primary" 
                        onClick={onSubmitClick}
                        >
                          Klar
                        </Button>
                    </Box>
                    </Box>
             </DialogContent>
        </Dialog>  
        </>
    );
}

export default KlarPopUp;