import { isEmpty } from 'lodash';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {history} from "redux/store"
import {
    getCurrentUser
} from 'redux/actions/Users'
import {Box,Grid,makeStyles } from '@material-ui/core'
import Header from './Header';
import UserTabs from './UserTabs';
import IntakterTabs from './IntakterTabs';
import KostnaderTabs from './KostnaderTabs';
import TidRapportTabs from './TidRapportTabs';
import FakturorTabs from './FakturorTabs';
import DokumentTabs from './DokumentTabs';
import UserLogg from './UserLogg';
import GridContainer from '@jumbo/components/GridContainer';

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
function UserModule(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const currentUser = useSelector(({ usersReducer }) => usersReducer.currentUser);
    const [tabValue, setTabValue] = React.useState('About');
    const handleTabChange = (event, newValue) => {
        console.log(newValue)
        setTabValue(newValue);
      };
    React.useEffect(()=>{
        let Userid = props.location.state
        if(isEmpty(Userid)){
            history.push("/users")
        }
        else{
            dispatch(getCurrentUser(Userid))  
        }
    },[props.location.state])
    const switchRender=()=>{
        switch(tabValue){
            case 'About': return <UserTabs userDetail={currentUser} tabValue={tabValue}/>
            case 'Intakter': return <IntakterTabs userDetail={currentUser} tabValue={tabValue}/>
            case 'Kostnader': return <KostnaderTabs userDetail={currentUser} tabValue={tabValue}/>
            case 'TidRapport': return <TidRapportTabs userDetail={currentUser} tabValue={tabValue}/>
            case 'Fakturor': return <FakturorTabs userDetail={currentUser} tabValue={tabValue}/>
            case 'Dokument': return <DokumentTabs userDetail={currentUser} tabValue={tabValue}/>
        }
    }
    return (
        <React.Fragment>
            {currentUser && (
                <Box className={classes.pageFull}>
                    <Header classes={classes} userDetail={currentUser} tabValue={tabValue} handleTabChange={handleTabChange} />
                    <GridContainer>
                    <Grid item xs={12} lg={8} className={classes.profileSidebar}>
                        <Box mb={12}>
                            {
                                switchRender()
                            }
                            
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={4} className={classes.profileSidebar}>
                        <Box mb={12}>
                            <UserLogg
                            userDetail={currentUser}
                            />
                        </Box>    
                    </Grid>
                    </GridContainer>
                </Box>
            )}
        </React.Fragment>
    );
}

export default UserModule;