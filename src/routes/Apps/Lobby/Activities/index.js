import React from 'react';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '../../../../@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtAdvCard from '../../../../@coremat/CmtAdvCard';
import TotalIncomeGraph from './TotalIncomeGraph';
import { metrics } from '../../../../@fake-db';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Box } from '@material-ui/core';
import moment from 'moment'
import { useDispatch,useSelector } from 'react-redux';
import { onGetStatistic } from 'redux/actions';

const useStyles = makeStyles(theme => ({
  cardRoot: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight:120,
    margin:10
  },
  cardContentRoot: {
    marginTop: 'auto',
    '& .MuiGrid-container': {
      alignItems: 'center',
    },
  },
  titleRoot: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 'normal',
    color: theme.palette.text.secondary,
  },
  cardContentTitle: {
    marginBottom: 4,
  },
  subTitleRoot: {
    fontSize: 14,
    marginBottom: 0,
    color: theme.palette.text.secondary,
  },
}));

const TotalIncome = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userStatistic = useSelector(({ usersReducer }) => usersReducer.userStatistic);
  const { income } = metrics;
  React.useEffect(()=>{
    let interval;
    dispatch(onGetStatistic())
    interval = setInterval(() => {
      dispatch(onGetStatistic())
    }, 60000);
    return () => clearTimeout(interval);
  },[])
  const getMonthName=(numb)=>{
    const months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "October", "November", "December"];
    return months[parseInt(numb)]
  }
  return (
    <>
    <CmtAdvCard className={classes.cardRoot}>
      <CmtCardHeader
        titleProps={{
          variant: 'inherit',
          component: 'h3',
          className: classes.titleRoot,
        }}
        title={`Maxkonto ${moment(new Date()).format("YYYY")}`}>
        <Box display="flex" alignItems="center" fontSize={14} color="#0795F4">
         </Box>
      </CmtCardHeader>
      <CmtAdvCardContent
        className={classes.cardContentRoot}
        title={userStatistic.Maxkonto}
        titleProps={{
          variant: 'h1',
          component: 'div',
          className: classes.cardContentTitle,
        }}
        reverseDir
        columnSizes={[5, 7]}>
        <Box ml={-8} mb={-6} mr={-6} mt={-1}>
          <TotalIncomeGraph data={income} />
        </Box>
      </CmtAdvCardContent>
    </CmtAdvCard>
    <CmtAdvCard className={classes.cardRoot}>
      <CmtCardHeader
        titleProps={{
          variant: 'inherit',
          component: 'h3',
          className: classes.titleRoot,
        }}
        title={`Intäkt ${getMonthName(moment(new Date()).format("MM"))}`}>
        <Box display="flex" alignItems="center" fontSize={14} color="#0795F4">
         </Box>
      </CmtCardHeader>
      <CmtAdvCardContent
        className={classes.cardContentRoot}
        title={userStatistic.Intakt}
        titleProps={{
          variant: 'h1',
          component: 'div',
          className: classes.cardContentTitle,
        }}
        reverseDir
        columnSizes={[5, 7]}>
        <Box ml={-8} mb={-6} mr={-6} mt={-1}>
          <TotalIncomeGraph data={income} />
        </Box>
      </CmtAdvCardContent>
    </CmtAdvCard>
    <CmtAdvCard className={classes.cardRoot}>
      <CmtCardHeader
        titleProps={{
          variant: 'inherit',
          component: 'h3',
          className: classes.titleRoot,
        }}
        title={`Rörliga kostnader ${getMonthName(moment(new Date()).format("MM"))}`}>
        <Box display="flex" alignItems="center" fontSize={14} color="#0795F4">
         </Box>
      </CmtCardHeader>
      <CmtAdvCardContent
        className={classes.cardContentRoot}
        title={userStatistic.kostnader}
        titleProps={{
          variant: 'h1',
          component: 'div',
          className: classes.cardContentTitle,
        }}
        reverseDir
        columnSizes={[5, 7]}>
        <Box ml={-8} mb={-6} mr={-6} mt={-1}>
          <TotalIncomeGraph data={income} />
        </Box>
      </CmtAdvCardContent>
    </CmtAdvCard>
    </>
  );
};

export default TotalIncome;
