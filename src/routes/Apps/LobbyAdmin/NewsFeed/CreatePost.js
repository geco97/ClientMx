import React, { useState } from 'react';
import CmtCard from '@coremat/CmtCard';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import Box from '@material-ui/core/Box';
import CmtAvatar from '@coremat/CmtAvatar';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from 'redux/actions';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
  textFieldRoot: {
    '& .MuiInput-underline': {
      '&:before, &:after': {
        display: 'none',
      },
    },
  },
  iconSm: {
    fontSize: 16,
  },
  gridThumb: {
    width: 60,
    height: 60,
    objectFit: 'cover',
    borderRadius: 4,
  },
}));

const CreatePost = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const authUser = useSelector(({ auth }) => auth.authUser);
  const [content, setContent] = useState('');

  const handlePostSubmit = () => {
    const post = {
      content,
      owner: {
        name: `${authUser.Firstname} ${authUser.Lastname}`,
        profile_pic: authUser.BildUrl,
        id: authUser.id,
      },
    };
    dispatch(createPost(post));
    setContent('');
  };

  return (
    <CmtCard>
      <Box width={1}>
        <CmtCardContent>
          <Box display="flex">
            <CmtAvatar size={40} src={authUser.BildUrl} alt={`${authUser.Firstname} ${authUser.Lastname}`} />
            <Box ml={4} flex={1}>
              <AppTextInput
                placeholder="Vad vill du dela idag?"
                multiline
                rows={2}
                fullWidth
                value={content}
                className={classes.textFieldRoot}
                onChange={e => setContent(e.target.value)}
              />
            </Box>
          </Box>
          <Box mt={2} display="flex">
            <Box ml="auto">
              <Button
                size="small"
                color="primary"
                variant="contained"
                disabled={!content.trim()}
                onClick={handlePostSubmit}>
                Skicka
              </Button>
            </Box>
          </Box>
        </CmtCardContent>
      </Box>
    </CmtCard>
  );
};

export default CreatePost;
