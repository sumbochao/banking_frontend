/* eslint-disable no-console */
import React, { useState } from 'react';
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
import { Transfers } from '../Transfers';
import './App.css';
import { PublicRoute } from '../Routes/PublicRoute';
import Welcome from '../WelCome/Welcome';

function App() {
  const [authTokens, setAuthTokens] = useState('');
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
            render={() => <Login/>}
          />
           <PublicRoute 
             exact
            path="/login-employee"
            render={() => <Login isEmployee/>}
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
            render={() => <AdminLayout Child={<Transfers />} />}
          />
          <PrivateRoute
            exact
            path="/lich-su-nguoi-dung"
            render={() => <AdminLayout Child={<AdminManagement />} />}
          />
          <PrivateRoute
            exact
            path="/nhac-no"
            render={() => <AdminLayout Child={<AdminManagement />} />}
          />
          <PrivateRoute
            exact
            path="/ho-so"
            render={() => <AdminLayout Child={<AdminManagement />} />}
          />
          <PrivateRoute
            exact
            path="/nap-tien"
            render={() => <AdminLayout Child={<PaymentManagement />} />}
          />
          <PrivateRoute
            exact
            path="/lich-su-giao-dich"
            render={() => <AdminLayout Child={<PaymentManagement />} />}
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
