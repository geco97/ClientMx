import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import { Button, Chip, Menu, MenuItem } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import CmtSearch from '@coremat/CmtSearch';
import useStyles from './index.style';
import AppTextInput from '@jumbo/components/Common/formElements/AppTextInput';
import CheckIcon from '@mui/icons-material/Check';
import {isEmpty} from 'lodash'


const UserTableToolbar = ({
    filterOptions,
    setFilterOptions,
    searchTerm,
    setSearchTerm,
}) => {
  const classes = useStyles();  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 

  const onChipDelete = () => {
    setFilterOptions([]);
  };

  const onSearchChipDelete = () => setSearchTerm('');

 
  return (
    <React.Fragment>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]:0,
        })}>
          <Typography className={classes.title} variant="h4" id="tableTitle" component="div">
            Kvitton
          </Typography>
 
          <React.Fragment>
            <CmtSearch onChange={e => setSearchTerm(e.target.value)} value={searchTerm} border={false} onlyIcon />
            <div className={classes.chipsRoot}>
              {searchTerm && <Chip label={searchTerm} onDelete={onSearchChipDelete} />}
              {
                  !isEmpty(filterOptions)?filterOptions.map((item,index)=>{
                    return <Chip key={index} label={item.date} onDelete={() => onChipDelete()} />
                  }) :""
              }
            </div>
            <Tooltip title="Filter list">
              <IconButton aria-label="filter list" onClick={handleClick}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Menu
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
               <MenuItem>
                      <AppTextInput
                        fullWidth
                        variant="outlined"
                        label="Kivttosdatum"
                        type="date"
                        onChange={e => {
                          console.log(e.target.value)
                          let filterItem = [{"date":e.target.value}]
                          setFilterOptions(filterItem) 
                        }}
                      />
                      <IconButton color="primary" component="span" size={"small"}
                      onClick={()=>{
                        handleClose()
                      }}
                      >
                        <CheckIcon />
                      </IconButton>
                </MenuItem>
            </Menu>
            
          </React.Fragment>
      </Toolbar>
     
    </React.Fragment>
  );
};

UserTableToolbar.propTypes = {
  selected: PropTypes.array,
  setSelected: PropTypes.func,
  filterOptions: PropTypes.array,
  setFilterOptions: PropTypes.func,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
};

export default React.memo(UserTableToolbar);
