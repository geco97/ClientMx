import React from 'react';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtAdvCard from '@coremat/CmtAdvCard';
import { Box, Grid,Button,IconButton  } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {isEmpty} from 'lodash'
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CheckIcon from '@material-ui/icons/Check';
import KlarPopUp from './KlarPopUp'
import FyllaPopUp from './FyllaPopUp'
const useStyles = makeStyles(theme => ({
    cardRoot: {
        color: theme.palette.common.white,
        padding: 0,
      },
    cardRoot1: {
        color: theme.palette.common.dark,
        padding: '12px'
      },
      titleRoot: {
        fontSize: 10,
        letterSpacing: 1.5,
        marginBottom: 7,
        textTransform: 'uppercase',
      },
      subTitleRoot: {
        fontSize: 12,
        marginBottom: 0,
      },
    }));
function HeaderStatistic(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const authUser = useSelector(({ auth }) => auth.authUser);
    const SMilersattning = useSelector(({ usersReducer }) => usersReducer.SMilersattning);
    const [Milersattning,setMilersattning] = React.useState(0)
    const [openKarPopUp,setopenKarPopUp]=React.useState(false)
    const [openFyllaPopUp,setopenFyllaPopUp]=React.useState(false)
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
            totla+=parseFloat(item.WorkingTime)
            }
        }
        return totla
        //let totla = isEmpty(userEvent.filter(item=>{return item.status ==='Sjuk'}))?0:userEvent.filter(item=>{return item.status ==='Sjuk'}).length       
        //return totla
    }
    const onopenKarPopUp =()=>{
        setopenKarPopUp(true)
    }
    const oncloseKarPopUp=()=>{
        setopenKarPopUp(false)
    }
    const onopenFyllaPopUp =()=>{
        setopenFyllaPopUp(true)
    }
    const oncloseFyllaPopUp=()=>{
        setopenFyllaPopUp(false)
    }
    React.useEffect(()=>{
    },[props.CurrentDate])
    React.useEffect(()=>{
        setMilersattning(SMilersattning)
    },[SMilersattning])
    const updateMillersattning=()=>{
        console.log(Milersattning)
    }
    return (
        <div style={{padding:2}}>
             <GridContainer>
                <Grid item xs={6} md={2}>
                    <CmtAdvCard className={classes.cardRoot}
                     backgroundColor={['#03DAC5 -18.96%', '#6200EE 108.17%']}
                     gradientDirection="180deg"
                    >
                        <CmtAdvCardContent
                        style={{padding:6}}
                        title={`Arbete denna månad`}
                        titleProps={{
                            variant: 'body1',
                            component: 'div',
                            className: classes.subTitleRoot,
                        }}
                        extraContent={
                            <Box mt={0} mx={0} display="flex" alignItems="center">
                               <Box px={2} style={{fontSize:20}}>
                               {getTotalTimes()}
                               </Box>
                            </Box>
                        }
                        alignCenter
                        />
                        </CmtAdvCard>
                </Grid>
                <Grid item xs={6} md={2}>
                    <CmtAdvCard className={classes.cardRoot}
                     backgroundColor={['#4caf50 -18.96%', '#4caf50 108.17%']}
                     gradientDirection="180deg"
                    >
                        <CmtAdvCardContent
                        style={{padding:6}}
                        title={`Semester denna månad`}
                        titleProps={{
                            variant: 'body1',
                            component: 'div',
                            className: classes.subTitleRoot,
                        }}
                        extraContent={
                            <Box mt={0} mx={0} display="flex" alignItems="center">
                               <Box px={2} style={{fontSize:20}}>
                               {getTotalSemesters()}
                               </Box>
                            </Box>
                        }
                        alignCenter
                        />
                        </CmtAdvCard>
                </Grid>
                <Grid item xs={6} md={2}>
                    <CmtAdvCard className={classes.cardRoot}
                     backgroundColor={['#9c27b0 -18.96%', '#9c27b0 108.17%']}
                     gradientDirection="180deg"
                    >
                        <CmtAdvCardContent
                        style={{padding:6}}
                        title={`Ledigt denna månad`}
                        titleProps={{
                            variant: 'body1',
                            component: 'div',
                            className: classes.subTitleRoot,
                        }}
                        extraContent={
                            <Box mt={0} mx={0} display="flex" alignItems="center">
                               <Box px={2} style={{fontSize:20}}>
                               {getTotalLedigts()}
                               </Box>
                            </Box>
                        }
                        alignCenter
                        />
                        </CmtAdvCard>
                </Grid>
                <Grid item xs={6} md={2}>
                    <CmtAdvCard className={classes.cardRoot}
                     backgroundColor={['#ec407a -18.96%', '#ec407a 108.17%']}
                     gradientDirection="180deg"
                    >
                        <CmtAdvCardContent
                        style={{padding:6}}
                        title={`VAB denna månad`}
                        titleProps={{
                            variant: 'body1',
                            component: 'div',
                            className: classes.subTitleRoot,
                        }}
                        extraContent={
                            <Box mt={0} mx={0} display="flex" alignItems="center">
                               <Box px={2} style={{fontSize:20}}>
                               {getTotalVABs()}
                               </Box>
                            </Box>
                        }
                        alignCenter
                        />
                        </CmtAdvCard>
                </Grid>
                <Grid item xs={6} md={2}>
                    <CmtAdvCard className={classes.cardRoot}
                     backgroundColor={['#00897b -18.96%', '#00897b 108.17%']}
                     gradientDirection="180deg"
                    >
                        <CmtAdvCardContent
                        style={{padding:6}}
                        title={`Sjuk denna månad`}
                        titleProps={{
                            variant: 'body1',
                            component: 'div',
                            className: classes.subTitleRoot,
                        }}
                        extraContent={
                            <Box mt={0} mx={0} display="flex" alignItems="center">
                               <Box px={2} style={{fontSize:20}}>
                               {getTotalSjuks()}
                               </Box>
                            </Box>
                        }
                        alignCenter
                        />
                        </CmtAdvCard>
                </Grid>
                <Grid item xs={6} md={2}>
                    {
                        authUser.Role === 0?
                        <CmtAdvCard className={classes.cardRoot1}>
                        <GridContainer>
                        <Grid xs={12}>
                                <Button
                                size="small"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={onopenFyllaPopUp}
                                style={{padding:"4px 2px", fontSize:12}}
                                >
                                    Fylla på Kalendar
                                </Button>
                            </Grid>
                        </GridContainer>
                        </CmtAdvCard>
                        :
                    
                    <CmtAdvCard className={classes.cardRoot1}>
                        <GridContainer>
                            <Grid xs={12} style={{padding:"6px"}}>
                            <Grid container spacing={2}>
                                <Grid item xs="10">
                                <AppTextInput
                                fullWidth
                                variant="outlined"
                                label="Milersättning"
                                type={"text"}
                                size={"small"}
                                error={isNaN(Milersattning)}
                                value={Milersattning}
                                onChange={e => {
                                    setMilersattning(e.target.value);
                                }}
                                />
                                </Grid>        
                                <Grid item xs="2">
                                <IconButton className={"m-0"} size="small"
                                onClick={updateMillersattning}
                                >
                                    <CheckIcon fontSize="12" />
                                </IconButton>    
                                </Grid>        
                            </Grid>
                           
                            </Grid>
                            <Grid xs={12}>
                                <Button
                                size="small"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={onopenKarPopUp}
                                >
                                    Klar
                                </Button>
                            </Grid>
                            <Grid xs={12} style={{padding: "4px 0px"}}>
                                <Button
                                size="small"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={onopenFyllaPopUp}
                                style={{padding:"4px 2px", fontSize:12}}
                                >
                                    Fylla på Kalendar
                                </Button>
                            </Grid>
                        </GridContainer>
                    </CmtAdvCard>
                
            }</Grid>
            </GridContainer>
            {
                openKarPopUp===true?
                <KlarPopUp
                onCloseHandle={oncloseKarPopUp}
                />
                :""
            }
            {
                openFyllaPopUp===true?
                <FyllaPopUp
                CurrentDate={props.CurrentDate}
                onCloseHandle={oncloseFyllaPopUp}
                />
                :""
            }
        </div>
    );
}

export default HeaderStatistic;