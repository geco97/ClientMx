import React from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/sv';
import { calendarData } from '@fake-db';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { green, purple, lightBlue,pink,teal } from '@material-ui/core/colors';
import { Box } from '@material-ui/core';
import AddEditEvent from './AddEditEvent'
import { useSelector,useDispatch } from 'react-redux';
import {onGetUserEvent} from 'redux/actions'
import { isEmpty } from 'lodash';
import HeaderStatistic from './HeaderStatistic'
const {
  getHolidays,
} = require('swedish-holidays');

let Holidays = getHolidays();
const today = new Date();
const currentYear = today.getFullYear();
const crrentmonth = moment(new Date()).format("MM");

  const ColorButton1 = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: lightBlue[500],
      '&:hover': {
        backgroundColor: lightBlue[700],
      },
    },
  }))(Chip);
  const ColorButton2 = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Chip);
  const ColorButton3 = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
  }))(Chip);
  const ColorButton4 = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: pink[400],
      '&:hover': {
        backgroundColor: pink[600],
      },
    },
  }))(Chip);
  const ColorButton5 = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: teal[600],
      '&:hover': {
        backgroundColor: teal[700],
      },
    },
  }))(Chip);
  
  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
      borderRadius:0
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        '& > *': {
          margin: theme.spacing(2),
        },
      },
  }));
  
 
const localizer = momentLocalizer(moment);
const messages = {
    today: 'Idag',
    day: 'Dag',
    week: 'Vecka',
    previous: 'Tillbaka',
    next: 'Nästa',
    month: 'Månad',
    allDay: 'Hela dagen',
    date: 'Datum',
    time: 'Tid',
    event: 'Händelse',
  };
