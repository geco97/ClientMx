import React from 'react';
import { Box } from '@material-ui/core';
import AppsMenu from '../../partials/Header/AppsMenu';
import HeaderMessages from '../../partials/Header/HeaderMessages';
import HeaderNotifications from '../../partials/Header/HeaderNotifications';
import { makeStyles } from '@material-ui/styles';
import { horizontalDefaultNavsAdmin,horizontalDefaultNavsUser } from '../../partials/menus';
import CmtHorizontal from '../../../../../@coremat/CmtNavigation/Horizontal';
import { useDispatch,useSelector } from 'react-redux';
import { isNull,isEmpty } from 'lodash';
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const HeaderTopMenus = () => {
  const classes = useStyles();
  const Auth = useSelector(state => state.auth.authUser)
  return (
    <>
    {isEmpty(Auth) || isNull(Auth)?"":
    <Box className={classes.root}>
      <CmtHorizontal menuItems={parseInt(Auth.Role)===0?horizontalDefaultNavsAdmin:horizontalDefaultNavsUser} />
      <Box display="flex" alignItems="center" ml="auto">
        {/*<AppsMenu />
        <HeaderMessages />*/}
        <HeaderNotifications />
      </Box>
    </Box>
    }
    </>
  );
};

export default HeaderTopMenus;
