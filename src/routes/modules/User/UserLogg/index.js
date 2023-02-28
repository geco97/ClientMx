import React from 'react';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import {useTheme } from '@material-ui/core';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import Box from '@material-ui/core/Box';
import CmtGridView from '@coremat/CmtGridView';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import moment from 'moment'
import { useSelector,useDispatch } from 'react-redux';
import {getUserLogg,resetLogg} from 'redux/actions/Users'
import CmtAvatar from '@coremat/CmtAvatar';
import {Divider} from '@material-ui/core';
import InfiniteScroll from "react-infinite-scroll-component";
import CmtCardFooter from '@coremat/CmtCard/CmtCardFooter';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    '& .Cmt-header-root': {
      paddingTop: 3,
      paddingBottom: 0,
    },
  },
  tabsList: {
    position: 'relative',
    minHeight: 60,
    '& .MuiTabs-indicator': {
      backgroundColor: alpha(theme.palette.primary.main, 0.8),
    },
  },
  tabItem: {
    maxWidth: 'none',
    minWidth: 10,
    minHeight: 60,
    padding: '5px 10px',
    textTransform: 'capitalize',
    color: theme.palette.text.primary,
    fontSize: 14,
    fontWeight: theme.typography.fontWeightRegular,
  },
  columnRoot: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.5px',
  },
}));

const About = ({ userDetail }) => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const classes = useStyles();
  const [page,setPage]=React.useState(0)
  const [isWaiting,setisWaiting]=React.useState(false)
  const UserLogg = useSelector(({ usersReducer }) => usersReducer.UserLogg);
  const hasMore = useSelector(({ usersReducer }) => usersReducer.UserLoggHasMore);
  React.useEffect(()=>{
    dispatch(getUserLogg(userDetail.id,0))
  },[])
  React.useEffect(()=>{
    setisWaiting(false)
  },[UserLogg])
  /*
  
  */
   const loadFunc=()=>{
        setisWaiting(true)
        setPage(page+1)
        dispatch(getUserLogg(userDetail.id,page+1))
   }
  return (
    <CmtCard className={classes.cardRoot} style={{ height:550}}>
      <CmtCardHeader
        separator={{
          color: theme.palette.borderColor.dark,
        }}
        title={<div style={{margin:'10px auto'}}>
          <Box display="flex" p={0}>
            <Box flexGrow={1}>Logg</Box>
            <Box>
              <IconButton aria-label="delete" className={classes.margin}
              onClick={()=>dispatch(resetLogg(userDetail.id))}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
          
         
        </div>}>
      </CmtCardHeader>
      <CmtCardContent
        style={{height:"440px", overflow:"auto"}}
      >
         <InfiniteScroll
         dataLength={UserLogg.length}
         next={loadFunc}
         hasMore={hasMore}
         loader={ isWaiting === true?<CircularProgress/>:"" }
          >
        <CmtGridView
          itemPadding={20}
          responsive={{
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 1,
          }}
          data={!UserLogg?[]:UserLogg}
          renderRow={
            (item, index) => (
                <>
                <Box display="flex" alignItems="center" key={index}>
                <CmtAvatar size={20} src={item.BildUrl} alt={`${item.Firstname} ${item.Lastname}`} />
                <Box ml={6}>
                  <Box fontSize={12} color="text.secondary">
                    {item.message}
                    <div><small>{moment(item.sdate).format("YYYY-MM-DD HH:mm:ss")}</small></div>
                  </Box>
                </Box>
              </Box> 
              <Divider/>
              </>
            )
          }
        />
        </InfiniteScroll>
      </CmtCardContent>
      {/*isWaiting === true?
      <CmtCardFooter>
            <Box display="flex" alignItems="center">
            <CircularProgress size="30" />
            </Box> 
      </CmtCardFooter>
      :""*/}      
    </CmtCard>
  );
};

export default About;

About.prototype = {
  userDetail: PropTypes.object.isRequired,
};
