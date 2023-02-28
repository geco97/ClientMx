import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CmtMediaObject from '../../../../../../@coremat/CmtMediaObject';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { alpha } from '@material-ui/core/styles';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  feedItemRoot: {
    padding: '10px 0',
    position: 'relative',
    borderBottom: `1px solid ${alpha(theme.palette.common.dark, 0.035)}`,
    '& .Cmt-media-object': {
      alignItems: 'center',
    },
    '& .Cmt-media-image': {
      alignSelf: 'flex-start',
      width: 56,
    },
    '& .Cmt-media-body': {
      width: 'calc(100% - 56px)',
      flex: 'inherit',
    },
  },
  titleRoot: {
    letterSpacing: 0.25,
    marginBottom: 6,
    cursor: 'pointer',
  },
}));

const getPostContent = (item, classes) => (
  <Typography component="div" variant="h5" className={classes.titleRoot}>
    <Box component="span" color="primary.main">
      {item.Name}
    </Box>
    <Box component="span" ml={1}>
      {item.message}
    </Box>
  </Typography>
);
const NotificationItem = ({ item }) => {
  const classes = useStyles();

  const getTitle = (item, classes) => {
  return getPostContent(item, classes);
  };

  const getSubTitle = () => (
    <Box display="flex" alignItems="center" fontSize={12} color="text.disabled">
      <Box ml={1}>{moment(item.sdate).format("YYYY-MM-DD HH:mm")}</Box>
    </Box>
  );

  return (
    <Box className={classes.feedItemRoot}>
      <CmtMediaObject
        title={getTitle(item, classes)}
        subTitle={getSubTitle()}
      />
    </Box>
  );
};

export default NotificationItem;
