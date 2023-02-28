import React from 'react';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import { useTheme,useMediaQuery } from '@material-ui/core';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Kvitton from './Kvitton'

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

const About = ({ userDetail }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  return (
    <CmtCard className={classes.cardRoot} style={{ height:550}}>
      <CmtCardContent style={{padding:0}}>
        <Kvitton isMobile={isMobile}/>
      </CmtCardContent>
    </CmtCard>
  );
};

export default About;

About.prototype = {
  userDetail: PropTypes.object.isRequired,
};
