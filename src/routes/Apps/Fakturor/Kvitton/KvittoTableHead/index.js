import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import PropTypes from 'prop-types';
import React from 'react';


  function UserTableHead({ classes, order, orderBy, rowCount, onRequestSort,isMobile}) {
    const headCells = [
      { id: 'id', numeric: false, disablePadding: false, label: '#',Show:isMobile?false:true },
      {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
        Show:true 
      },
      { id: 'Fil', numeric: false, disablePadding: false, label: 'Fil',Show:true  },
      { id: 'Value', numeric: false, disablePadding: false, label: 'Värde',Show:true  },
      {
        id: 'month',
        numeric: false,
        disablePadding: false,
        label: 'Månad/År',Show:isMobile?false:true
      },    
    ];
    const onSortOrderChange = property => event => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map(headCell => (
              headCell.Show === true?
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={onSortOrderChange(headCell.id)}>
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
                ) : null}
              </TableSortLabel>
            </TableCell>:""
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  UserTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  export default React.memo(UserTableHead);