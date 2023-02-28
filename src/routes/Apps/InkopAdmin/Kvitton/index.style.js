import { lighten, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(4),
    backgroundColor: lighten(theme.palette.background.paper, 0.1),
  },
  container: {
    height: 650,
  },
  table: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: 550,
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 750,
    },
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default useStyles;
