import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import { Box,Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import CmtImage from '../../../../@coremat/CmtImage';

const Logo = ({ color, ...props }) => {
  const logoUrl = '/images/maxitech_lgo.png';

  return (
    <Box className="pointer" {...props}>
      <Hidden xsDown>
        <NavLink to="/">
         <CmtImage src={logoUrl} alt="logo" height="65"/>
          {/* <Typography variant="subtitle1" display="block" style={{color:"white"}} gutterBottom>
          PORTAL
          </Typography>*/}
        </NavLink>
      </Hidden>
      <Hidden smUp>
        <NavLink to="/">
         <CmtImage src={logoUrl} alt="logo" height="65"/>
          {/* <Typography variant="subtitle1" display="block" style={{color:"white"}} gutterBottom>
          PORTAL
          </Typography>*/}
        </NavLink>
      </Hidden>
    </Box>
  );
};

export default Logo;
