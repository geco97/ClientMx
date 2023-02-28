import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IntlMessages from '../../../utils/IntlMessages';
import { useDispatch,useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { AuhMethods } from '../../../../services/auth';
import ContentLoader from '../../ContentLoader';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtImage from '../../../../@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { CurrentAuthMethod } from '../../../constants/AppConstants';
import { NavLink } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';
import validator from 'validator'
import {isEmpty } from 'lodash'
import {history} from "redux/store"
import HeaderSLogo from '@jumbo/components/HeaderSLogo' 

const useStyles = makeStyles(theme => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
    width: '100%',
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
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
}));
//variant = 'default', 'standard'
const SignIn = ({ method = CurrentAuthMethod, variant = 'default', wrapperVariant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [Emailerror, setEmailerror] = useState('')
  const [password, setPassword] = useState('');
  const [Pserror, setPserror] = useState('')
  const dispatch = useDispatch();
  const classes = useStyles({ variant });
  const authUser = useSelector(state => state.auth.authUser);
  const onSubmit = () => {
    if(isValid()){
    dispatch(AuhMethods[method].onLogin({ email, password }));
    }
  };
  React.useEffect(()=>{
    if(authUser){
      history.push('/Lobby')
    }
  },[authUser])
  
  const isValid=()=>{
    if(!validator.isEmail(email) || isEmpty(email)){
      setEmailerror("Incorrect entry.")
    }
    if(isEmpty(password)){
      setPserror("Incorrect entry.")
    }
    if(validator.isEmail(email) && !isEmpty(email) && !isEmpty(password)){
      return true
    }
    else{
      return false
    }
  }
  return (
    <AuthWrapper variant={wrapperVariant}>
      <Box className={classes.authContent}>
       {/* <Typography component="div" variant="h1" className={classes.titleRoot}>
          Logga in
        </Typography>
        */}
        <Box>
        <HeaderSLogo/>
        </Box>
        <form>
          <Box>
            <TextField
              label={"E-post"}
              fullWidth
              onChange={event => setEmail(event.target.value)}
              defaultValue={email}
              error={!isEmpty(Emailerror)}
              helperText={Emailerror}
              size={"small"}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box>
            <TextField
              type="password"
              label={"Lösenord"}
              fullWidth
              size={"small"}
              onChange={event => setPassword(event.target.value)}
              defaultValue={password}
              error={!isEmpty(Pserror)}
              helperText={Pserror}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <Button onClick={onSubmit} variant="contained" color="primary">
              {/* <IntlMessages id="appModule.signIn" /> */}
              Logga in
            </Button>
            <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <NavLink to="/forgot-password">
              Glömt mitt lösenord
              </NavLink>
            </Box>
          </Box>
         
        </form>
        <ContentLoader />
      </Box>
    </AuthWrapper>
  );
};

export default SignIn;
