import React from 'react';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import Box from '@material-ui/core/Box';
import UserInfo from './UserInfo';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({}));

const PostItem = ({ item }) => {
  const classes = useStyles();
  const { id,Firstname, Lastname, BildUrl, message, sdate } = item;
  const owner = {
    profile_pic:BildUrl,
    id:id,
    name:`${Firstname} ${Lastname}`,
  }
  return (
    <CmtCard>
      <CmtCardHeader title={<UserInfo user={owner} date={sdate} />} />
      <CmtCardContent>
        <Box>
          <Box mb={2} component="p">
            {message}
          </Box>
        </Box>
      </CmtCardContent>
    </CmtCard>
  );
};

export default PostItem;

PostItem.prototype = {
  item: PropTypes.object.isRequired,
};
