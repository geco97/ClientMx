import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { timeFromNow } from '../../../../@jumbo/utils/dateHelper';
import { Block, CheckCircleOutline, Delete, Edit, Mail, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { sentMailToUser, updateUserStatus } from '../../../../redux/actions/Users';
import {isEmpty } from 'lodash'
const useStyles = makeStyles(theme => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getUserActions = user => {
  const actions = [
    { action: 'edit', label: 'Profil', icon: <Edit /> },
  ];
  actions.push({ action: 'delete', label: 'InAktivera', icon: <Delete /> });
  return actions;
};

const UserListRow = ({ row, isSelected, onRowClick, onUserEdit, onUserDelete, onUserView }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onUserMenuClick = menu => {
    if (menu.action === 'edit') {
      onUserEdit(row);
    } else if (menu.action === 'delete') {
      onUserDelete(row);
    }
  };

  const labelId = `enhanced-table-checkbox-${row.id}`;
  const isItemSelected = isSelected(row.id);
  const userActions = getUserActions(row);

  return (
    <TableRow
      hover
      onClick={event => onRowClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}>
        <TableCell>{row.id}</TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={row.BildUrl} alt={`${row.Firstname} ${row.Lastname}`} />
          </Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {`${row.Firstname} ${row.Lastname}`}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{row.Email}</TableCell>
      <TableCell>
        {parseInt(row.Active) === 0 ? 'InAktiv' : 'Aktiv'}
      </TableCell>
      <TableCell>{isEmpty(row.Lastlogin)?"-":timeFromNow(row.Lastlogin)}</TableCell>
      <TableCell align="center" onClick={event => event.stopPropagation()}>
        <CmtDropdownMenu items={userActions} onItemClick={onUserMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};

export default React.memo(UserListRow);
