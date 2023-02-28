import React from 'react';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import { Button, useTheme,Box,Divider } from '@material-ui/core';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail,updateUser } from 'redux/actions';
import {isEmpty,isNull} from 'lodash'
import {CircularProgress,Fade,Grid,MenuItem  } from '@mui/material';
import GridContainer from '@jumbo/components/GridContainer';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import CmtCardFooter from '@coremat/CmtCard/CmtCardFooter';
import validator from 'validator'
import moment from 'moment'
import {isUndefined} from 'lodash'

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

function UserPrfile(props) {
    const dispatch = useDispatch();
    const { authUser } = useSelector(({ auth }) => auth);
    const currentUser = useSelector(({ usersReducer }) => usersReducer.currentUser);
    const [user,setUser]=React.useState({})
    const [firstNameError, setFirstNameError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [Pserror, setPserror] = React.useState('');
    React.useEffect(()=>{
        if(!isEmpty(currentUser)){
        setUser({
            ...currentUser,
            Password:"",
            Lastname:isNull(currentUser.Lastname)?"":currentUser.Lastname,
            Tele:isNull(currentUser.Tele)?"":currentUser.Tele,
            Tele2:isNull(currentUser.Tele2)?"":currentUser.Tele2,
            PersonNr:isNull(currentUser.PersonNr)?"":currentUser.PersonNr,
            Adress:isNull(currentUser.Adress)?"":currentUser.Adress,
            postnr:isNull(currentUser.postnr)?"":currentUser.postnr,
            Ort:isNull(currentUser.Ort)?"":currentUser.Ort,
            BildUrl:isNull(currentUser.BildUrl)?"":currentUser.BildUrl,
            Sallary:isNull(currentUser.Sallary)?0:currentUser.Sallary,
            Pension:isNull(currentUser.Pension)?0:currentUser.Pension,
            SallartMdate:isNull(currentUser.SallartMdate)?"":currentUser.SallartMdate,
            DaytoUpdate:isNull(currentUser.DaytoUpdate)?0:currentUser.DaytoUpdate,
            canSeeInkList:isNull(currentUser.canSeeInkList)?0:currentUser.canSeeInkList,

        })
    }
    },[currentUser])

    const theme = useTheme();
    const classes = useStyles();
    const onSubmit = ()=>{
        console.log(1)
        if(isValid()){
            dispatch(updateUser(user,1))
        }
    }
    const isValid=()=>{
        const uppercaseRegExp   = /(?=.*?[A-Z])/;
            const lowercaseRegExp   = /(?=.*?[a-z])/;
            const digitsRegExp      = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp   = /.{8,}/;
            const passwordLength =      isUndefined(user.Password)?0:user.Password.length;
            const uppercasePassword =   isUndefined(user.Password)?false:uppercaseRegExp.test(user.Password);
            const lowercasePassword =   isUndefined(user.Password)?false:lowercaseRegExp.test(user.Password);
            const digitsPassword =      isUndefined(user.Password)?false:digitsRegExp.test(user.Password);
            const minLengthPassword =   isUndefined(user.Password)?false:minLengthRegExp.test(user.Password);
        if(!validator.isEmail(user.Email) || isEmpty(user.Email)){
            emailError("Incorrect entry.")
        }
        if(isEmpty(user.Firstname)){
            setFirstNameError("Incorrect entry.")
        }
        if(!isEmpty(user.Password)){
            console.log(user.Password,"######")
            
            if(
                passwordLength===0 || !uppercasePassword || !lowercasePassword || !digitsPassword
                || !minLengthPassword
            ){
                setPserror(`Incorrect entry. 
                ${passwordLength === 0?"minst 8 tecken, ":""}
                ${!uppercasePassword?"minst ett stort tecken, ":""}
                ${!lowercasePassword?"minst ett litet tecken, ":""}
                ${!digitsPassword?"minst en siffra, ":""}
                `)
            }
        }
        if(validator.isEmail(user.Email) && !isEmpty(user.Firstname) && !isEmpty(user.Email) 
        && isEmpty(user.Password)){
            return true            
        }
        else{ 
            if( passwordLength !== 0 && uppercasePassword && lowercasePassword && digitsPassword
                && minLengthPassword){
                return true
              }
            else{
                return false
            }
        }
      /*  if(!isEmpty(user.Password)){




            console.log(validator.isStrongPassword(user.Password, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, returnScore: true
              }),"DDDDD")
        if (!validator.isStrongPassword(user.Password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, returnScore: true
          })) {
              setPserror("Incorrect entry.")
          }
        }
      */
    }
    return (
        <div className={classes.cardRoot}>
            {
                isEmpty(user)?
                <Box sx={{ height: 40 }}>
                    <Fade
                    in={true}
                    style={{
                        transitionDelay: '800ms',
                    }}
                    unmountOnExit
                    >
                        <CircularProgress />
                    </Fade>
                </Box>
                :
                <>
                    <>
                       
                    <Box display="flex" 
                    flexDirection={{ xs: 'column', md: 'row' }} 
                    alignItems="center" mb={{ xs: 6, md: 5 }}>
                    <GridContainer>
                        <Grid item xs={12} sm={6}>
                            <AppTextInput
                            fullWidth
                            variant="outlined"
                            label="Förnamn"
                            type={"text"}
                            error={!isEmpty(firstNameError)}
                            value={user.Firstname}
                            onChange={e => {
                                setUser({
                                    ...user,
                                    Firstname:e.target.value
                                });
                                setFirstNameError('');
                            }}
                            helperText={firstNameError}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppTextInput
                            fullWidth
                            variant="outlined"
                            label="Efternamn"
                            type={"text"}
                            value={user.Lastname}
                            onChange={e =>  setUser({
                                ...user,
                                Lastname:e.target.value
                            })}
                            />
                        </Grid>
                    </GridContainer>
                    </Box> 
                    <Box  display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
                    <GridContainer>
                        <Grid item xs={12} sm={6}>
                        <AppTextInput
                    fullWidth
                    variant="outlined"
                    label="E-postadress"
                    error={!isEmpty(emailError)}
                    type={"text"}
                    value={user.Email}
                    onChange={e => {
                        setUser({
                            ...user,
                            Email:e.target.value
                        })
                        setEmailError('');
                    }}
                    helperText={emailError}
                    />
                    </Grid>
                        <Grid item xs={12} sm={6}>
                        <AppTextInput
                            fullWidth
                            variant="outlined"
                            label="PersonNo."
                            value={user.PersonNr}
                            type={"text"}
                            onChange={e => {
                                setUser({
                                    ...user,
                                    PersonNr:e.target.value
                                });
                            }}
                            />   
                        </Grid>
                    </GridContainer>
                    
                    </Box>
                    <Box  display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
                    <GridContainer>
                        <Grid item xs={12} sm={6}>
                            <AppTextInput
                            fullWidth
                            variant="outlined"
                            label="Tele."
                            value={user.Tele}
                            type={"text"}
                            onChange={e => {
                                setUser({
                                    ...user,
                                    Tele:e.target.value
                                });
                            }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppTextInput
                            fullWidth
                            variant="outlined"
                            label="Extra tele."
                            value={user.Tele2}
                            type={"text"}
                            onChange={e =>  setUser({
                                ...user,
                                Tele2:e.target.value
                            })}
                            />
                        </Grid>
                    </GridContainer>
                    </Box>
                    <Box  display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
                    <GridContainer>
                        <Grid item xs={12} sm={6}>
                            <AppTextInput
                            fullWidth
                            variant="outlined"
                            label="Adress"
                            type={"text"}
                            value={user.Adress}
                            onChange={e => {
                                setUser({
                                    ...user,
                                    Adress:e.target.value
                                });
                            }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <AppTextInput
                            fullWidth
                            variant="outlined"
                            label="Postnr"
                            type={"text"}
                            value={user.postnr}
                            onChange={e => {
                                setUser({
                                    ...user,
                                    postnr:e.target.value
                                });
                            }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <AppTextInput
                            fullWidth
                            variant="outlined"
                            label="Ort"
                            type={"text"}
                            value={user.Ort}
                            onChange={e => {
                                setUser({
                                    ...user,
                                    Ort:e.target.value
                                });
                            }}
                            />
                        </Grid>
                    </GridContainer>
                    </Box>
                    <Box  display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
                    <GridContainer>
                        <Grid item xs={12} sm={6}>
                            <AppTextInput
                            fullWidth
                            variant="outlined"
                            label="Roll"
                            select
                            onChange={e => {
                                setUser({
                                    ...user,
                                    Role:e.target.value
                                });
                            }}
                            //disabled
                            value={parseInt(user.Role)}
                            >
                                <MenuItem  key={0} value={0}>Admin</MenuItem >
                                <MenuItem  key={1} value={1}>Användare</MenuItem >
                            </AppTextInput>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppTextInput
                            fullWidth
                            variant="outlined"
                            label="Lösenord"
                            value={user.Password}
                            error={!isEmpty(Pserror)}
                            type={"Password"}
                            placeholder={"*********"}
                            onChange={e =>  {
                                setUser({
                                    ...user,
                                    Password:e.target.value
                                })
                                setPserror('');
                                }
                            }
                            helperText={Pserror}
                            />
                            <small>* minst 8 tecken, minst ett stort tecken och en siffra </small>
                        </Grid>
                    </GridContainer>
                    </Box>
                    <Box  display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
                    <GridContainer><Grid item xs={12} sm={12}><Divider/></Grid></GridContainer></Box>
                    <Box  display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
                        <GridContainer>
                        <Grid item xs={12} sm={6}>
                            <AppTextInput
                            fullWidth
                            variant="outlined"
                            label="Lön"
                            type={"text"}
                            value={user.Sallary}
                           // disabled={parseInt(currentUser.DaytoUpdate) === 1}
                            onChange={e => {
                                setUser({
                                    ...user,
                                    Sallary:e.target.value,
                                    DaytoUpdate:1,
                                    SallartMdate:moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                                });
                            }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <AppTextInput
                            fullWidth
                            variant="outlined"
                            label="Pension"
                            type={"text"}
                            value={user.Pension}
                            //disabled={parseInt(currentUser.DaytoUpdate) === 1}
                            onChange={e => {
                                setUser({
                                    ...user,
                                    Pension:e.target.value,
                                    DaytoUpdate:1,
                                    SallartMdate:moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                                });
                            }}
                            />
                        </Grid>
                        </GridContainer>
                    </Box>
                    <Box  display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
                    <GridContainer><Grid item xs={12} sm={12}><Divider/></Grid></GridContainer></Box>
                    <Box  display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" mb={{ xs: 6, md: 5 }}>
                    <GridContainer><Grid item xs={12} sm={6}>
                    <AppTextInput
                            fullWidth
                            variant="outlined"
                            label="Visa Admin Inköp lista"
                            select
                            onChange={e => {
                                setUser({
                                    ...user,
                                    canSeeInkList:e.target.value
                                });
                            }}
                            //disabled
                            value={parseInt(user.canSeeInkList)}
                            >
                                <MenuItem  key={0} value={0}>Nej</MenuItem >
                                <MenuItem  key={1} value={1}>Ja</MenuItem >
                            </AppTextInput>
                    </Grid></GridContainer></Box>
                    </>
                    <CmtCardFooter
                    separator={{color: theme.palette.borderColor.dark, borderWidth: 1, borderStyle: 'solid'}}
                    >
                        <Box display="flex" alignItems="right" justifyContent={"end"} width={1}>
                        <Button variant="contained" color="primary"
                        onClick={onSubmit}
                        >
                        Spara
                        </Button>
                        </Box>                        
                    </CmtCardFooter>
                </>
            }           
        </div>
    );
}

export default UserPrfile;