import React from 'react';
import {makeStyles,Dialog,Box,Grid,Button,DialogTitle,DialogContent} from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { AddnewEvent,EditEvent,onDeleteEvent } from 'redux/actions';
import moment from 'moment'
import InputMask from 'react-input-mask';
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
function AddEditEvent({ open, onCloseDialog, Cevent,Add }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [event,setEvent] = React.useState(Cevent)
    const authUser = useSelector(({ auth }) => auth.authUser);
    const onDeleteClick =()=>{
        let month = moment(event.start).format("MM")
        let year = moment(event.start).format("YYYY")
        dispatch(onDeleteEvent(event,authUser.id,month,year));
        onCloseDialog()
    }
    const onSubmitClick = ()=>{
        let month = moment(event.start).format("MM")
        let year = moment(event.start).format("YYYY")
        if(parseInt(Add) === 1){
            //Edit
            console.log(event.Timmar)
            console.log(getFloatFormat(event.Timmar))
            let Event = {...event,Timmar:getFloatFormat(event.Timmar)}
            dispatch(EditEvent(Event,authUser.id,month,year));
        }
        else{
            console.log(event)
            let nItems=[]
            for(let item of event.Itemms){
                item={
                    ...item,
                    Timmar:getFloatFormat(item.Timmar)
                }
                nItems.push(item)
            }
            let Event = {...event,Itemms:nItems}
            console.log(Event)
           dispatch(AddnewEvent(Event,authUser.id,month,year));
        }
        onCloseDialog()
    }
    const onChangeValue1 = (startDate,value)=>{
        let newEventItme=[]
        for(let item of event.Itemms){
            if(item.start === startDate){
                item={
                    ...item,
                    Timmar:value,
                    start:startDate,
                    end:startDate,
                }
                newEventItme.push(item)
            }else{
                newEventItme.push(item)
            }
        }
        setEvent({
            ...event,
            Itemms:newEventItme
        })
    }

    React.useEffect(()=>{
        if(parseInt(Add) === 1){
            setEvent({
                ...Cevent,
                Timmar:getHoutFormat(Cevent.Timmar)
            })
        }
    },[Cevent])

    const onChangeValue = (startDate,value,AntalTimes)=>{
        
        let newItem = {
            Status:value,
            Timmar:value==="Arbete"?getHoutFormat(8):getHoutFormat(0),
            AntalTimes: AntalTimes,
            start:startDate,
            end:startDate,
        }
        let newEventItme=[]
        for(let item of event.Itemms){
            if(item.start === startDate){
                newEventItme.push(newItem)
            }else{
                newEventItme.push(item)
            }
        }
        setEvent({
            ...event,
            Itemms:newEventItme
        })
    }
    const getHoutFormat=(number)=>{
        var sign = (number >= 0) ? 1 : -1;
        // Set positive value of number of sign negative
        number = number * sign;
        // Separate the int from the decimal part
        var hour = Math.floor(number);
        var decpart = number - hour;    
        var min = 1 / 60;
        // Round to nearest minute
        decpart = min * Math.round(decpart / min);    
        var minute = Math.floor(decpart * 60) + '';    
        // Add padding if need
        if (minute.length < 2) {
        minute = '0' + minute; 
        }    
        // Add Sign in final result
        sign = hour > 9 ? '' : '0';    
        // Concate hours and minutes
        let time = sign + hour + ':' + minute;    
        return time;
    }
    const getFloatFormat=(time)=>{
        // Number of decimal places to round to
        var decimal_places = 2;
        // Maximum number of hours before we should assume minutes were intended. Set to 0 to remove the maximum.
        var maximum_hours = 24;
        // 1:15
	    var time_format = time.match(/([\d]*):([\d]+)/);
        let hours = parseInt(time_format[1]);
		let minutes = parseFloat(time_format[2]/60);
		time = hours + minutes;
        time = parseFloat(time).toFixed(decimal_places);
        return time;
    }
    return (
        <>
            <Dialog disableEscapeKeyDown={true} disableBackdropClick={true}  open={open} onClose={onCloseDialog} className={classes.dialogRoot} fullWidth 
            maxWidth="md"
            >
{
    parseInt(Add) === 1?
    <>
     <DialogTitle className={classes.dialogTitleRoot}>{'Modifera'}</DialogTitle>
                <DialogContent dividers>
                    <GridContainer>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput
                        fullWidth
                        variant="outlined"
                        label="Startdatum"
                        value={event.start}
                        type="date"
                        onChange={e => {
                            setEvent({
                                ...event,
                                start:e.target.value
                            });
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput
                        fullWidth
                        variant="outlined"
                        label="Slutdatum"
                        value={event.end}
                        type="date"
                        onChange={e => {
                            setEvent({
                                ...event,
                                end:e.target.value
                            });
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput
                        fullWidth
                        variant="outlined"
                        label=""
                        value={event.Status}
                        select
                        onChange={e => {
                            setEvent({
                                ...event,
                                Status:e.target.value
                            });
                        }}
                        >
                            <option key={0} value="0">Välj</option>
                            <option key={1} value="Arbete">Arbete</option>
                            <option key={2} value="Semester">Semester</option>
                            <option key={3} value="Ledigt">Ledigt</option>
                            <option key={4} value="VAB">VAB</option>
                            <option key={5} value="Sjuk">Sjuk</option>
                            </AppTextInput>
                    </Grid>
                    {
                        event.Status === 'Arbete'  || event.Status  === "VAB" || event.Status  === "Sjuk"?
                        <Grid item xs={12} sm={12}>
                           <InputMask
                           mask="99:99"
                           alwaysShowMask={true}
                           error={parseInt(Cevent.AntalTimes) >23}
                           value={event.Timmar}
                           maskChar=" "
                           onChange={(e) => {
                            setEvent({
                                ...event,
                                Timmar:e.target.value
                            });
                        }}
                        >
                            { () =>  <AppTextInput
                            fullWidth
                            variant="outlined"
                            label={`Antal Timmar (${parseInt(Cevent.AntalTimes)})`}
                            />
                            }
                            </InputMask>




                       
                        </Grid>
                        :""
                    }
                     <Grid item xs={12} sm={12}>
                     <AppTextInput
                        fullWidth
                        variant="outlined"
                        label="Anteckning"
                        value={event.desc}
                        type="text"
                        multiline
                        rows={4}
                        onChange={e => {
                            setEvent({
                                ...event,
                                desc:e.target.value
                            });
                        }}
                        />
                    </Grid>
                    </GridContainer>
                    <Box display="flex" justifyContent="flex-end" mb={4} mt={4}>
                        <Button onClick={onCloseDialog}>Cancel</Button>
                    <Box ml={2}>
                        <Button variant="contained" color="secondary" 
                        onClick={onDeleteClick}
                        >
                          Ta bort
                        </Button>
                        <Button variant="contained" color="primary" 
                        onClick={onSubmitClick}
                        >
                          Spara
                        </Button>
                    </Box>
                    </Box>
                </DialogContent>
    </>
    :
    <>
    <DialogTitle className={classes.dialogTitleRoot}>{'Ny'}</DialogTitle>
                <DialogContent dividers>
                {
                   event.Itemms.map(item=>{
                    console.log(item,"FFFF")
                        return <>
                        <GridContainer>
                            <Grid item xs={12} sm={6}>
                            <AppTextInput
                        fullWidth
                        variant="outlined"
                        label={`${item.start} Status`}
                        value={item.Status}
                        select
                        onChange={e=>onChangeValue(item.start,e.target.value,item.AntalTimes)}
                        >
                        <option key={0} value="0">Välj</option>
                        <option key={1} value="Arbete">Arbete</option>
                        <option key={2} value="Semester">Semester</option>
                        <option key={3} value="Ledigt">Ledigt</option>
                        <option key={4} value="VAB">VAB</option>
                        <option key={5} value="Sjuk">Sjuk</option>
                        </AppTextInput>
                            </Grid>
                            <Grid item xs={12} sm={6}>

                            <InputMask
                           mask="99:99"
                           alwaysShowMask={true}
                           error={parseInt(item.AntalTimes)+parseInt(item.Timmar) >23}
                           value={item.Timmar}
                           disabled={isEmpty(event.Itemms.filter(itemff=>{return itemff.start === item.start 
                            && (itemff.Status === "Arbete" || itemff.Status === "VAB" || event.Status  === "Sjuk")
                        }))}
                           maskChar=" "
                           onChange={e=>onChangeValue1(item.start,e.target.value)}
                        >
                            { () =>  <AppTextInput
                            fullWidth
                            variant="outlined"
                            label={`Antal Timmar (${parseInt(item.AntalTimes)+parseInt(item.Timmar)})`}
                            />
                            }
                            </InputMask>

                            {/*

                            <AppTextInput
                            fullWidth
                            variant="outlined"
                            label={`Antal Timmar (${parseInt(item.AntalTimes)+parseInt(item.Timmar)})`}
                            value={item.Timmar}
                            error={parseInt(item.AntalTimes)+parseInt(item.Timmar) >23}
                            disabled={isEmpty(event.Itemms.filter(itemff=>{return itemff.start === item.start 
                                && (itemff.Status === "Arbete" || itemff.Status === "VAB")
                            }))}
                            type="number"
                            InputProps={{ inputProps: { min: 0, max: 14 } }}
                            onChange={e=>onChangeValue1(item.start,e.target.value)}
                            />*/}
                            </Grid>
                            </GridContainer>
                        </>
                        })
                        }
                    <GridContainer>

                     <Grid item xs={12} sm={12}>
                     <AppTextInput
                        fullWidth
                        variant="outlined"
                        label="Anteckning"
                        value={event.desc}
                        type="text"
                        multiline
                        rows={4}
                        onChange={e => {
                            setEvent({
                                ...event,
                                desc:e.target.value
                            });
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
    </>
}               
            </Dialog> 
        </>
    );
}

export default AddEditEvent;