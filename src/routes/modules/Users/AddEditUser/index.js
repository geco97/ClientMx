import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import GridContainer from '../../../../@jumbo/components/GridContainer';
import Grid from '@material-ui/core/Grid';
import AppTextInput from '../../../../@jumbo/components/Common/formElements/AppTextInput';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { useDropzone } from 'react-dropzone';
import Button from '@material-ui/core/Button';
import { emailNotValid, requiredMessage } from '../../../../@jumbo/constants/ErrorMessages';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { isValidEmail } from '../../../../@jumbo/utils/commonHelper';
import { addNewUser, updateUser } from 'redux/actions/Users';
import validator from 'validator'
import {isUndefined} from 'lodash'

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

function PhoneNumberInput({ onChange, value, ...other }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (!phoneNumber && value) {
      setTimeout(() => {
        setPhoneNumber(value);
      }, 300);
    }
  }, [phoneNumber, value]);

  const onNumberChange = number => {
    setPhoneNumber(number.formattedValue);
    onChange(number.formattedValue);
  };

  return <NumberFormat {...other} onValueChange={onNumberChange} value={phoneNumber} format="(###) ###-####" />;
}

const labels = [
  { title: 'Home', slug: 'home' },
  { title: 'Office', slug: 'office' },
  { title: 'Other', slug: 'other' },
];

const splitName = user => {
  if (user) {
    const [fName, mName, lName] = user.name.split(' ');
    return [fName, lName ? mName + ' ' + lName : mName];
  }

  return ['', ''];
};

const AddEditUser = ({ open, onCloseDialog }) => {
  const classes = useStyles();
//  const currentUser = useSelector(({ usersReducer }) => usersReducer.currentUser);

  const [Firstname, setFirstname] = useState('');
  const [Lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile_pic, setProfile_pic] = useState('');
  const [phone, setPhone] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [Pserror, setPserror] = useState('')
  const [acceptedFiles, setacceptedFiles] = useState("")
  const [IsShown, setIsShown] = useState(false)
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
      setacceptedFiles(acceptedFiles[0])
    },
  });

  const dispatch = useDispatch();
/*
  useEffect(() => {
    if (currentUser) {
      const [fName, lName] = splitName(currentUser);
      setFirstname(fName);
      setLastname(lName);
      setProfile_pic(currentUser.profile_pic);
      setEmail(currentUser.email);
      setPhone(currentUser.phones);
      setPassword(currentUser.Password);
    }
  }, [currentUser]);
*/

  const onSubmitClick = () => {
    const uppercaseRegExp   = /(?=.*?[A-Z])/;
    const lowercaseRegExp   = /(?=.*?[a-z])/;
    const digitsRegExp      = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp   = /.{8,}/;
    const passwordLength =      isUndefined(password)?0:password.length;
    const uppercasePassword =   isUndefined(password)?false:uppercaseRegExp.test(password);
    const lowercasePassword =   isUndefined(password)?false:lowercaseRegExp.test(password);
    const digitsPassword =      isUndefined(password)?false:digitsRegExp.test(password);
    const minLengthPassword =   isUndefined(password)?0:minLengthRegExp.test(password);
    console.log(password,1)
    console.log(passwordLength,2)
    console.log(uppercasePassword,3)
    console.log(lowercasePassword,4)
    console.log(digitsPassword,5)
    console.log(minLengthPassword,6)
    if (!Firstname) {
      setFirstNameError(requiredMessage);
    } else if (!email) {
      setEmailError(requiredMessage);
    } else if (!isValidEmail(email)) {
      setEmailError(emailNotValid);
    } 
    else if (passwordLength===0 || !uppercasePassword || !lowercasePassword || !digitsPassword
      ) {
      setPserror(`${requiredMessage}. 
      ${passwordLength === 0?"minst 8 tecken, ":""}
      ${!uppercasePassword?"minst ett stort tecken, ":""}
      ${!lowercasePassword?"minst ett litet tecken, ":""}
      ${!digitsPassword?"minst en siffra, ":""}
      `)
    } else {
      onUserSave();
    }
  };

  const onUserSave = () => {
    const userDetail = {
      profile_pic,
      Firstname: Firstname,
      Lastname: Lastname,
      email,
      phone,
      password      
    };

  /*  if (currentUser) {
      dispatch(
        updateUser({ ...currentUser, ...userDetail }, () => {
          onCloseDialog();
        }),
      );
    } else {
      */
      dispatch(
        addNewUser(userDetail,acceptedFiles ,() => {
          onCloseDialog();
        }),
      );
  //  }
  };


  return (
    <Dialog disableEscapeKeyDown={true} disableBackdropClick={true} open={open} onClose={onCloseDialog} 
    className={classes.dialogRoot}>
      <DialogTitle className={classes.dialogTitleRoot}>{'Create New User'}</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
          <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 3, md: 0 }} className="pointer">
            <input {...getInputProps()} />
            <CmtAvatar size={70} src={profile_pic} />
          </Box>
          <GridContainer>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="First name"
                value={Firstname}
                onChange={e => {
                  setFirstname(e.target.value);
                  setFirstNameError('');
                }}
                helperText={firstNameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                fullWidth
                variant="outlined"
                label="Last name"
                value={Lastname}
                onChange={e => setLastname(e.target.value)}
              />
            </Grid>
          </GridContainer>
        </Box>
      
        <Box mb={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            variant="outlined"
            label="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </Box>
        <Box mb={{ xs: 6, md: 5 }}>
          <AppTextInput
            fullWidth
            variant="outlined"
            label="Email Address"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            helperText={emailError}
          />
        </Box>
        <GridContainer style={{ marginBottom: 12 }}>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              fullWidth
              variant="outlined"
              label="Password *"
              type={IsShown===true?"text":"password"}
              value={password}
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
              onChange={e => {
                setPassword(e.target.value)
                setPserror('');
              }}
              helperText={Pserror}
            />
          </Grid>
          <small>* minst 8 tecken, minst ett stort tecken och en siffra </small>
        </GridContainer>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button onClick={onCloseDialog}>Cancel</Button>
          <Box ml={2}>
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
              Save
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditUser;

AddEditUser.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
