import React from 'react';
import CmtList from '@coremat/CmtList';
import PostItem from './PostItem';
import { useSelector,useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import { onGetMinaPost } from 'redux/actions';

const PostsList = () => {
  const dispatch = useDispatch();
  const userPost = useSelector(({ usersReducer }) => usersReducer.userPost);
  React.useEffect(()=>{
    dispatch(onGetMinaPost());
  },[])
  console.log(userPost)
  return (
    <CmtList
      data={userPost}
      renderRow={(item, index) => (
        <Box mb={6} key={index}>
          <PostItem item={item} />
        </Box>
      )}
    />
  );
};

export default PostsList;
