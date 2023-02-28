import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Tooltip  } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../utils/IntlMessages';
import Button from '@material-ui/core/Button';
import { AuhMethods } from '../../../../services/auth';
import ContentLoader from '../../ContentLoader';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import AuthWrapper from './AuthWrapper';
import { NavLink } from 'react-router-dom';
import validator from 'validator'
import {isEmpty } from 'lodash'
const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    [theme.breakpoints.up('md')]: {
      width: props => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  textCapital: {
    textTransform: 'capitalize',
  },
  textAcc: {
    textAlign: 'center',
    '& a': {
      marginLeft: 4,
    },
  },
  alrTextRoot: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
}));

//variant = 'default', 'standard', 'bgColor'
const SignUp = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const [Firstname, setFirstname] = useState('');
  const [FNerror, setFNerror] = useState('')
  const [Lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [Emailerror, setEmailerror] = useState('')
  const [password, setPassword] = useState('');
  const [Pserror, setPserror] = useState('')
  
  const dispatch = useDispatch();
  const classes = useStyles({ variant });

  const onSubmit = () => {
    if(isValid()){
    dispatch(AuhMethods[method].onRegister({ Firstname,Lastname, email, password }));
    }
  };
  const isValid=()=>{
    if(!validator.isEmail(email) || isEmpty(email)){
      setEmailerror("Incorrect entry.")
    }
    if(isEmpty(Firstname)){
      setFNerror("Incorrect entry.")
    }
    if (!validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setPserror("Incorrect entry.")
    }
    if(validator.isEmail(email) && !isEmpty(Firstname) && !isEmpty(email) && validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })){
      return true
    }
    else{ return false}
  }
  return (
    <AuthWrapper variant={wrapperVariant}>
      <Box className={classes.authContent}>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
        Ny konto  
        </Typography>
        <form>
          <Box >
            <TextField
              label={<IntlMessages id="appModule.name" />}
              size={"small"}
              fullWidth
              onChange={event => setFirstname(event.target.value)}
              defaultValue={Firstname}
              error={!isEmpty(FNerror)}
              helperText={FNerror}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box >
            <TextField
              label={<IntlMessages id="appModule.name" />}
              size={"small"}
              fullWidth
              onChange={event => setLastname(event.target.value)}
              defaultValue={Lastname}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box >
            <TextField
              label={<IntlMessages id="appModule.email" />}
              fullWidth
              size={"small"}
              onChange={event => setEmail(event.target.value)}
              defaultValue={email}
              error={!isEmpty(Emailerror)}
              helperText={Emailerror}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box >
          <Tooltip title="length 8, minst en symbol" placement="top">
            <TextField
              type="password"
              size={"small"}
              label={<IntlMessages id="appModule.password" />}
              fullWidth
              onChange={event => setPassword(event.target.value)}
              defaultValue={password}
              error={!isEmpty(Pserror)}
              helperText={Pserror}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Tooltip>
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent={{ sm: 'space-between' }}
            mb={3}>
            <Box mb={{ xs: 2, sm: 0 }}>
              <Button onClick={onSubmit} variant="contained" color="primary">
                <IntlMessages id="appModule.regsiter" />
              </Button>
            </Box>

            <Typography className={classes.alrTextRoot}>
              <NavLink to="/signin">
                <IntlMessages id="signUp.alreadyMember" />
              </NavLink>
            </Typography>
          </Box>
        </form>

        <ContentLoader />
      </Box>
    </AuthWrapper>
  );
};

export default SignUp;
