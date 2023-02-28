import React from 'react';
import CmtCard from '@coremat/CmtCard';
import { Box } from '@material-ui/core';
import CmtAvatar from '@coremat/CmtAvatar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
const useStyles = makeStyles(() => ({
  cardRoot: {
    height: '200px',
    minHeight: 120,
  },
  userBoxRoot: {
    width: 130,
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: -34,
      left: -55,
      width: 185,
      height: 285,
      backgroundColor: '#00C4B4',
      borderRadius: '50%',
    },
    '& > div': {
      boxShadow: '0 6px 4px 2px rgba(0,0,0,.2)',
    },
  },
}));

const UserSummery = () => {
  const classes = useStyles();
  const authUser = useSelector(({ auth }) => auth.authUser);
  return (
    <CmtCard className={classes.cardRoot}>
      <Box display="flex" alignItems="center" height={1}>
        <Box className={classes.userBoxRoot}>
          <CmtAvatar size={75} src={authUser.BildUrl} />
        </Box>
        <Box ml={{ xs: 5, xl: 8 }} style={{maxWidth:'180px',wordBreak:"break-all"}}>
          <Typography component="div" variant="h4">
          Välkommen
          </Typography>
          <Typography component="div" variant="h4">
          {`${authUser.Firstname} ${authUser.Lastname}`} 
          </Typography>
          <Box mt={1} color="text.secondary" component="p">
            {authUser.Email}
          </Box>
        </Box>
      </Box>
    </CmtCard>
  );
};

export default UserSummery;
