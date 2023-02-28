import React from 'react';
import { List } from '@material-ui/core';
import NavMenuItem from './NavMenuItem';
import NavCollapse from './NavCollapse';
import NavMega from './NavMega';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon
} from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  horizontalNavMenu: {
    position: 'relative',
    display: 'flex',
    marginLeft: -14,
    marginRight: -14,
  },
   menuButton: {
    marginRight: theme.spacing(2)
  },
}));

const CmtHorizontal = props => {
  const { menuItems } = props;
  const classes = useStyles();
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  return (
    <>
  
    {isMobile ? 
    (
      <>
      <IconButton
      color="textPrimary"
      className={classes.menuButton}
      edge="start"
      aria-label="menu"
      onClick={handleMenu}
    >
      <MenuIcon />
    </IconButton>
    <Menu
    id="menu-appbar"
    anchorEl={anchor}
    anchorOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    KeepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    open={open}
    onClose={(e)=>setAnchor(null)}
    >
      {menuItems.map((item, index) => {
        switch (item.type) {
          case 'collapse':
            return <NavCollapse {...item} key={index} />;
          case 'mega':
            return <NavMega {...item} key={index} />;
          case 'item':
            return <NavMenuItem handleClick={handleClose} {...item} key={index} />;
          default:
            return null;
        }
      })}
    </Menu>
    </>
    )
    :
    (
      <List component="nav" disablePadding className={clsx(classes.horizontalNavMenu, 'Cmt-horizontalNavMenu')}>
      {menuItems.map((item, index) => {
        switch (item.type) {
          case 'collapse':
            return <NavCollapse {...item} key={index} />;
          case 'mega':
            return <NavMega {...item} key={index} />;
          case 'item':
            return <NavMenuItem {...item} key={index} />;
          default:
            return null;
        }
      })}
    </List>
    )
}
   
    </>
  );
};

export default CmtHorizontal;
