import {
  ADD_USER,  DELETE_BULK_USERS,  DELETE_USER,  EDIT_USER,  GET_USERS,  SET_USER_DETAILS,  SET_USER_LOGG,
  GET_UPDATE_USER_DETAIL_NEW_KVITTO,  GET_UPDATE_USER_DETAIL_MY_KVITTO,GET_UPDATE_USER_DETAIL_NEW_INKOP,
  GET_UPDATE_USER_DETAIL_MY_INKOP,GET_UPDATE_USER_NOTIS,ADD_NEW_POST,GET_MINA_POST,
  GET_UPDATE_ADMIN_DETAIL_MY_INKOP,GET_USERS_AKTIVA,GET_MINA_EVENT,ADD_NEW_EVENT,
  GET_UPDATE_USER_DETAIL_MY_FAKTUROR,GET_UPDATE_USER_DETAIL_MY_DOKUMENT,SET_START_USER_DETAILS,GET_USER_WORKING_YEARS
} from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  users: [],
  Aktivausers: [],
  currentUser: null,
  SMilersattning: 0,
  UserLogg:[],
  userKvitto:[],
  userFakturor:[],
  userDokument:[],
  userInkop:[],
  userNotis:[],
  userPost:[],
  userEvent:[],
  AdminInkop:[],
  UserLoggHasMore:true,
  userStatistic:{Maxkonto:0,Intakt:0,kostnader:0},
  KalkylYear:[]
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        users:action.payload.results.users,
      };
    }
    case SET_USER_LOGG: {
      return {
        ...state,
        UserLogg:state.UserLogg.concat(action.payload.results.UserLogg),
        UserLoggHasMore:action.payload.results.UserLoggHasMore,
      };
    }
    case SET_USER_DETAILS: {
      return {
        ...state,
        currentUser: action.payload.results.currentUser,
        UserLogg:[]
      };
    }
    case SET_START_USER_DETAILS: {
      return {
        ...state,
        currentUser:null,
        UserLogg:[]
      };
    }
    case ADD_USER: {
      return {
        ...state,
        users: action.payload.results.users,
      };
    }
    case EDIT_USER: {
      return {
        ...state,
        users: state.users.map(user => (user.id === action.payload.id ? action.payload : user)),
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        //users: state.users.filter(user => user.id !== action.payload),
        users: action.payload.results.users
      };
    }
    case DELETE_BULK_USERS: {
      return {
        ...state,
        users: state.users.filter(user => !action.payload.includes(user.id)),
      };
    }
    case GET_UPDATE_USER_DETAIL_NEW_KVITTO:{
      return {
        ...state,
      }
    }
    case GET_UPDATE_USER_DETAIL_NEW_INKOP:{
      return {
        ...state,
      }
    }
    case GET_UPDATE_USER_DETAIL_MY_KVITTO:{
      return {
        ...state,
        userKvitto:action.payload.results.userKvitto
      }
    }
    case GET_UPDATE_USER_DETAIL_MY_FAKTUROR:{
      return {
        ...state,
        userFakturor:action.payload.results.userFakturor
      }
    }
    case GET_UPDATE_USER_DETAIL_MY_INKOP:{
      return {
        ...state,
        userInkop:action.payload.results.userInkop
      }
    }
    case GET_UPDATE_USER_NOTIS:{
      return {
        ...state,
        userNotis:action.payload.results.userNotis
      }
    }
    //ADD_NEW_POST,GET_MINA_POST
    case ADD_NEW_POST:{
      return {
        ...state
      }
    }
    case GET_MINA_POST:{
      return {
        ...state,
        userPost:action.payload.results.userPost
      }
    }
    //GET_UPDATE_USER_DETAIL_MY_DOKUMENT
    case GET_UPDATE_USER_DETAIL_MY_DOKUMENT:{
      return {
        ...state,
        userDokument:action.payload.results.userDokument
      }
    }
    //GET_UPDATE_ADMIN_DETAIL_MY_INKOP
    case GET_UPDATE_ADMIN_DETAIL_MY_INKOP:{
      return {
        ...state,
        AdminInkop:action.payload.results.AdminInkop
      }
    }
    //GET_USERS_AKTIVA
    case GET_USERS_AKTIVA:{
      return {
        ...state,
        Aktivausers:action.payload.results.Aktivausers
      }
    }
    //GET_MINA_EVENT,ADD_NEW_EVENT
    case ADD_NEW_EVENT:{
      return {
        ...state
      }
    }
    case GET_MINA_EVENT:{
      return {
        ...state,
        userEvent:action.payload.results.userEvent
      }
    }
    //userStatistic
    //GET_USER_WORKING_YEARS
    case GET_USER_WORKING_YEARS:{
      return {
        ...state,
        KalkylYear:action.payload.results.KalkylYear
      }
    }
    //KalkylYear
    default:
      return state;
  }
};
