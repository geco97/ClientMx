import React from 'react';
import CmtCard from '@coremat/CmtCard';
import CmtAvatar from '@coremat/CmtAvatar';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserImage } from 'redux/actions';
import {isEmpty} from 'lodash'
import {CircularProgress,Fade,Grid,Box  } from '@mui/material';
import GridContainer from '@jumbo/components/GridContainer';
import { useDropzone } from 'react-dropzone';

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
    const [profile_pic, setProfile_pic] = React.useState('');
    React.useEffect(()=>{
        if(!isEmpty(currentUser)){
            setProfile_pic(currentUser.BildUrl)
        }
    },[currentUser])
    const classes = useStyles();

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {            
          setProfile_pic(URL.createObjectURL(acceptedFiles[0]));
          dispatch(updateUserImage(currentUser.id,acceptedFiles[0]));
        },
      });
    return (
        <div className={classes.cardRoot}>
            {
                isEmpty(currentUser)?
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
                    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} alignItems="center" justifyItems={"center"} mb={{ xs: 0, md: 5 }}>
                    <GridContainer>
                        <Grid item xs={12} sm={6}>
                        <Box {...getRootProps()} mr={{ xs: 0, md: 5 }} mb={{ xs: 0, md: 0 }} className="pointer">
                            <input {...getInputProps()} />
                            <CmtAvatar size={160} src={profile_pic} style={{borderRadius:"5px",margin:"auto"}}/>
                        </Box>
                        </Grid>
                    </GridContainer>
                    </Box>
                    </>
                </>
            }           
        </div>
    );
}

export default UserPrfile;