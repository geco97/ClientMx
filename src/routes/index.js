import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Login from './Auth/Login';
//import Signup from './Auth/Register';
//import ForgotPassword from './Auth/ForgotPassword';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Error404 from './ExtraPages/404';
import MinKonto from './Apps/MinProfile';
import Lobby from './Apps/Lobby';
import Kvitto from './Apps/Kvitto';
import Fakturor from './Apps/Fakturor';
import Inkop from './Apps/Inkop';
import InkopAdmin from './Apps/InkopAdmin';
import LobbyAdmin from './Apps/LobbyAdmin';
import Tidrapportering from './Apps/Tidrapportering';
import UsersModule from './modules/Users';
import UserModule from './modules/User';
import TourGuide from './TourGuide';



import Calendar from './modules/Calendar';
import Components from './Components';
import Apps from './Apps';
import Widgets from './Widgets';
import ExtraPages from './ExtraPages';
import { isEmpty, isNull } from 'lodash';
// import LayoutBuilder from './LayoutBuilder';

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { authUser } = useSelector(({ auth }) => auth);
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const { authUser } = useSelector(({ auth }) => auth);
  const location = useLocation();
  
  if (authUser && (location.pathname === '' || location.pathname === '/')) {
    return <Redirect to={'/Lobby'} />;
  } else if (authUser && location.pathname === '/signin') {
    return <Redirect to={'/Lobby'} />;
  } else if(!authUser){
    return  <Redirect to={'/signin'}/>
  }
  return (
    <React.Fragment>
      <Switch>
        <Route path="/signin" component={Login} />
        <Route path="/Konto" component={MinKonto} />
        {
        parseInt(authUser.Role) === 0?
        <Route path="/Lobby" component={LobbyAdmin} />
        :
        <Route path="/Lobby" component={Lobby} />
        }
         {
        parseInt(authUser.Role) === 1?
        <Route path="/Kvitto" component={Kvitto} />
        :''
        }
         {
        parseInt(authUser.Role) === 1?
        <Route path="/Fakturor" component={Fakturor} />
        :''
        }
         {
        parseInt(authUser.Role) === 1?
        <Route path="/Tidrapportering" component={Tidrapportering} />
        :''
        }
         {
        parseInt(authUser.Role) === 1 && parseInt(authUser.canSeeInkList) !== 1?
        <Route path="/Inkop" component={Inkop} />
        :
        <Route path="/Inkop" component={InkopAdmin} />
        }
        {/*
        <Route path="/widgets" component={Widgets} />
        <Route path="/components" component={Components} />
        <Route path="/extra-pages" component={ExtraPages} />
        <Route path="/apps" component={Apps} />
        <Route path="/calendar" component={Calendar} />
        */}
        {
        parseInt(authUser.Role) === 0?
        <Route path="/users" component={UsersModule} />
        :''
        }
        {
        parseInt(authUser.Role) === 0?
        <Route path="/user" component={UserModule} />
        :''
        }
        <Route exact component={Error404}/>
     {/*
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
        */}
        {/*<Route path="/layout-builder" component={LayoutBuilder} />*/}
      </Switch>
      {
      location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/forgot-password' && (
        <TourGuide />
      )
      }
    </React.Fragment>
  );
};

export default Routes;
