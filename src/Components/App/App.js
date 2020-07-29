/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import jwtDecode  from 'jwt-decode';
// import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Login } from '../Login';
import { AuthContext } from '../Routes/Context';
import { AdminLayout } from '../AdminLayout';
import { Dashboard } from '../Dashboard';
import { AdminManagement } from '../AdminManagement';
import { PrivateRoute } from '../Routes/PrivateRoute';
import { PaymentManagement } from '../PaymentManagement';
import './App.css';
import './app.scss';
import { PublicRoute } from '../Routes/PublicRoute';
import Welcome from '../WelCome/Welcome';
import { getRefreshToken } from './action';
import { UserHistory } from '../LichSuNguoiDung';
import { TransactionHistory } from '../LichSuGiaoDich';


function App() {
  const [authTokens, setAuthTokens] = useState('');
  // const [isRefresh, setRefresh ] = useState(false);
  if (localStorage.getItem('tokens') && authTokens === '') {
    try {
      setAuthTokens(JSON.parse(localStorage.getItem('tokens')));
    } catch {
      console.log();
    }
  }
  const setTokens = data => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };


  const cbNewAccessToken =(res) =>{
      setAuthTokens({accessToken: res.accessToken,refreshToken: authTokens.refreshToken, userData:authTokens.userData,type: authTokens.type});
      localStorage.setItem('tokens', JSON.stringify({accessToken: res.accessToken,refreshToken: authTokens.refreshToken, userData:authTokens.userData,type: authTokens.type}));
  };
  const isAuthenticated = () => {
      
      if (authTokens?.accessToken && jwtDecode(authTokens?.accessToken).exp > Date.now() / 1000) {
        return;
      } 
      // if token is expired try to refresh
      const refreshToken = authTokens?.refreshToken;
      if(refreshToken) {
        getRefreshToken(refreshToken, cbNewAccessToken);
      }
    };

  useEffect(() => {
    const autoRefreshToken = setInterval(()=>{
      isAuthenticated();
      console.log("a");
    },1000*60*18);
    return () => clearInterval(autoRefreshToken);
  }, []);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Switch>
          <Route exact path="/">
            {!authTokens ? <Welcome /> : <Redirect to="/dashboard" />}
          </Route>
          <Route
            exact
            path="/welcome"
            render={() => <Welcome />}
          />
          <PublicRoute
            exact
            path="/login"
            render={() => <Login />}
          />
          <PublicRoute
            exact
            path="/login-employee"
            render={() => <Login isEmployee />}
          />
          {/* <PrivateRoute
            exact
            path="/"
            render={() => <AdminLayout Child={<Dashboard />} />}
          /> */}
          <PrivateRoute
            exact
            path="/dashboard"
            render={() => <AdminLayout Child={<Dashboard />} />}
          />
          <PrivateRoute
            exact
            path="/chuyen-tien"
            render={() => <AdminLayout Child={<AdminManagement />} />}
          />
          <PrivateRoute
            exact
            path="/lich-su-nguoi-dung"
            render={() => <AdminLayout Child={<UserHistory />} />}
          />
          <PrivateRoute
            exact
            path="/nhac-no"
            render={() => <AdminLayout Child={<AdminManagement />} />}
          />
          <PrivateRoute
            exact
            path="/ho-so"
            render={() => <AdminLayout Child={<PaymentManagement />} />}
          />
          <PrivateRoute
            exact
            path="/nap-tien"
            render={() => <AdminLayout Child={<PaymentManagement />} />}
          />
          <PrivateRoute
            exact
            path="/lich-su-giao-dich"
            render={() => <AdminLayout Child={<TransactionHistory />} />}
          />
          <PrivateRoute
            exact
            path="/danh-sach-giao-dich"
            render={() => <AdminLayout Child={<PaymentManagement />} />}
          />
          <PrivateRoute
            exact
            path="/quan-ly-admin"
            render={() => <AdminLayout Child={<AdminManagement />} />}
          />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
