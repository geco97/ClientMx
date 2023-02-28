import React from 'react';
import {Grid,Typography} from '@material-ui/core'
import logo from 'assets/maxitech_lgo.png'
function HeaderSLogo(props) {
    return (
        <>
            <Grid
  container
  direction="column"
  justify="center"
  alignItems="center"
>
<Grid item>
        <img src={logo} width={200}/>
    </Grid>
    <Grid item>
    <Typography variant="h6" className="m-2 text-muted SLogo" style={{fontWeight:600}} gutterBottom>
    KOMPETENS – FRIHET – LIVSBALANS
      </Typography>
    </Grid>
</Grid>
        </>
    );
}

export default HeaderSLogo;