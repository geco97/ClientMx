import React from 'react';
import { Box, IconButton, makeStyles, Popover, Tooltip, useTheme } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
import NotificationsIcon from '@material-ui/icons/Notifications';
import CmtCardHeader from '../../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '../../../../../../@coremat/CmtCard/CmtCardContent';
import CmtList from '../../../../../../@coremat/CmtList';
import CmtCard from '../../../../../../@coremat/CmtCard';
import { intranet } from '../../../../../../@fake-db';
import NotificationItem from './NotificationItem';
import PerfectScrollbar from 'react-perfect-scrollbar';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersNotofications,setNotificationsSeen,setNotificationsDismiss } from 'redux/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import {Grid } from '@mui/material';


const useStyles = makeStyles(theme => ({
  cardRoot: {
    '& .Cmt-header-root': {
      paddingTop: 4,
      paddingBottom: 4,
    },
    '& .Cmt-card-content': {
      padding: '0 0 16px !important',
    },
  },
  typography: {
    padding: theme.spacing(2),
  },
  iconRoot: {
    position: 'relative',
    color: alpha(theme.palette.common.white, 0.38),
    '&:hover, &.active': {
      color: theme.palette.common.white,
    },
  },
  counterRoot: {
    color: theme.palette.common.white,
    border: `solid 1px ${theme.palette.common.white}`,
    backgroundColor: theme.palette.warning.main,
    width: 20,
  },
  scrollbarRoot: {
    height: 300,
    padding: 16,
  },
  popoverRoot: {
    '& .MuiPopover-paper': {
      width: 375,
    },
  },
}));


const HeaderNotifications = () => {
  const dispatch = useDispatch();
  const userNotis = useSelector(({ usersReducer }) => usersReducer.userNotis);

  const { headerNotifications } = intranet;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [counter, setCounter] = React.useState(0);
  const theme = useTheme();

  React.useEffect(()=>{
    let interval;
    dispatch(getUsersNotofications())
    interval = setInterval(() => {
      dispatch(getUsersNotofications())
    }, 30000);
    return () => clearTimeout(interval);
  },[])

  React.useEffect(()=>{
    console.log()
    setCounter(userNotis.filter(item=>parseInt(item.Seen)===0).length)
  },[userNotis])

  const onOpenPopOver = event => {
    setAnchorEl(event.currentTarget);
    dispatch(setNotificationsSeen())
    setCounter(0);
  };

  const onClosePopOver = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const DissMissAlla=()=>{
    dispatch(setNotificationsDismiss())
    dispatch(getUsersNotofications())
  }
  return (
    <Box pr={2}>
      <Tooltip title="Notifications">
        <IconButton
          onClick={onOpenPopOver}
          className={clsx(classes.iconRoot, 'Cmt-appIcon', {
            active: counter > 0,
          })}>
          <Badge badgeContent={counter} classes={{ badge: classes.counterRoot }}>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Popover
        className={classes.popoverRoot}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClosePopOver}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <CmtCard className={classes.cardRoot}>
          <CmtCardHeader
            actionsPos="top-corner"
            actionHandleIcon={<DeleteIcon/>}
            separator={{
              color: theme.palette.borderColor.dark,
              borderWidth: 1,
              borderStyle: 'solid',
            }}
          >
            <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            style={{width: '320px'}}
            >
              <Grid item>Notis center</Grid>
              <Grid item>
              <IconButton color="secondary" 
              onClick={()=>DissMissAlla()}
              size="small" component="span">
                <DeleteIcon />
              </IconButton>
              </Grid>
            </Grid>
            </CmtCardHeader>
          <CmtCardContent>
            {userNotis.length > 0 ? (
              <PerfectScrollbar className={classes.scrollbarRoot}>
                <CmtList
                  data={userNotis}
                  renderRow={(item, index) => <NotificationItem key={index} item={item} />}
                />
              </PerfectScrollbar>
            ) : (
              <Box p={6}>
                <Typography variant="body2">Inga meddelanden hittads</Typography>
              </Box>
            )}
          </CmtCardContent>
        </CmtCard>
      </Popover>
    </Box>
  );
};

export default HeaderNotifications;
