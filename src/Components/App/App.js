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
import './App.css';

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
          <Route exact path="/login">
            {!authTokens ? <Login /> : <Redirect to="/" />}
          </Route>
          <PrivateRoute
            exact
            path="/"
            render={() => <AdminLayout Child={<Dashboard />} />}
          />
          <PrivateRoute
            exact
            path="/employee"
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
            render={() => <AdminLayout Child={<AdminLayout />} />}
          />
          <PrivateRoute
            exact
            path="/nhac-no"
            render={() => <AdminLayout Child={<AdminLayout />} />}
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
