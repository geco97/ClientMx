import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/auth/jwt/config';
import {
  ADD_USER,  DELETE_BULK_USERS,  DELETE_USER,  EDIT_USER,  GET_USERS,  SET_USER_DETAILS,  SET_USER_LOGG,
  GET_UPDATE_USER_DETAIL_NEW_KVITTO,GET_UPDATE_USER_DETAIL_MY_KVITTO,GET_UPDATE_USER_DETAIL_NEW_INKOP,
  GET_UPDATE_USER_DETAIL_MY_INKOP,GET_UPDATE_USER_NOTIS,ADD_NEW_POST,GET_MINA_POST,
  GET_UPDATE_ADMIN_DETAIL_MY_INKOP,GET_USERS_AKTIVA,GET_MINA_EVENT,ADD_NEW_EVENT,
  GET_UPDATE_USER_DETAIL_MY_FAKTUROR,GET_UPDATE_USER_DETAIL_MY_DOKUMENT,SET_START_USER_DETAILS,
  GET_USER_WORKING_YEARS,GET_STATISTIC

} from '@jumbo/constants/ActionTypes';
import moment from 'moment';
import fileSaver from 'file-saver' 
import {isUndefined} from 'lodash'


export const getUsers = (filterOptions = [], searchTerm = '', callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    dispatch({ type: SET_START_USER_DETAILS });
    axios
      .get('/users/all', { params: { filterOptions, searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_USERS, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const getAktivaUsers = () => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/users/Aktiva')
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_USERS_AKTIVA, payload: data.data });
          } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
export const deleteUser = (userId, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete('/users/delete', { params: { id: userId } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected user was deleted successfully.'));
          dispatch({ type: DELETE_USER, payload: data.data });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
export const addNewUser = (user,image, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    const formData = new FormData()   
    formData.append('files[]', image)
    formData.append('user', JSON.stringify(user))
    axios
      .post('/users/add',
      formData,
      {
        body:{
          user:JSON.stringify(user)
        },
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(data => {
        console.log(data,"addNewUser")
        if (data.status === 200) {
          dispatch(fetchSuccess('New user was added successfully.'));
          dispatch({ type: ADD_USER, payload: data.data });
          callbackFun();
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        console.log(error)
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
export const deleteBulkUsers = (userIds, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/users/deleleSelected', { userIds })
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('Selected users were deleted successfully.'));
          dispatch({ type: DELETE_BULK_USERS, payload: userIds });
          if (callbackFun) callbackFun();
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const getCurrentUser=(user)=>{
  return dispatch => {
    dispatch(fetchStart());
    
    axios
      .get('/users/get', { params: { userid:user.id } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: SET_USER_DETAILS, payload: data.data });
         // if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}

export const getUserLogg = (userid,page)=>{
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/users/logg/get', { params: { userid,page} })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: SET_USER_LOGG, payload: data.data });
         // if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}
export const resetLogg = (userid)=>{
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/users/logg/reset', { params: { userid} })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: SET_USER_LOGG, payload: data.data });
         // if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}
//AddnewKvitto
export const AddnewKvitto = (userid,date,Value,file,searchTerm) => {
  return dispatch => {
    dispatch(fetchStart());
    const ipAdress='0.0.0.0'
    const formData = new FormData()
    formData.append('files[]', file[0])
    formData.append('userid', userid)
    formData.append('date', date)
    formData.append('Value', Value)
    axios
    .put('/user/Kvitto/Add',
    formData,
    {
      body:{
        userid,Value,date,ipAdress
      },
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(data => {
      if (data.status === 200) {
        dispatch(fetchSuccess());
        dispatch(getUsersKvitto(userid,searchTerm,[{date:moment(new Date).format("YYYY-MM-DD")}]))
        dispatch({ type: GET_UPDATE_USER_DETAIL_NEW_KVITTO, payload: data.data.results });
      } else {
        dispatch(fetchError('Something went wrong'));
      }
    })
    .catch(error => {
      dispatch(fetchError('Something went wrong'));
    });
  }
}
//GET_UPDATE_USER_DETAIL_MY_KVITTO
export const getUsersKvitto = (userid,searchTerm,filterOptions = [], callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/user/Kvitto/all', { params: { userid,filterOptions,searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_UPDATE_USER_DETAIL_MY_KVITTO, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
//downloadFile
export const downloadFile = (filename,url) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/user/file/Download', { params: { filename,url },
      responseType: 'arraybuffer' 
    }).then((resp) => {
      if (resp.status === 200) {
        dispatch(fetchSuccess());
      var blob = new Blob([resp.data]);
      fileSaver.saveAs(blob, filename);
    } else {
      dispatch(fetchError('There was something issue in responding server.'));
    }
    })
    .catch(error => {
      dispatch(fetchError('There was something issue in responding server'));
    });
  };
}
//deleteFile
export const deleteKvitto=(userid,fileId,Url,searchTerm,filterOptions)=>{
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete('/user/Kvitto/delete', { params: {fileId,Url,userid} })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch(getUsersKvitto(userid,searchTerm,filterOptions))
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}
//AddnewInkop
export const AddnewInkop = (userid,date,Value,link,notis,file,Type,Antal,searchTerm,ByAdmin) => {
  return dispatch => {
    dispatch(fetchStart());
    const ipAdress='0.0.0.0'
    const formData = new FormData()
    formData.append('files[]', file[0])
    formData.append('userid', userid)
    formData.append('date', date)
    formData.append('Type', Type)
    formData.append('Antal', Antal)
    formData.append('Value', Value)
    formData.append('link', link)
    formData.append('notis', notis)
    axios
    .put('/user/Inkop/Add',
    formData,
    {
      body:{
        userid,Value,date,link,notis,Type,ipAdress,Antal
      },
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(data => {
      if (data.status === 200) {
        dispatch(fetchSuccess());
        if(isUndefined(ByAdmin)){
          dispatch(getUsersInkop(userid,searchTerm,[{date:moment(new Date).format("YYYY-MM-DD")}]))
        }else{
          dispatch(getAdminsInkop(searchTerm,[{date:moment(new Date).format("YYYY-MM-DD")}]))
        }
        dispatch({ type: GET_UPDATE_USER_DETAIL_NEW_INKOP, payload: data.data.results });
      } else {
        dispatch(fetchError('Something went wrong'));
      }
    })
    .catch(error => {
      dispatch(fetchError('Something went wrong'));
    });
  }
}

//getUsersInkop
export const getUsersInkop = (userid,searchTerm,filterOptions = [], callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/user/Inkop/all', { params: { userid,filterOptions,searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_UPDATE_USER_DETAIL_MY_INKOP, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
//deleteInkop
export const deleteInkop=(userid,fileId,Url,searchTerm,filterOptions)=>{
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete('/user/Inkop/delete', { params: {fileId,Url,userid} })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch(getUsersInkop(userid,searchTerm,filterOptions))
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}
//EditInkop
export const EditInkop = (userid,EditRow,date,Value,link,notis,file,Type,Antal,status,searchTerm,ByAdmin) => {
  return dispatch => {
    dispatch(fetchStart());
    const ipAdress='0.0.0.0'
    const formData = new FormData()
    formData.append('files[]', file[0])
    formData.append('userid', userid)
    formData.append('date', date)
    formData.append('Value', Value)
    formData.append('link', link)
    formData.append('Type', Type)
    formData.append('Antal', Antal)
    formData.append('EditRow', JSON.stringify(EditRow))
    formData.append('notis', notis)
    formData.append('status', status)
    axios
    .put('/user/Inkop/Edit',
    formData,
    {
      body:{
        userid,Value,date,link,notis,ipAdress,Type,status,Antal,
        EditRow:JSON.stringify(EditRow)
      },
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(data => {
      if (data.status === 200) {
        dispatch(fetchSuccess());
        if(isUndefined(ByAdmin)){
          dispatch(getUsersInkop(userid,searchTerm,[{date:moment(new Date).format("YYYY-MM-DD")}]))
        }else{
          dispatch(getAdminsInkop(searchTerm,[{date:moment(new Date).format("YYYY-MM-DD")}]))
        }
        dispatch({ type: GET_UPDATE_USER_DETAIL_NEW_INKOP, payload: data.data.results });
      } else {
        dispatch(fetchError('Something went wrong'));
      }
    })
    .catch(error => {
      dispatch(fetchError('Something went wrong'));
    });
  }
}
export const getUsersNotofications= () =>{
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/user/notis')
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_UPDATE_USER_NOTIS, payload: data.data });
        } else {
          //dispatch(fetchError('There was something issue in responding server.'));
          localStorage.removeItem("token");
        }
      })
      .catch(error => {
        //dispatch(fetchError('There was something issue in responding server'));
        localStorage.removeItem("token");
      });
  };
}
//setNotificationsSeen
export const setNotificationsSeen = () => {
  return dispatch => {
    //dispatch(fetchStart());
    axios
      .put('/user/notis/Seen')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
//setNotificationsDismiss
export const setNotificationsDismiss = () => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/user/notis/Dismiss')
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess());
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
//createPost
export const createPost = (post) =>{
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/user/post/Add', { post })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: ADD_NEW_POST, payload: data.data });
          dispatch(onGetMinaPost())
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}
//onGetMinaPost
export const onGetMinaPost= () =>{
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/user/post')
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_MINA_POST, payload: data.data });
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}
//getAdminsInkop
export const getAdminsInkop = (searchTerm,filterOptions = [], callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/Admin/Inkop/all', { params: { filterOptions,searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_UPDATE_ADMIN_DETAIL_MY_INKOP, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
//AddnewEvent
export const AddnewEvent = (event,userid,month,year) =>{
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/user/Event/Add', { event })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: ADD_NEW_EVENT, payload: data.data });
          dispatch(onGetUserEvent(userid,month,year))
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}
//onGetUserEvent
export const onGetUserEvent= (userid,month,year) =>{
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/user/Event',{params: { month,year,userid } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_MINA_EVENT, payload: data.data });
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}
//EditEvent
export const EditEvent = (event,userid,month,year) =>{
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/user/Event/Edit', { event })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: ADD_NEW_EVENT, payload: data.data });
          dispatch(onGetUserEvent(userid,month,year))
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}
export const onDeleteEvent = (event,userid,month,year) =>{
  return dispatch => {
    dispatch(fetchStart());
    axios
    .delete('/user/Event/delete', { params: {event,userid} })
    .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: ADD_NEW_EVENT, payload: data.data });
          dispatch(onGetUserEvent(userid,month,year))
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}
//onGetStatistic
export const onGetStatistic= () =>{
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/user/statistic')
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_STATISTIC, payload: data.data });
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}
////GET_UPDATE_USER_DETAIL_MY_KVITTO
export const getUsersFaktura = (userid,searchTerm,filterOptions = [], callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/user/Faktura/all', { params: { userid,filterOptions,searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_UPDATE_USER_DETAIL_MY_FAKTUROR, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
//AddnewFaktura
export const AddnewFaktura = (userid,date,Value,file,searchTerm) => {
  return dispatch => {
    dispatch(fetchStart());
    const ipAdress='0.0.0.0'
    const formData = new FormData()
    formData.append('files[]', file[0])
    formData.append('userid', userid)
    formData.append('date', date)
    formData.append('Value', Value)
    axios
    .put('/user/Faktura/Add',
    formData,
    {
      body:{
        userid,Value,date,ipAdress
      },
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(data => {
      if (data.status === 200) {
        dispatch(fetchSuccess());
        dispatch(getUsersFaktura(userid,searchTerm,[{date:moment(new Date).format("YYYY-MM-DD")}]))
        dispatch({ type: GET_UPDATE_USER_DETAIL_NEW_KVITTO, payload: data.data.results });
      } else {
        dispatch(fetchError('Something went wrong'));
      }
    })
    .catch(error => {
      dispatch(fetchError('Something went wrong'));
    });
  }
}
//deleteFaktura
export const deleteFaktura=(userid,fileId,Url,searchTerm,filterOptions)=>{
  return dispatch => {
    dispatch(fetchStart());
    axios
      .delete('/user/Faktura/delete', { params: {fileId,Url,userid} })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch(getUsersFaktura(userid,searchTerm,filterOptions))
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}
//getUsersDokument
export const getUsersDokument = (userid,searchTerm,filterOptions = [], callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/user/Document/all', { params: { userid,filterOptions,searchTerm } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_UPDATE_USER_DETAIL_MY_DOKUMENT, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
//

//getThisUserWorkingYears
export const getThisUserWorkingYears = (userid) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/user/working/years', { params: { userid } })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_USER_WORKING_YEARS, payload: data.data });
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
//
export const setCurrentUser = user => {
  return dispatch => {
    dispatch({ type: SET_USER_DETAILS, payload: user });
  };
};


/**/


export const sentMailToUser = () => {
  return dispatch => {
    dispatch(fetchSuccess('Email has been sent to user successfully'));
  };
};

export const updateUser = (user, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/users', user)
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess('Selected user was updated successfully.'));
          dispatch({ type: EDIT_USER, payload: data.data });
          if (callbackFun) callbackFun(data.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};

export const updateUserStatus = (data, callbackFun) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .put('/users/update-status', data)
      .then(response => {
        if (response.status === 200) {
          dispatch(fetchSuccess('User status was updated successfully.'));
          dispatch({ type: EDIT_USER, payload: response.data });
          if (callbackFun) callbackFun(response.data);
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
};
//onSendKlarMarkera
export const onSendKlarMarkera= () =>{
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/user/tid/Klar')
      .then(data => {
        if (data.status === 200) {
          console.log(data)
          dispatch(fetchSuccess(data.data.results.message));
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}
//onFyllaKalendar
export const onFyllaKalendar= (userid,date) =>{
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/user/tid/Fylla', { params: { userid,date } })
      .then(data => {
        if (data.status === 200) {
          console.log(data)
          dispatch(fetchSuccess(data.data.results.message));
          setTimeout(() => {
            dispatch(onGetUserEvent(userid,moment(date).format("MM"),moment(date).format("YYYY")))
          }, 1000);          
        } else {
          dispatch(fetchError('There was something issue in responding server.'));
        }
      })
      .catch(error => {
        dispatch(fetchError('There was something issue in responding server'));
      });
  };
}