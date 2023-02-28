import React from 'react';
import clsx from 'clsx';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { Box } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch,useSelector } from 'react-redux';
import { AuhMethods } from '../../../../services/auth';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import { isNull,isEmpty } from 'lodash';
import {history} from "redux/store"

const useStyles = makeStyles(theme => ({
  profileRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 20,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 2,
      zIndex: 1,
      height: 35,
      width: 1,
      backgroundColor: alpha(theme.palette.common.dark, 0.15),
    },
  },
}));

const actionsList = [
  {
    icon: <PersonIcon />,
    label: 'Mitt konto',
  },
  {
    icon: <ExitToAppIcon />,
    label: 'Logga ut',
  },
];

const UserDropDown = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const Auth = useSelector(state => state.auth.authUser)
  const onItemClick = item => {
    if (item.label === 'Logga ut') {
      dispatch(AuhMethods[CurrentAuthMethod].onLogout());
    }
    if (item.label === 'Mitt konto') {
      history.push('/Konto')
    }
  };
  return (
    <>
    {isEmpty(Auth) || isNull(Auth)?"":
    <Box className={clsx(classes.profileRoot, 'Cmt-profile-pic')}>
      <CmtDropdownMenu
        onItemClick={onItemClick}
        TriggerComponent={<CmtAvatar size="small" src={isEmpty(Auth.BildUrl)?'https://via.placeholder.com/150':Auth.BildUrl} />}
        items={actionsList}
      />
    </Box>
    }
    </>
  );
};

export default UserDropDown;
