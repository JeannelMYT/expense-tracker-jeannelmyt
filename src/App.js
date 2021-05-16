import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
import Dashboard from "./components/dashboard/Dashboard";
import PersonalDetails from "./components/personalDetails/PersonalDetails";
import useToken from "./useToken";

const App = () => {
  const { token, setToken } = useToken();
  if (!token) {
    return (
      <div className="main">
        <Registration />
        <Login setToken={setToken} />
      </div>
    );
  }
  return (
    <div className="wrapper">
      <h1>Expense Tracker JeannelMYT</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/personalDetails">
            <PersonalDetails />
          </Route>
        </Switch>
      </BrowserRouter>
      <div className="registration"></div>
    </div>
  );
};

export default App;
