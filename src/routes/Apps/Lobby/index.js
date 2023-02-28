import React from 'react';
import { Box, Grid } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import GridContainer from '@jumbo/components/GridContainer';
import UserSummery from './UserSummery';
import Activities from './Activities';
import NewsFeed from './NewsFeed';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
const useStyles = makeStyles(() => ({
    dailyFeedRoot: {
      '& .scrollbar-container': {
        height: 332,
      },
    },
    userPhotosRoot: {
      '& .scrollbar-container': {
        height: '272px !important',
      },
    },
    latestNotiRoot: {
      '& .scrollbar-container': {
        height: 353,
      },
    },
    weeklySalesRoot: {
      '& .scrollbar-container': {
        height: 240,
      },
    },
  }));

function LobbyAdmin(props) {
    const classes = useStyles();
    return (
       <PageContainer>
            <GridContainer>
                <Grid item xs={12} md={3}>
                    <UserSummery />
                </Grid>
                <Grid item xs={12} md={6}>
                   <NewsFeed />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Activities />
                </Grid>
            </GridContainer>
        </PageContainer>
    );
}

export default LobbyAdmin;