const PopupCalendar = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openAddEventPop,setOpenAddEventPop] = React.useState(false)
    const [openEditEventPop,setOpenEditEventPop] = React.useState(false)
    const [event,setEvent] = React.useState({})
    const [Events,setEvents] = React.useState([])
    const [CurrentDate,setCurrentDate] = React.useState(moment().format("YYYY-MM-DD"))
    const authUser = useSelector(({ auth }) => auth.authUser);
    const userEvent = useSelector(({ usersReducer }) => usersReducer.userEvent);
    const handleCloseEventDialog=()=>{
        setOpenAddEventPop(false)
        setEvent({})
    }
    React.useEffect(()=>{
        dispatch(onGetUserEvent(authUser.id,crrentmonth,currentYear))
    },[])
    React.useEffect(()=>{
        if(isEmpty(userEvent)){
            setEvents([])
        }else{
            let Eventss = []
            userEvent.map(item=>{
                let Evvent = {
                    id:item.id,
                    title: `${item.description} ${item.status === "Arbete"?`${item.WorkingTime} Tim`:""} ${item.status !== "Arbete"?`${item.status}`:""}`,
                    allDay: true,
                    start:  item.startdate,
                    end: item.enddate,
                    color:getColor(item.status),
                    desc:item.description,
                    item:item
                }
                Eventss.push(Evvent)
            })
            setEvents(Eventss)
        }
    },[userEvent])
    const getColor=(st)=>{
        switch(st){
            case "Arbete": return '#03a9f4';
            case "Semester": return '#4caf50';
            case "Ledigt": return '#9c27b0';
            case "VAB": return '#ec407a';
            case "Sjuk": return '#00897b';
            default:return '#03a9f4'
        }
    }
    const eventStyleGetter=(event, start, end, isSelected)=>{
        var backgroundColor =event.color;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
    }
    const dayPropGetter =(date)=>{
      var obj = Holidays.find((element, index) => {
      if (moment(element.date).format("YYYYMMDD") === moment(date).format("YYYYMMDD"))
          return Holidays[index]
      })
      console.log(obj)
      if(obj !== undefined &&  moment(obj.date).format("YYYYMMDD") === moment(date).format("YYYYMMDD"))
      return { style: { backgroundColor: "#e6e1e1" } }
      else return { style: { backgroundColor: "#fff" } }
    }
    const handleSelectEvent=(event)=>{
       
        let item = {
            id:event.item.id,
            AntalTimes:getAntalTimesByDate(event.item.startdate),
            start:event.item.startdate,
            end:event.item.enddate,
            currentUserid:event.item.userid,
            Status:event.item.status,
            desc:event.item.description,
            Timmar:event.item.WorkingTime
        }
        setEvent(item)
        setOpenEditEventPop(true)
    }
    const handleCloseEditEventDialog=()=>{
        setOpenEditEventPop(false)
        setEvent({})
    }
    const getAntalTimesByDate=(date)=>{
      let antal = 0
      console.log(date,"FFF")
      if(!isEmpty(userEvent.filter(item=>{return item.startdate === date && item.status.status ==='Arbete'}))){
        userEvent.filter(item=>{return item.startdate === date && item.status.status ==='Arbete'}).map(item2=>{
          antal+=parseInt(item2.WorkingTime)
        })
      }
      return antal
    }
  return (
    <PageContainer style={{height:props.isMobile?"800":"700px"}}>
      <HeaderStatistic CurrentDate={CurrentDate}/>
      <Calendar 
        selectable
        dayPropGetter={dayPropGetter }
        style={{ width: '98%', height:props.isMobile?"500px":"400px",fontSize:12,margin: 'auto', padding: '1rem 0' }}
        localizer={localizer}
        events={Events} 
        messages={messages}
        views={['month']}     
        eventPropGetter={(eventStyleGetter)} 
        onSelectEvent={handleSelectEvent}   
        onSelectSlot={e=>{
          let startDate = moment(e.start).format("YYYY-MM-DD")
          let endDate = moment(e.end).format("YYYY-MM-DD")
          const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          let Itemms =[]
          for(let i = 0 ; i < diffDays; i++){
            var obj = Holidays.find((element, index) => {
              if (moment(element.date).format("YYYYMMDD") === moment(e.start).add(i,"day").format("YYYYMMDD"))
                  return Holidays[index]
              })
              if(obj === undefined){
            let itemObj = {
              Status:"",
              Timmar:0,
              AntalTimes:getAntalTimesByDate(moment(e.start).add(i,"day").format("YYYY-MM-DD")),
              start:moment(e.start).add(i,"day").format("YYYY-MM-DD"),
              end:moment(e.start).add(i,"day").format("YYYY-MM-DD"),
            }
            Itemms.push(itemObj)
          }
          }
            setEvent({
                currentUserid:authUser.id,
                Itemms:Itemms,
                desc:""
            })
            if(!isEmpty(Itemms)){
            setOpenAddEventPop(true)
            }
        }}
        defaultDate={new Date()} 
        onRangeChange={e => {
            console.log(e)
            let middle = new Date(e.end - (e.end-e.start)/2);
            setCurrentDate(middle)
            console.log(middle);
            dispatch(onGetUserEvent(authUser.id,moment(middle).format("MM"),moment(middle).format("YYYY")))
        }}
        popup />
    <Box className={classes.root}>
      <ColorButton1 label="Arbete" size='small' color="primary" className={classes.margin}/>
      <ColorButton2 label="Semester" size='small' color="primary" className={classes.margin}/>
      <ColorButton3 label="Ledigt" size='small' color="primary" className={classes.margin}/>
      <ColorButton4 label="VAB" size='small' color="primary" className={classes.margin}/>
      <ColorButton5 label="Sjuk" size='small' color="primary" className={classes.margin}/>
    </Box>
    {openAddEventPop && <AddEditEvent open={openAddEventPop} Cevent={event} onCloseDialog={handleCloseEventDialog} Add={0}/>}
    {openEditEventPop && <AddEditEvent open={openEditEventPop} Cevent={event} onCloseDialog={handleCloseEditEventDialog} Add={1}/>}
    </PageContainer>
  );
};

export default PopupCalendar;