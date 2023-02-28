import { 
  GET_USER_DETAIL,GET_UPDATE_USER_DETAIL_IMAGE,
  GET_UPDATE_USER_DETAIL
} from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  userDetail: null  
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_DETAIL: {
      return { ...state, userDetail: action.payload.currentUser };
    }
    case GET_UPDATE_USER_DETAIL_IMAGE:{
      return {
        ...state,
        userDetail:{
          ...state.userDetail,
          BildUrl:action.payload.BildUrl
        }
      }
    }
    case GET_UPDATE_USER_DETAIL:{
      return {
        ...state,
        userDetail:action.payload.user
      }
    }
    
    default:
      return state;
  }
};
