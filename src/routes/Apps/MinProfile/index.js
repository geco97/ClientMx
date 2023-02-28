import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {Box ,Grid} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import GridContainer from '../../../@jumbo/components/GridContainer';
import UserPrfile from './UserPrfile'
import UserPrfileImage from './UserPrfileImage'

const useStyles = makeStyles(() => ({
    pageFull: {
      width: '100%',
    },
    profileSidebar: {
      '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
        flexBasis: '100%',
        maxWidth: '100%',
      },
    },
    profileMainContent: {
      '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
        flexBasis: '100%',
        maxWidth: '100%',
      },
    },
  }));

  
function MinProfile(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    //const { userDetail } = useSelector(({ profileApp }) => profileApp);
    useEffect(() => {
      //  dispatch(getUserDetail());
    }, [dispatch]);

    return (
        <React.Fragment>
             <GridContainer>
                <Grid item xs={12} lg={2} className={classes.profileSidebar}>
                    {/*Bild och info*/}
                    <UserPrfileImage/>
                </Grid>  
                <Grid item xs={12} lg={10} className={classes.profileSidebar}>
                    {/*Update Profile*/}
                    <UserPrfile/>
                </Grid>  
             </GridContainer>
        </React.Fragment>
    );
}

export default MinProfile;