import { fetchError, fetchStart, fetchSuccess } from '../../../redux/actions';
import { setAuthUser, setForgetPassMailSent, updateLoadUser } from 'redux/actions/Auth';
import React from 'react';
import axios from './config';

export const getClientIp = async () => {
  let Ipadress='0.0.0.0'
  try{
    await fetch('https://api.ipify.org')
    .then(response => response.json())
    .then(data => {
      Ipadress= data.ip
    });   
  }catch(error){
    //
    try{
      await fetch('http://ip.jsontest.com/')
      .then(response => response.json())
      .then(data => {
        Ipadress= data.ip 
      });
      }catch(error){
        Ipadress='0.0.0.0'
        try{
          await fetch('https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708')
          .then(response => response.json())
          .then(data => {
            Ipadress= data.IPv4 
          });
          }catch(error){
          Ipadress='0.0.0.0'
          }
      }    
  }
  return Ipadress  
}

const JWTAuth = {
  onRegister: ({ Firstname,Lastname, email, password }) => {
    return async dispatch => {
      dispatch(fetchStart());
      const ipAdress=await getClientIp()
      axios
        .post('auth/register', {
          email: email,
          password: password,
          Firstname: Firstname,
          Lastname: Lastname,
          ipAdress:ipAdress
        })
        .then(({ data }) => {
          if (data.result) {
            localStorage.setItem('token', data.token.access_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token.access_token;
            dispatch(fetchSuccess());
            dispatch(JWTAuth.getAuthUser(true, data.token.access_token));
          } else {
            dispatch(fetchError(data.error));
          }
        })
        .catch(function(error) {
          dispatch(fetchError(error.message));
        });
    };
  },

  onLogin: ({ email, password }) => {
    return async dispatch => {
      try {
        dispatch(fetchStart());
        const ipAdress=await getClientIp()
        axios
          .post('auth/login', {
            email: email,
            password: password,ipAdress
          })
          .then(({ data }) => {
            if (data.result) {
              localStorage.setItem('token', data.token);
              axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
              dispatch(fetchSuccess());
              dispatch(JWTAuth.getAuthUser(true, data.token));
            } else {
              dispatch(fetchError(data.error));
            }
          })
          .catch(function(error) {
            dispatch(fetchError(error.message));
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },
  onLogout: () => {
    return dispatch => {
      dispatch(fetchStart());
      axios
        .post('auth/logout')
        .then(({ data }) => {
          if (data) {
            dispatch(fetchSuccess());
            localStorage.removeItem('token');
            dispatch(setAuthUser(null));
          } else {
            dispatch(fetchError(data.error));
          }
        })
        .catch(function(error) {
          dispatch(fetchError(error.message));
        });
    };
  },

  getAuthUser: (loaded = false, token) => {
    return dispatch => {
      if (!token) {
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      }
      dispatch(fetchStart());
      dispatch(updateLoadUser(loaded));
      axios
        .post('auth/me')
        .then(({ data }) => {
          if (data) {
            dispatch(fetchSuccess());
            dispatch(setAuthUser(data.user));
          } else {
            dispatch(updateLoadUser(true));
          }
        })
        .catch(function(error) {
          dispatch(updateLoadUser(true));
        });
    };
  },
  onForgetPass:({ email }) => {
    return async dispatch => {
      try {
        dispatch(fetchStart());
        const ipAdress=await getClientIp()
        axios
          .post('auth/Forget/pass', {
            email: email,ipAdress
          })
          .then(({ data }) => {
            if (data.result) {
              dispatch(fetchSuccess());
              } else {
              dispatch(fetchError(data.error));
            }
          })
          .catch(function(error) {
            dispatch(fetchError(error.message));
          });
      } catch (error) {
        dispatch(fetchError(error.message));
      }
    };
  },
  onForgotPassword: () => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        dispatch(setForgetPassMailSent(true));
        dispatch(fetchSuccess());
      }, 300);
    };
  },
  getSocialMediaIcons: () => {
    return <React.Fragment> </React.Fragment>;
  },
};

export default JWTAuth;
